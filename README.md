# VTT Translator

> ⚠️ **Warning**: This project is under development and may contain bugs or incomplete features. Use at your own risk.

The goal of this project is to translate subtitle files in VTT (WebVTT) format using the OpenAI API. Currently, the project is in its initial version and may undergo significant changes in the future.

This script uses OpenAI's GPT models to translate subtitle text while preserving the original timing and formatting of the VTT file. The translation is done in chunks to handle large files efficiently and maintain context between subtitles.

## Installation

Enable corepack:

```bash
corepack enable
```

Install dependencies:

```bash
pnpm install
```

Add your OpenAI API key to the `.env` file or export it:

```bash
OPENAI_API_KEY=your_openai_api_key
```

## Usage

### Development Mode

Install the CLI globally:

```bash
pnpm link --global
```

Run the CLI in development mode:

```bash
vtt-translator --input legends.vtt
```

### CLI Options

```bash
Usage: vtt-translator [options]

Options:
  --input        Input VTT file path (required)
  --output       Output VTT file path (default: input-{targetLang}.vtt)
  --source-lang  Source language code (default: en)
  --target-lang  Target language code (default: pt)
  --model        OpenAI model to use (default: chatgpt-4o-latest)
```

### Examples

Translate from English to Portuguese:
```bash
vtt-translator --input video.vtt --target-lang pt
```

Translate from Spanish to English with custom output:
```bash
vtt-translator --input video.vtt --source-lang es --target-lang en --output translated.vtt
```

## Roadmap

- [x] Create a CLI
- [x] Create config to select the model, language, etc
- [x] Allow custom file paths and output file name
- [ ] Allow custom prompt
- [ ] Support multiple files

## Contributing

Pull requests are welcome! If you have any ideas for improvements or find any bugs, please feel free to open an issue or submit a pull request.
