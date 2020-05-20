const defineTest = require("jscodeshift/dist/testUtils").defineTest;

const tests = ["image-resizemode"];

tests.forEach(test => {
    defineTest(__dirname, "image-resizemode", null, `image-resizemode/${test}`);
});
