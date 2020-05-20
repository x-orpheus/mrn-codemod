const prettier = require("prettier");
const utils = require("./utils");

// remove ImageResizeMode
// sourceLink: https://github.com/facebook/react-native/commit/870775ee738e9405c6545500f9a637df9b513a02

module.exports = function(fileInfo, api, options) {
    var j = api.jscodeshift;
    var g = j(fileInfo.source);

    const replaceResizeMode = function(path) {
        let name = path.parentPath.node.property.name;
        let _str = j.stringLiteral(name);
        j(path.parentPath.parentPath).replaceWith(_str);
    };

    const prettierCode = function(g) {
        let _source = g.toSource();
        let cleanCode = prettier.format(_source, utils.prettierconfig);
        return cleanCode;
    };

    g.find(j.MemberExpression, {
        object: {
            name: "Image",
        },
        property: {
            name: "resizeMode",
        },
    }).forEach(replaceResizeMode);

    return g.toSource();
};
