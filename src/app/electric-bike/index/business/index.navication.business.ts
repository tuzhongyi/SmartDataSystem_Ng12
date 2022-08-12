import { Injectable } from '@angular/core';
import { CommitteesNavicationModel } from '../../navication/navication.component.model';

@Injectable()
export class ElectricBikeIndexNavicationBusiness {
  constructor() {}
  root?: CommitteesNavicationModel;
  children: CommitteesNavicationModel[] = [];
  selected?: CommitteesNavicationModel;

  onchildclick(model: CommitteesNavicationModel) {
    this.selected = model;
  }
}
