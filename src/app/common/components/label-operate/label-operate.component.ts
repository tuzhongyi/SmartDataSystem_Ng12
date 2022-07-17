import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResourceLabel } from 'src/app/network/model/resource-label.model';
import { SimpleSearchComponent } from '../simple-search/simple-search.component';
import { LabelOperateBusiness } from './label-operate.business';

@Component({
  selector: 'howell-label-operate',
  templateUrl: './label-operate.component.html',
  styleUrls: ['./label-operate.component.less'],
  providers: [
    LabelOperateBusiness
  ]
})
export class LabelOperateComponent implements OnInit, AfterViewInit {
  private _condition_pool: string = '';
  private _condition_native: string = '';

  allLables: ResourceLabel[] = [];
  resourceLabels: ResourceLabel[] = [];
  selection = new SelectionModel<ResourceLabel>(true);


  highLight = (model: ResourceLabel) => {
    return this.selection.isSelected(model);
  };

  @Input()
  title: string = '标签管理';

  @Input() showTitle = true;

  @Input()
  resourceId: string = '';


  @Output() selectLabelEvent: EventEmitter<ResourceLabel[]> = new EventEmitter<
    ResourceLabel[]
  >();


  constructor(private _business: LabelOperateBusiness, private _toastrService: ToastrService) { }

  @ViewChild('searchPool') searchPool?: SimpleSearchComponent;

  ngOnInit(): void {
    this.selection.changed.subscribe((change) => {
      this.selectLabelEvent.emit(change.source.selected);
    });

    this._init();
  }

  ngAfterViewInit(): void {
    // console.log(this.searchPool)
  }
  private async _init() {
    this._listAllLbales();
    if (this.resourceId) {
      this._listResourceLabels();
    }
  }

  private async _listAllLbales() {
    let res = await this._business.listAllLabels(this._condition_pool);
    console.log('所有标签', res)
    this.allLables = res.Data;
  }
  private async _listResourceLabels() {
    this.resourceLabels = await this._business.getResourceLabels(this.resourceId, this._condition_native)
    console.log('资源标签', this.resourceLabels)
  }
  searchPoolEvent(condition: string) {
    this._condition_pool = condition;
    this._listAllLbales();
  }

  searchNativeEvent(condition: string) {
    this._condition_native = condition;
    this._listResourceLabels();
  }

  async addLabel() {
    if (this.searchPool) {
      this._condition_pool = this.searchPool.getValue();
      if (this._condition_pool) {
        let res = await this._business.createLabel(this._condition_pool)
        if (res) {
          this._toastrService.success('添加成功')
          this._condition_pool = '';
          this._listAllLbales();
        }
      }

    }
  }
  selectLabel(label: ResourceLabel) {
    this.selection.toggle(label)
  }
  async deleteLabel(e: Event, label: ResourceLabel) {
    e.stopPropagation();
    let res = await this._business.deleteLabel(label.Id)
    if (res) {
      this._toastrService.success('删除成功');
      this._listAllLbales();
    }
  }
  async deleteResourceLabel(label: ResourceLabel) {
    let res = await this._business.deleteResourceLabel(this.resourceId, label.Id);
    if (res) {
      this._toastrService.success('删除成功');
      this._listResourceLabels();
    }
  }
  onSubmit() {

  }
  onReset() {

  }
}
