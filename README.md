# 介紹
使用[OpenCC](https://github.com/byvoid/opencc)作为翻译的数据库，支持简体转繁体

# 使用
```
npm install @tigerbrokers/i18n-translate

```
# 说明
目前需要依赖yaml-loader, 使用vue-cli下的配置如下，只会对yaml-loader处理后的index.yaml做处理
```
config.module
  .rule('yaml')
  .use('i18n-translate')
  .loader('@tigerbrokers/i18n-translate')
  .end()
  .test(/\.yaml$/)
  .use('yaml-import-loader')
  .loader('yaml-import-loader')
```
# roadmap
- 支持custom-block（<i18n>）的翻译
- 支持多种格式文件翻译