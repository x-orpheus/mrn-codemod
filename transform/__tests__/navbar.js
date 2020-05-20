const defineTest = require('jscodeshift/dist/testUtils').defineTest

const tests = ['navbar']

tests.forEach(test => {
    defineTest(__dirname, 'navbar', null, `navbar/${test}`)
})
