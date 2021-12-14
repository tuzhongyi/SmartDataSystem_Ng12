var LRU = require("lru-cache");


class AppCache {

  constructor(maxAge) {
    var options = {
      max: 500
      , length: function (n, key) { return n * 2 + key.length }
      , dispose: function (key, n) { }
      , maxAge: maxAge
    };

    this.cache = new LRU(options);
  }
  get (key) {
    return this.cache.get(key);
  }
  set (key, value) {
    return this.cache.set(key, value);
  }
  del (key) {
    this.cache.del(key)
  }

  reset () {
    this.cache.reset()
  }

}

exports.AppCache = AppCache;