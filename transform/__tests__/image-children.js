const defineTest = require('jscodeshift/dist/testUtils').defineTest

const tests = ['clear', 'children', 'props', 'props-hasStyle', 'props-hasStyles']

tests.forEach(test => {
    defineTest(__dirname, 'image-children', null, `image-children/${test}`)
})
