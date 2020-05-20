const defineTest = require('jscodeshift/dist/testUtils').defineTest

const tests = ['clear', 'children', 'props']

tests.forEach(test => {
    defineTest(__dirname, 'nest', null, `nest/${test}`)
})
