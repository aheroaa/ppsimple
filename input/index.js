let path = require('path')
let conf = require('./index.conf.json')


let pro_path = path.resolve(__dirname, conf.root)
let relative_path =pro_path // '../' //conf.root

let [src_path, dist_path, asset_path] = [
    path.join(relative_path, conf.src),
    path.join(relative_path, conf.dist),
    path.join(relative_path, conf.asset)
]

module.exports = {
  relative_path,
  pro_path,
  src_path,
  dist_path,
  asset_path
}
