var path = require('path')
var glob = require('glob')
/**
 * 获取符合条件的entries
 * 
 * @method getEntries 
 * @param {String} glob 表达式
 * @param {String} base 基础路径
 */
exports.getEntries = function (globPath, base, replaceed) {
    var entries = {}
    glob.sync(globPath).forEach(function (entry) {
        var moduleName = entry.match(/(\w+).\w+$/)[1];
        if(base){
            let temp= path.relative(base,entry)
            moduleName=temp.replace(path.extname(entry),'')
        }
        if(replaceed){
            let idx=moduleName.indexOf(replaceed)
            if(idx>=0){
                let pre= moduleName.substring(0,idx)
                let after = moduleName.substring(idx+replaceed.length).replace(/^[\\\/]*/,'')
                moduleName=pre+after
            }
        }
        entries[moduleName] = entry
    })
    return entries;
}