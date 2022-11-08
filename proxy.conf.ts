/*
 * @Author: pmx
 * @Date: 2022-11-03 09:56:29
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-08 13:53:03
 */
const PROXY_CONFIG = [
  {
    context: [
      '/howell/ver10/data_service/',
      '/api/howell/ver10/aiop_service/',
      '/video/wsplayer/',
      '/amap/',
    ],
    // target: 'http://iebs.51hws.cn',
    // target: 'http://192.168.21.241:9000',
    // target: 'http://garbage01.51hws.com',
    target: 'http://192.168.21.122:8080',
    changeOrigin: true,
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
