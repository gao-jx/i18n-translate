const Opencc = require('opencc')
const instance = new Opencc("s2t.json")
const utils = require('loader-utils')

module.exports = function (content) {
  const userOptions = utils.getOptions(this)
  if (userOptions && userOptions.type === 'i18n') {
    try {
      const zh = JSON.parse(content).zh
      const i18nData = {
        zh,
        tw: JSON.parse(instance.convertSync(JSON.stringify(zh)))
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
      const zh_cn = JSON.stringify(JSON.parse(jsonData).zh)
      const i18nData = {
        zh: JSON.parse(jsonData).zh,
        tw: JSON.parse(instance.convertSync(zh_cn))
      }
      return `module.exports = ${JSON.stringify(i18nData)}`
    } catch (err) {
      return content
    }
  }
  return content
}
