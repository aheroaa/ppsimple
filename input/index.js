let path = require('path')
let conf = require('./index.current.conf.json')

conf = Object.assign({
  "root": "../",
  "entry": "**/js/*.js",
  "src": "/src",
  "dist": "asset",
  "asset": "asset",
  "assetPublicPath": "../",
  "needVendor":true,
  "devport": 6001,
  'dirStaticCopy': []
}, conf)



let pro_path = path.resolve(__dirname, conf.root)
let relative_path = pro_path // '../' //conf.root

let x = {
  pro_path: pro_path,
  src_path: path.join(relative_path, conf.src),
  dist_path: path.join(relative_path, conf.dist),
  asset_path: path.join(relative_path, conf.asset),
  asset_public_path: conf.assetPublicPath,
  entry_expr: conf.entry,
  devport: conf.devport,
  dirStaticCopy: conf.dirStaticCopy,
  needVendor:conf.needVendor
}
module.exports=x