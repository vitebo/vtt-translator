import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/cli'
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: false,
    inlineDependencies: true,
  },
})