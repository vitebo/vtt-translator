#!/usr/bin/env node

import { defineCommand, runMain } from 'citty'
import { translateVtt } from './translate-vtt'

const main = defineCommand({
  meta: {
    name: 'vtt-translator',
    version: '0.0.0',
    description: 'Translate VTT subtitle files using OpenAI API'
  },
  args: {
    input: {
      type: 'string',
      description: 'Input VTT file path',
      required: true
    },
    output: {
      type: 'string',
      description: 'Output VTT file path'
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
    const config = {
      inputFile: args.input,
      outputFile: args.output || args.input.replace(/\.vtt$/, `-${args.targetLang}.vtt`),
      sourceLang: args.sourceLang,
      targetLang: args.targetLang,
      model: args.model as 'chatgpt-4o-latest'
    }

    await translateVtt(config)
  }
})

runMain(main) 