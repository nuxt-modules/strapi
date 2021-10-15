export default {
  entries: [
    './src/index',
    { input: 'src/runtime/index', name: 'runtime' },
    { input: 'src/templates/', outDir: 'dist/templates', ext: 'js' }
  ],
  externals: [
    'cookie', 'vue'
  ],
  declaration: true
}
