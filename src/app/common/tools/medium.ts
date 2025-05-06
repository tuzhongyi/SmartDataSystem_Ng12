import { PicturesUrl } from 'src/app/network/url/aiop/medium/pictures/pictures.url';
import { ImageResult } from 'src/app/view-model/image-result.model';

export class Medium {
  constructor() {}

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
    return new Promise((resolve, reject) => {
      if (!url) {
        resolve('/assets/img/timg-pic.jpg');
        return;
      }
      let img = Medium.jpg(url);
      var image = new Image();
      image.src = img;
      image.onerror = () => {
        resolve('/assets/img/timg-pic.jpg');
        reject(url);
      };
      image.onload = () => {
        resolve(img);
      };
    });
  }
  static image(url?: string): Promise<ImageResult> {
    return new Promise((resolve, reject) => {
      let img = '';
      if (url) {
        if (url.includes('http') || url.includes('/')) {
          img = url;
        } else {
          img = Medium.jpg(url);
        }
      } else {
        resolve({
          url: '/assets/img/timg-pic.png',
          error: true,
        });
        return;
      }

      var image = new Image();
      image.src = img;
      image.onerror = () => {
        resolve({
          url: '/assets/img/timg-pic.png',
          error: true,
        });
        reject(url);
      };
      image.onload = () => {
        resolve({
          url: img,
          error: false,
        });
      };
    });
  }
}
