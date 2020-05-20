/**
 * [exports Imgae如果拥有children则用ImageBackground替代]
 * @param  {[type]} file    [description]
 * @param  {[type]} api     [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
module.exports = function(file, api, options) {
    const j = api.jscodeshift;
    const printOptions = options.printOptions || {};
    const g = j(file.source);

    const buildGivenStyle = () => {
        const width = j.property('init', j.identifier('widht'), j.identifier(`'100%'`));
        const height = j.property('init', j.identifier('height'), j.identifier(`'100%'`));
        const properties = [width, height];
        return j.objectExpression(properties);
    }

    const buildStyle = (attributes) => {
        const neededAddStyle = buildGivenStyle();
        let finalStyle = neededAddStyle;
        let hasStyle = false;
        attributes.forEach(attr => {
            if(attr.type === 'JSXAttribute' && 
                attr.name.name === 'style') {
                hasStyle = true;

                if(attr.value.expression.type === 'ArrayExpression') {
                    attr.value.expression.elements.push(neededAddStyle);
                    finalStyle = attr.value;
                } else {
                    finalStyle = [attr.value, finalStyle]
                    attr.value.expression = j.arrayExpression([attr.value.expression, neededAddStyle])
                }
            }
        });
        if(!hasStyle) {
            attributes.push(j.jsxAttribute(j.jsxIdentifier('style'), j.jsxExpressionContainer(finalStyle)))
        }
    }

    const buildjSXAttribute = (attributes=[]) => {
        buildStyle(attributes)
        return attributes;
    }

    const buildJSXOpeningElement = (attributes, selfClosing) => {
        return j.jsxOpeningElement(j.jsxIdentifier('ImageBackground'), buildjSXAttribute(attributes), selfClosing)
    }

    const buildJSXClosingElement = () => {
        return j.jsxClosingElement(j.jsxIdentifier('ImageBackground'))
    }

    const buildImportSpecifier = () => {
        return j.importSpecifier(j.identifier('ImageBackground'))
    }

    const checkIfHasImageBackground = (node) => {
        let has = false;
        node.value.specifiers.forEach(item => {
            if (item.imported.name === 'ImageBackground') {
                has = true;
            }
        });
        return has;
    }

    /**
     * [增加 ImageBackground的引入]
     * @return {[type]} [description]
     */
    const addImageBackgroundImport = () => {
        g.find(j.ImportSpecifier, {
            imported: {
                name: 'Image'
            }
        }).forEach(path => {
            if (!checkIfHasImageBackground(path.parent)) {
                j(path).insertAfter(buildImportSpecifier)
            }
        })
    }

    const checkChildren = (path) => {
        return path.value.children.length;
    }

    const buildImageBackground = (path) => {
        return j.jsxElement(buildJSXOpeningElement(path.value.openingElement.attributes, false), buildJSXClosingElement(), path.value.children)
    }

    /**
     * [替换 Image]
     * @return {[type]} [description]
     */
    const imageHasChidren2ImageBackground = () => {
        return g.find(j.JSXElement, {
            openingElement: {
                name: {
                    name: 'Image'
                }
            }
        }).forEach(path => {
            if (checkChildren(path)) {
                j(path).replaceWith(buildImageBackground(path))
            }
        })
    }



    addImageBackgroundImport();

    return imageHasChidren2ImageBackground().toSource()

};