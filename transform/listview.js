const prettier = require("prettier");
const utils = require("./utils");

module.exports = function(fileInfo, api, options) {
    var j = api.jscodeshift;
    var g = j(fileInfo.source);

    const isFromReactNative = path => {
        return path.parentPath && path.parentPath.parentPath && path.parentPath.parentPath.value.source.value === 'react-native';
    }

    const removeListView = path => {
        j(path).remove();
        return path;
    } 

    const addDeprecatedListView = path => {
        const createImportDefaultSpecifier = () => {
            return [j.importDefaultSpecifier(j.identifier("ListView"))];
        };
        const createImportDeclaration = () => {
            return j.importDeclaration(
                createImportDefaultSpecifier(),
                j.literal("@music/rn-deprecated-listview"),
            );
        };
        j(path.parentPath.parentPath).insertBefore(createImportDeclaration);
    }

    g.find(j.ImportSpecifier,{
        imported:{
            name: "ListView"
        }
    }).filter(isFromReactNative).map(removeListView).forEach(addDeprecatedListView)

    return prettier.format(g.toSource(), utils.prettierconfig);
};
