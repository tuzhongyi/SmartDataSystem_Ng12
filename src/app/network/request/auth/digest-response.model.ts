import { Md5 } from 'ts-md5';

export class DigestResponse {
  realm: string = '';
  qop: string = '';
  nonce: string = '';
  opaque: string = '';

  static parse(authenticate: string) {
    let fields_str = authenticate.replace(/Digest\s/i, '');
    let fields_arr = fields_str.split(',');

    let response = new DigestResponse();

    let len = fields_arr.length;
    for (let i = 0; i < len; i++) {
      var values = /([a-zA-Z]+)=\"?([a-zA-Z0-9.@\/\s]+)\"?/.exec(fields_arr[i]);
      if (values) {
        (response as any)[values[1]] = values[2];
      }
    }
    // console.log(challenge);
    return response;
  }

  ToString(
    method: string,
    uri: string,
    username: string,
    password: string,
    nc: number
  ) {
    const _nc = nc.toString(16).padStart(8, '0');

    var cnonce = ('00000000' + Math.random().toString(36).slice(2)).slice(-8);
    const qop = this.qop;

    const opaque = this.opaque;

    const hash1 = Md5.hashStr(`${username}:${this.realm}:${password}`);

    const hash2 = Md5.hashStr(`${method}:${uri}`);
    const response = Md5.hashStr(
      `${hash1}:${this.nonce}:${_nc}:${cnonce}:${qop}:${hash2}`
    );

    const authHeaders = `Digest username="${username}",realm="${this.realm}",nonce="${this.nonce}",uri="${uri}",algorithm="MD5",response="${response}",opaque="${opaque}",qop="${qop}",nc="${_nc}",cnonce="${cnonce}"`;

    return authHeaders;
  }
}
