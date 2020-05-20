const defineTest = require("jscodeshift/dist/testUtils").defineTest;

const tests = ["index"];

tests.forEach(test => {
    defineTest(
        __dirname,
        "export-default-declaration",
        null,
        `export-default-declaration/${test}`,
    );
});
