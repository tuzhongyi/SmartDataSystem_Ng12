import { Injectable } from '@angular/core';
import { MediaMultipleWindowBusiness } from './media-multiple-window.business';
import { MediaSingleWindowBusiness } from './media-single-window.business';

@Injectable()
export class MediaWindowBusiness {
  constructor(
    public single: MediaSingleWindowBusiness,
    public multiple: MediaMultipleWindowBusiness
  ) {}
}
