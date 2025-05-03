#!/usr/bin/env node

import { defineCommand, runMain } from 'citty'
import { translateVtt } from './translate-vtt'
import fs from 'fs';
import path from 'path';

async function getVttFiles(dir: string): Promise<string[]> {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.resolve(dir, entry.name);
      return entry.isDirectory() ? getVttFiles(fullPath) : fullPath;
    })
  );
  return files.flat().filter((file) => file.endsWith('.vtt'));
}

const main = defineCommand({
  meta: {
    name: 'vtt-translator',
    version: '0.0.0',
    description: 'Translate VTT subtitle files using OpenAI API'
  },
  args: {
    input: {
      type: 'string',
      description: 'Input VTT file path or directory',
      required: true
    },
    output: {
      type: 'string',
      description: 'Output directory for translated files (only used if input is a directory)'
    },
    sourceLang: {
      type: 'string',
      description: 'Source language code (e.g., en, es, fr)',
      default: 'en'
    },
    targetLang: {
      type: 'string',
      description: 'Target language code (e.g., pt, es, fr)',
      default: 'pt'
    },
    model: {
      type: 'string',
      description: 'OpenAI model to use',
      default: 'chatgpt-4o-latest'
    }
  },
  async run({ args }) {
    const isDirectory = fs.lstatSync(args.input).isDirectory();

    if (isDirectory) {
      const vttFiles = await getVttFiles(args.input);
      const outputDir = args.output || args.input;

      for (const file of vttFiles) {
        const outputFile = path.resolve(
          path.dirname(file), // Usa o diretório do arquivo de entrada
          path.basename(file).replace(/\.vtt$/, `-${args.targetLang}.vtt`)
        );

        const config = {
          inputFile: file,
          outputFile,
          sourceLang: args.sourceLang,
          targetLang: args.targetLang,
          model: args.model as 'chatgpt-4o-latest'
        };

        await translateVtt(config);
      }
    } else {
      const config = {
        inputFile: args.input,
        outputFile: args.output || args.input.replace(/\.vtt$/, `-${args.targetLang}.vtt`),
        sourceLang: args.sourceLang,
        targetLang: args.targetLang,
        model: args.model as 'chatgpt-4o-latest'
      };

      await translateVtt(config);
    }
  }
});

runMain(main);