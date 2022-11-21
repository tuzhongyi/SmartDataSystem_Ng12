import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IModel } from 'src/app/network/model/model.interface';
import { ElementListBusiness } from './element-list.business';
import {
  ElementListModel,
  ELEMENT_LIST_TOKEN,
  IElementListBusiness,
} from './element-list.model';

@Component({
  selector: 'element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.less'],
  providers: [
    {
      provide: ELEMENT_LIST_TOKEN,
      useClass: ElementListBusiness,
    },
  ],
})
export class ElementListComponent implements OnInit {
  @Input('business') _business: IElementListBusiness;

  @Output() itemClick = new EventEmitter();

  model: ElementListModel<IModel> | null = null;
  selectedModel: ElementListModel<IModel> | null = null;

  constructor(@Inject(ELEMENT_LIST_TOKEN) business: IElementListBusiness) {
    this._business = business;
  }

  async ngOnInit() {
    this.model = await this._business.init();
  }

  click(model: ElementListModel<IModel>) {
    this.selectedModel = model;

    this.itemClick.emit(model);
  }
}
