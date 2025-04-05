import fs from 'fs';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import path from 'path';
import webvtt from 'node-webvtt';

dotenv.config();

interface Config {
  inputFile: string;
  outputFile: string;
  sourceLang: string;
  targetLang: string;
  model: 'chatgpt-4o-latest';
}

const config: Config = {
  inputFile: 'legendas.vtt',
  outputFile: 'legendas-pt.vtt',
  sourceLang: 'en',
  targetLang: 'pt',
  model: 'chatgpt-4o-latest',
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function translateText(text: string): Promise<string> {
  const prompt = `
You are a professional translator. Translate the following content from ${config.sourceLang} to ${config.targetLang}.

Important rules:
1. Maintain the tone and style of the original text
2. Do not translate or modify numbers or special characters
3. Only translate the spoken text

Original text:
${text}
`.trim();

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'chatgpt-4o-latest',
      temperature: 0.3,
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('Error translating:', error);
    throw new Error('Translation failed');
  }
}

async function main() {
  // Validate environment
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured');
  }

  // Validate input file
  if (!fs.existsSync(config.inputFile)) {
    throw new Error(`Input file not found: ${config.inputFile}`);
  }

  console.log('🔄 Starting translation...');
  console.log(`📁 Input file: ${config.inputFile}`);

  const content = fs.readFileSync(config.inputFile, 'utf8');
  const parsedContent = webvtt.parse(content);

  console.log(parsedContent);
  console.log(`📝 Translating ${parsedContent.cues.length} blocks...`);

  const translatedCues = await Promise.all(
    parsedContent.cues.map(async (cue) => ({
      ...cue,
      text: await translateText(cue.text),
    }))
  );

  const translatedParsedContent = {
    ...parsedContent,
    cues: translatedCues,
  };

  const result = webvtt.compile(translatedParsedContent);

  fs.writeFileSync(config.outputFile, result, 'utf8');
  console.log(`✅ Translation completed!`);
  console.log(`📁 Output file: ${path.resolve(config.outputFile)}`);
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
