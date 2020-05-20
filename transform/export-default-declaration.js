const prettier = require("prettier");
const utils = require("./utils");

// export default declaration cannot be undefined
// sourceLink: https://github.com/magicismight/react-native-lazyload/issues/42

module.exports = function(fileInfo, api, options) {
    var j = api.jscodeshift;
    var g = j(fileInfo.source);

    const declareExportDefault = function(path) {
        j(path).replaceWith(
            j.exportDefaultDeclaration(
                j.classExpression(
                    j.identifier("ExportDefaultClass"),
                    path.value.declaration.body,
                    path.value.declaration.superClass,
                ),
            ),
        );
    };

    g.find(j.ExportDefaultDeclaration, {
        declaration: {
            id: null,
        },
    }).forEach(declareExportDefault);

    return prettier.format(g.toSource(), utils.prettierconfig);
};
