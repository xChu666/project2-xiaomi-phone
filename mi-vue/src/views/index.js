//views文件夹内要能够把所有views文件夹中的页面级组件统一导入，整合
// 成一个对象再统一导出让当前文件使用所有页面级组件时代码更加优雅
var files = require.context("./",true,/index.vue$/);
var views = {};

files.keys().forEach(filePath => {
        var key = filePath.match(/.*\/(.*)\/index.vue$/)[1];
        views[key] = files(filePath).default;

})

export default views;