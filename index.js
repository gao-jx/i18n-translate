module.exports = function (content) {
  const value = JSON.stringify(content)
  const exportData = `module.exports = function (Component) {
    Component.options.__doc = ${value}
  }`
  this.callback(null, exportData)
  // if (this.version && this.version >= 2) {
  //   try {
  //     this.cacheable && this.cacheable()
  //     this.callback(null, `module.exports = ${generateCode(content)}`)
  //   } catch (err) {
  //     this.emitError(err.message)
  //     this.callback(err)
  //   }
  // } else {
  //   const message = 'support webpack 2 later'
  //   this.emitError(message)
  //   this.callback(new Error(message))
  // }
  // return `module.exports = ${content}`
}

function generateCode (content) {
  let code = ''

  let value = typeof content === 'string'
    ? JSON.parse(content)
    : content
  value = JSON.stringify(value)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
    .replace(/\\/g, '\\\\')

  code += `function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('${value.replace(/\u0027/g, '\\u0027')}')
  delete Component.options._Ctor
}\n`
  return code
}
