const PROXY_CONFIG = [
  {
    context: [
      '/howell/ver10/data_service/',
      '/api/howell/ver10/aiop_service/',
      '/video/wsplayer/',
      '/amap/',
    ],
    target: 'http://iebs.51hws.cn',
    // target: 'http://192.168.21.241:9000',
    changeOrigin: true,
    secure: false,
  },
  // {
  //   context: ['/amap/'],
  //   target: 'http://192.168.21.241:9000',
  //   changeOrigin: true,
  //   secure: false,
  // },
];

module.exports = PROXY_CONFIG;
