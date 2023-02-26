module.exports = {
    content: ['./src/**/*.html', './src/**/*.js'],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
}