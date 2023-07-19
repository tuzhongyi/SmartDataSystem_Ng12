import { Injectable } from '@angular/core';
import { CommitteesIndexImageArrayWindowBusiness } from './committees-image-array-window.business';
import { CommitteesIndexImagePageWindowBusiness } from './committees-image-page-window.business';

@Injectable()
export class CommitteesIndexImageWindowBusiness {
  constructor(
    public page: CommitteesIndexImagePageWindowBusiness,
    public array: CommitteesIndexImageArrayWindowBusiness
  ) {}
}
