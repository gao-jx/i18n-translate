const Opencc = require('opencc')
const instance = new Opencc("s2t.json")

module.exports = async function (content) {
  // find index.yaml
  if (this.resource.indexOf('index.yaml') > -1) {
    try {
      const regSemicolon = /[\n.]*;$/g
      const jsonData = content.replace('module.exports = ', '')
        .replace(regSemicolon, '')
      const zh_cn = JSON.stringify(JSON.parse(jsonData).zh)
      const i18nData = {
        zh: JSON.parse(jsonData).zh
      }
      instance.convert(zh_cn, (err, convertData) => {
        i18nData.tw = JSON.parse(convertData)
      })
      return `module.exports = ${JSON.stringify(i18nData)}`
    } catch (err) {
      return content
    }
  }
  return content
}
