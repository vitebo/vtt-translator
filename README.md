# VTT Translator

> ⚠️ **Warning**: This project is under development and may contain bugs or incomplete features. Use at your own risk.

The goal of this project is to translate subtitle files in VTT (WebVTT) format using the OpenAI API. Currently, the project is in its initial version and may undergo significant changes in the future.

This script uses OpenAI's GPT models to translate subtitle text while preserving the original timing and formatting of the VTT file. The translation is done in chunks to handle large files efficiently and maintain context between subtitles.

## Usage

Enable corepack

```bash
corepack enable
```

Install dependencies

```bash
pnpm install
```

Copy `legendas.vtt` to the root of the project

Add your OpenAI API key to the `.env` file or export it

```bash
OPENAI_API_KEY=your_openai_api_key
```

Run the script

```bash
npx tsx translate-vtt.ts
```

## Roadmap

- [ ] Create a CLI
- [ ] Create config to select the model, language, etc
- [ ] Allow custom file paths and output file name
- [ ] Allow custom prompt
- [ ] Support multiple files

## Contributing

Pull requests are welcome! If you have any ideas for improvements or find any bugs, please feel free to open an issue or submit a pull request.
