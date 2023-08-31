import { Injectable } from '@angular/core';
import { IndexMediaMultipleWindowBusiness } from './index-media-multiple-window.business';
import { IndexMediaSingleWindowBusiness } from './index-media-single-window.business';
import { IndexMediaVideoWindowBusiness } from './index-media-video-window.business';

@Injectable()
export class IndexMediaWindowBusiness {
  constructor(
    public single: IndexMediaSingleWindowBusiness,
    public multiple: IndexMediaMultipleWindowBusiness,
    public video: IndexMediaVideoWindowBusiness
  ) {}
}
