# VTT Translator Development Guide

VTT Translator is a script for translating VTT files using the OpenAI API.

## Commands
- `npx tsx translate-vtt.ts` - Translate VTT files

## Code Style
- **Imports**: Use named imports/exports, keep sorted
- **Types**: Strict TypeScript, explicit return types
- **Naming**:
  - camelCase for variables/functions
  - PascalCase for classes/interfaces
  - use- prefix for composables
- **Structure**: Maintain small files with focused responsibilities
- **Error Handling**: Use typed errors, handle edge cases
- **Testing**: Write unit tests for all exports
- **Documentation**: Document public API with JSDoc

## Commit Messages

Use conventional commits for commit messages.
