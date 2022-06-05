export class HowellUrl {
    Origin: any;
    AbsoluteUri: any;
    Scheme: any;
    UserInfo: any;
    Authority: any;
    Port: any;
    Host: any;
    PathAndQuery: any;
    AbsolutePath: any;
    Query: any;
    Querys: any;
    Segments: any;
    constructor(url: string) {
      if (url.lastIndexOf("#") === url.length - 1) {
        url = url.substr(0, url.length - 1);
      }
      let temp;
      const schemeIndex = url.indexOf(":") + 3;
      const userInfoIndex = url.indexOf("@");
      let authorityIndex = url.indexOf("/", schemeIndex);
      if (authorityIndex < 0) {
        authorityIndex = url.length;
      }
      const queryIndex = url.indexOf("?");
  
      this.Origin = url;
      if (queryIndex > 0) {
        this.Origin = url.substr(0, queryIndex);
      }
      this.AbsoluteUri = url;
      this.Scheme = url.substr(0, schemeIndex - 3);
  
      if (userInfoIndex > 0) {
        this.UserInfo = url.substr(schemeIndex, userInfoIndex - schemeIndex);
        this.Authority = url.substr(
          userInfoIndex + 1,
          authorityIndex - userInfoIndex - 1
        );
      } else {
        this.Authority = url.substr(schemeIndex, authorityIndex - schemeIndex);
      }
      this.Port = 80;
      this.Host = this.Authority;
      if (this.Authority.indexOf(":") > 0) {
        temp = this.Authority.split(":");
        this.Host = temp[0];
        this.Port = temp[1];
      }
  
      this.PathAndQuery = url.substr(queryIndex, url.length - queryIndex);
  
      this.AbsolutePath = this.PathAndQuery;
  
      if (queryIndex > 0) {
        temp = this.PathAndQuery.split("?");
        this.AbsolutePath = temp[0];
        this.Query = temp[1];
      }
      if (this.Query) {
        const items = this.Query.split("&");
        this.Querys = {};
        for (let i = 0; i < items.length; i++) {
          const index = items[i].indexOf("=");
          this.Querys[items[i].substr(0, index)] = items[i].substr(index + 1);
        }
      }
  
      this.Segments = null;
      if (this.AbsolutePath !== "") {
        this.Segments = this.AbsolutePath.split("/");
      }
    }
  
    toString() {
      var param = "";
      if (this.Querys) {
        var i = 0;
        for (var q in this.Querys) {
          if (i == 0) param = "?";
          if (i++ > 0) param += "&";
          param += q + "=" + this.Querys[q];
        }
      }
  
      var result = this.Scheme + "://";
      if (this.UserInfo) result += this.UserInfo + "@";
      result += this.Host;
      if (this.Origin.indexOf(":", 6) > 0) result += ":" + this.Port;
  
      result += this.AbsolutePath + param;
      return result;
    }
  }
  