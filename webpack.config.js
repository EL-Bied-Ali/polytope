const CopyFilePlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
module.exports = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: "development",
    devtool: 'inline-source-map',

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: "./src/main.ts",
    // ファイルの出力設定
    output: {
        //  出力ファイルのディレクトリ名
        path: `${__dirname}/dist`,
        // 出力ファイル名
        filename: "main.js"
    },
    module: {
        rules: [
            {
                // 拡張子 .ts の場合
                test: /\.ts$/,
                // TypeScript をコンパイルする
                use: "ts-loader"
            }
        ]
    },
    // import 文で .ts ファイルを解決するため
    resolve: {
        extensions: [".ts", ".js"]
    },
    // ES5(IE11等)向けの指定（webpack 5以上で必要）
    target: ["web", "es5"],
    // コピープラグイン
    plugins: [
        new CopyFilePlugin({
            patterns: [
                {
                    from: "data/*.json",
                    to: "",
                    context: 'src'
                },
                {
                    from: "*.html",
                    to: "",
                    context: 'src'
                }
            ]
        }),
        new WriteFilePlugin()
    ]
};