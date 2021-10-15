export default {
  entries: [
    './src/index',
    { input: 'src/runtime/', outDir: 'dist/runtime' },
    { input: 'src/runtime/', outDir: 'dist/runtime', ext: 'js' },
    { input: 'src/templates/', outDir: 'dist/templates', ext: 'js' }
  ],
  externals: [],
  declaration: true
}
