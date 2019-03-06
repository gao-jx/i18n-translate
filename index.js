const utils = require('loader-utils')
const opencc = require('node-opencc')

module.exports = function (content) {
  const userOptions = utils.getOptions(this)
  if (userOptions && userOptions.type === 'i18n') {
    try {
      const {zh, en} = JSON.parse(content)
      const tw = opencc.simplifiedToTraditional(JSON.stringify(zh)) 
      const i18nData = {
        zh,
        tw: JSON.parse(tw)
      }
      if (en) {
        i18nData.en = en
      }
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
      const {zh, en} = JSON.parse(jsonData)
      const tw = opencc.simplifiedToTraditional(JSON.stringify(zh))
      const i18nData = {
        zh,
        tw: JSON.parse(tw)
      }
      if (en) {
        i18nData.en = en
      }
      return `module.exports = ${JSON.stringify(i18nData)}`
    } catch (err) {
      return content
    }
  }
  return content
}
