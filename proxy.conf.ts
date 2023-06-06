/*
 * @Author: pmx
 * @Date: 2022-11-03 09:56:29
 * @Last Modified by: pmx
 * @Last Modified time: 2022-12-06 13:44:51
 */
const PROXY_CONFIG = [
  {
    context: [
      '/howell/ver10/data_service/',
      '/api/howell/ver10/aiop_service/',
      '/video/wsplayer/',
      'ng-cli-ws',
    ],
    // target: 'http://iebs.51hws.cn',
    target: 'http://192.168.21.241:9000',
    // target: 'http://garbage01.51hws.com',
    // target: 'http://192.168.21.122:8080',
    changeOrigin: true,
    secure: false,
  },
  {
    context: ['/amap/'],
    // target: 'http://192.168.21.241:9000',
    // target: 'http://garbage01.51hws.com',
    target: 'http://127.0.0.1:8011',
    changeOrigin: true,
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
