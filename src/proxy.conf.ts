const PROXY_CONFIG = [
  {
    context: ['/howell/ver10/data_service/', '/api/howell/ver10/aiop_service/'],
    target: 'http://garbage01.51hws.com',
    changeOrigin: true,
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
