// pathはnpmの初期モジュールとしてはいっている
const path = require('path')

module.exports = {
  entry: './src/index.tsx',
  module: {
    // webpack に対してビルド時に追加で行う処理を記述します
    rules: [
      {
        // .tsx で終わるファイルに対して、ts-loader を実行
        // node_modules 配下のファイル（＝外部ライブラリ）は特にビルドする必要がないので除外します。
        // x? =「x の有無は任意」という意味合いになります。
        // つまり .ts .tsx のどちらも適用されるようになります。
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    // importするときにtsって書かなくて良くなる
    extensions: ['.js', '.ts', '.tsx'],
  },
  output:{
    // __dirnameルートディレクトリ取得
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: 'dist/',
  }
}