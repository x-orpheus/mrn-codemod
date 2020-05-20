const prettier = require("prettier");
const utils = require("./utils");

/** rule1: remove NMNavigator node*/
const removeNMNavigator = (j, g) => {
    g.find(j.Identifier, { name: "NMNavigator" }).forEach(item => {
        j(item).remove();
    });
};

/** rule2: replace `Navigator` with `react-native-deprecated-custom-components` */
const replaceNavigator = (j, g) => {
    const createImportSpecifier = () => {
        return [j.importSpecifier(j.identifier("Navigator"))];
    };

    const createImportDeclaration = () => {
        return j.importDeclaration(
            createImportSpecifier(),
            j.literal("react-native-deprecated-custom-components"),
        );
    };

    const addNavigator = item => {
        j(item).insertAfter(createImportDeclaration);
    };
    g.find(j.ImportDeclaration, {
        source: {
            type: "Literal",
            value: "react",
        },
    }).forEach(addNavigator);

    const change2ReactComponent = item => {
        item.value.arguments.forEach(node => {
            if (node.value === "Navigator") {
                j(item).replaceWith(j.identifier("Navigator"));
            }
        });
        return item;
    };

    const changeNavigatorIOS = item => {
        item.value.arguments.forEach(node => {
            if (node.value === "NavigatorIOS") {
                j(item).replaceWith(
                    j.callExpression(item.value.callee, [
                        j.stringLiteral("@music/rn-deprecated-navigator-ios"),
                    ]),
                );
            }
        });
    };

    g.find(j.CallExpression, {
        callee: {
            name: "require",
        },
    })
        .map(change2ReactComponent)
        .forEach(changeNavigatorIOS);
};

/** rule3: Navigator.props.sceneStyle must be a plain object, not a stylesheet! */
const replaceSceneStyle = (j, g) => {
    const findImportVariable = (variablePath, propertyName) => {
        let hasFind = false;
        let properties;
        const variableName = variablePath.value.init.callee.object.name;
        const importPath = g.find(j.ImportSpecifier, {
            imported: {
                name: variableName,
            },
        });
        if (importPath.__paths && importPath.__paths.length) {
            hasFind = true;
            for (let property of variablePath.value.init.arguments[0]
                .properties) {
                if (property.key.name === propertyName) {
                    properties = property.value;
                }
            }
        }
        return {
            hasFind,
            properties,
        };
    };

    const replaceWithObject = path => {
        const objectName = path.value.value.expression.object.name;
        const propertyName = path.value.value.expression.property.name;

        let hasFind = false;
        let properties;

        g.find(j.VariableDeclarator, {
            id: {
                name: objectName,
            },
            init: {
                callee: {
                    object: {
                        type: "Identifier",
                    },
                    property: {
                        name: "create",
                    },
                },
            },
        }).forEach(variablePath => {
            if (hasFind) return;
            let result = findImportVariable(variablePath, propertyName);
            hasFind = result.hasFind;
            properties = result.properties;
        });

        if (hasFind) {
            j(path).replaceWith(
                j.jsxAttribute(
                    j.jsxIdentifier("sceneStyle"),
                    j.jsxExpressionContainer(properties),
                ),
            );
        }
    };

    g.find(j.JSXAttribute, {
        name: {
            name: "sceneStyle",
        },
        value: {
            expression: {
                type: "MemberExpression",
            },
        },
    }).forEach(replaceWithObject);
};

/** rule4: prettier code */
const prettierCode = g => {
    let _source = g.toSource();
    let cleanCode = prettier.format(_source, utils.prettierconfig);
    return cleanCode;
};

module.exports = function(fileInfo, api, options) {
    var j = api.jscodeshift;
    var g = j(fileInfo.source);

    removeNMNavigator(j, g);

    replaceNavigator(j, g);

    replaceSceneStyle(j, g);

    return prettierCode(g);
};
