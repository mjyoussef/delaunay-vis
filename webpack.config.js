module.exports = {
    entry: './src/visualizer/index.js',

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader', options: { importLoaders: 1 }
                    },
                    'postcss-loader'
                ]
            }
        ]
    }
}