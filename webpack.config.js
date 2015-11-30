module.exports = {
    entry: "./assets/js/main.js",
    output: {
        path: __dirname,
        filename: "./build/main.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.html$/, loader: "html-loader" },
            { test: /\.scss$/, loaders: ["style", "css", "sass"]}
        ]
    }
};