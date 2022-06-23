import { PicturesUrl } from 'src/app/network/url/aiop/medium/pictures/pictures.url';

export class Medium {
  constructor() { }

  static default = '/assets/img/timg-pic.jpg';

  static binary() {
    return PicturesUrl.binary();
  }

  static jpg(id?: string) {
    if (!id) return this.default;
    return PicturesUrl.jpg(id);
  }
  static data(id?: string) {
    if (!id) return this.default;
    return PicturesUrl.data(id);
  }

  static img(url?: string): Promise<string> {
    return new Promise((resolve) => {
      let img = url
        ? Medium.jpg(url)
        : '';
      var image = new Image();
      image.src = img;
      image.onerror = () => {
        resolve('/assets/img/timg-pic.jpg');
      };
      image.onload = () => {
        resolve(img);
      }
    })

  }
}
