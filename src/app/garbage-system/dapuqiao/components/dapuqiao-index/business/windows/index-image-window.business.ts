import { Injectable } from '@angular/core';
import { IndexImageArrayWindowBusiness } from './index-image-array-window.business';
import { IndexImagePageWindowBusiness } from './index-image-page-window.business';

@Injectable()
export class IndexImageWindowBusiness {
  constructor(
    public page: IndexImagePageWindowBusiness,
    public array: IndexImageArrayWindowBusiness
  ) {}
}
