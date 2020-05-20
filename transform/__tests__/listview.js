const defineTest = require('jscodeshift/dist/testUtils').defineTest

const tests = ['listview']

tests.forEach(test => {
    defineTest(__dirname, 'listview', null, `listview/${test}`)
})
