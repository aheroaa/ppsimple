let path = require('path')
let conf = require('./index.conf.json')


// {
//   "root": "../../",
//   "entry": "**/js/*/*.js",
//   "src": "pack/src",
//   "dist": "asset",
//   "asset": "asset",
//   "devport": 6001
// }

// {
//   "root": "../../",
//   "entry": "**/util-*.js",
//   "src": "src",
//   "dist": "dist",
//   "asset": "dist",
//   "devport": 6001
// }



let pro_path = path.resolve(__dirname, conf.root)
let relative_path =pro_path // '../' //conf.root

let [src_path, dist_path, asset_path, entry_expr, devport] = [
    path.join(relative_path, conf.src),
    path.join(relative_path, conf.dist),
    path.join(relative_path, conf.asset),
    conf.entry,
    conf.devport
]

module.exports = {
  relative_path,
  pro_path,
  src_path,
  dist_path,
  asset_path,
  entry_expr,
  devport
}
