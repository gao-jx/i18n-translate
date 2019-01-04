# 介紹
使用[node-openCC](https://github.com/compulim/node-opencc)作为翻译的数据库，支持简体转繁体

# 使用
```
npm install @tigerbrokers/i18n-translate

// 翻译yaml-loader处理后的文件
.rule('yaml')
.use('i18n-translate')
.loader('@tigerbrokers/i18n-translate')
.end()
.test(/\.yaml$/)
.use('yaml-import-loader')
.loader('yaml-import-loader')
.options({
  importRoot: true,
  importNested: true,
  importKeyword: 'import',
  importRawKeyword: 'import-raw',
  output: 'object'
})

// 翻译<i18n>中的文件
.use('i18n')
.loader('@kazupon/vue-i18n-loader')
.end()
.use('i18n-translate')
.loader('@tigerbrokers/i18n-translate')
.end()

```
# 说明
目前需要依赖yaml-loader, 使用vue-cli下的配置如下，只会对yaml-loader处理后的index.yaml做处理
```
config.module
  .rule('yaml')
  .use('i18n-translate')
  .loader('@tigerbrokers/i18n-translate')
  .end(
  .test(/\.yaml$/)
  .use('yaml-import-loader')
  .loader('yaml-import-loader')
```
# roadmap
- 支持custom-block（<i18n>）的翻译
- 支持多种格式文件翻译