const utils = require('loader-utils')
const opencc = require('node-opencc')

module.exports = function (content) {
  const userOptions = utils.getOptions(this)
  if (userOptions && userOptions.type === 'i18n') {
    try {
      const zh = JSON.parse(content).zh
      const tw = opencc.simplifiedToTraditional(JSON.stringify(zh)) 
      const i18nData = {
        zh,
        tw: JSON.parse(tw)
      }
      console.info(i18nData)
      return JSON.stringify(i18nData)
    } catch (err) {
      return content
    }
  }

  if (this.resource.indexOf('index.yaml') > -1) {
    try {
      const regSemicolon = /[\n.]*;$/g
      const jsonData = content.replace('module.exports = ', '')
        .replace(regSemicolon, '')
      const zh_cn = JSON.stringify(JSON.parse(jsonData).zh)
      const tw = opencc.simplifiedToTraditional(zh_cn)
      const i18nData = {
        zh: JSON.parse(jsonData).zh,
        tw: JSON.parse(tw)
      }
      return `module.exports = ${JSON.stringify(i18nData)}`
    } catch (err) {
      return content
    }
  }
  return content
}
