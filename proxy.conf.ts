const PROXY_CONFIG = [
  {
    context: [
      '/howell/ver10/data_service/',
      '/api/howell/ver10/aiop_service/',
      '/video/wsplayer/',
    ],
    target: 'http://iebs.51hws.cn',
    // target: 'http://192.168.21.241:9000',
    changeOrigin: true,
    secure: false,
  },
  {
    context: ['/amap/'],
    target: 'http://127.0.0.1:8011',
    changeOrigin: true,
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
