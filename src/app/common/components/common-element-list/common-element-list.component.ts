import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IModel } from 'src/app/network/model/model.interface';
import { CommonElementListBusiness } from './common-element-list.business';
import {
  CommonElementListModel,
  COMMON_ELEMENT_LIST_TOKEN,
  ICommonElementListBusiness,
} from './common-element-list.model';

@Component({
  selector: 'common-element-list',
  templateUrl: './common-element-list.component.html',
  styleUrls: ['./common-element-list.component.less'],
  providers: [
    {
      provide: COMMON_ELEMENT_LIST_TOKEN,
      useClass: CommonElementListBusiness,
    },
  ],
})
export class CommonElementListComponent implements OnInit {
  @Input('business') _business: ICommonElementListBusiness;

  @Output() itemClick = new EventEmitter();

  model: CommonElementListModel<IModel> | null = null;
  selectedModel: CommonElementListModel<IModel> | null = null;

  constructor(
    @Inject(COMMON_ELEMENT_LIST_TOKEN) business: ICommonElementListBusiness
  ) {
    this._business = business;
  }

  async ngOnInit() {
    this.model = await this._business.init();
  }

  click(model: CommonElementListModel<IModel>) {
    this.selectedModel = model;

    this.itemClick.emit(model);
  }
}
