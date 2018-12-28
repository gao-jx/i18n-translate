const http = require("http")
const token = '98251bf17d0c634d09f90d204e2304d1'
const qs = require('querystring')

const uploadData = async (postData) => {
  let chunk = ''
  const option = {
    hostname: '172.28.48.19',
    port: 4041,
    path: `/opencc`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return new Promise((resolve, reject) => {
    let req = http.request(option, (res) => {
      res.on('data', d => {
        chunk += d
      })

      res.on('end', d => {
        try {
          resolve(JSON.parse(chunk))
        } catch (err) {
          throw err
        }
      })
      res.on('error', d => {
        throw d
      })
    })
    req.write(postData)
    req.end()
  })
}
module.exports = async function (content) {
  // find index.yaml
  if (this.resource.indexOf('index.yaml') > -1) {
    try {
      const regSemicolon = /[\n.]*;$/g
      const jsonData = content.replace('module.exports = ', '')
        .replace(regSemicolon, '')
      const zh_cn = JSON.stringify(JSON.parse(jsonData).zh)
      var postData = qs.stringify({
        'token': token,
        'from_lang': 'zh',
        'to_lang': 'cht',
        'query': zh_cn,
        'type': 'community'
      })
      const tw = await uploadData(postData)
      const i18nData = {
        zh: JSON.parse(jsonData).zh,
        tw: JSON.parse(tw.dst)
      }
      return `module.exports = ${JSON.stringify(i18nData)}`
    } catch (err) {
      return content
    }
  }
  return content
}
