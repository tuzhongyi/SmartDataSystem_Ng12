import { Injectable } from '@angular/core';
import { CommitteesMediaMultipleWindowBusiness } from './committees-media-multiple-window.business';
import { CommitteesMediaSingleWindowBusiness } from './committees-media-single-window.business';

@Injectable()
export class CommitteesMediaWindowBusiness {
  constructor(
    public single: CommitteesMediaSingleWindowBusiness,
    public multiple: CommitteesMediaMultipleWindowBusiness
  ) {}
}
