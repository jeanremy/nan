module.exports = {
    entry: "./assets/js/main.js",
    output: {
        path: __dirname,
        filename: "./build/main.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.html$/, loader: "mustache" },
            { test: /\.scss$/, loaders: ["style", "css", "sass"]},
            { test: /\.svg$/, loader: 'mustache'}
        ]
    }
};