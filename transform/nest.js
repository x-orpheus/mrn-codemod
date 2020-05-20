/**
 * [exports 替换Text包裹View,类似如下结构
 * <Text><View>{props.text}</View></Text>，会被转化成<View><View>{props.text}</View></View>]
 * @param  {[type]} file    [description]
 * @param  {[type]} api     [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */

const prettier = require("prettier");
const utils = require("./utils");

module.exports = function(file, api, options) {
  const j = api.jscodeshift;
  const printOptions = options.printOptions || {};


  const isViewComponent = node => {
      return node.type === 'JSXElement' && node.openingElement.name.name === 'View'
  }

  const buildJSXOpeningElement = (attr, selfClosing) => {
    return j.jsxOpeningElement(j.jsxIdentifier('View'), attr, selfClosing)
  }

  const buildJSXClosingElement = (type) => {
    return j.jsxClosingElement(j.jsxIdentifier('View'))
  }

  const replaceText = (path) => {
    return path.value.children.filter((item) => {
        if(isViewComponent(item)) {
          j(path).replaceWith(j.jsxElement(buildJSXOpeningElement(path.value.openingElement.attributes, false), buildJSXClosingElement('View'), path.value.children))
        }
      })
  }


  let _source = j(file.source).find(j.JSXElement, {
        openingElement: {
            name: {
                name: 'Text'
            }
        }
    }).forEach(replaceText).toSource(printOptions);


  /**这里用prettier再处理一次，比如，问题和（）问题 */
  let cleanCode = prettier.format(_source, utils.prettierconfig);
  return cleanCode;
};