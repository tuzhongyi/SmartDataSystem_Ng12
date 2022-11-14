import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RegionTreeSource } from 'src/app/converter/region-tree.converter';
import { AICamera } from 'src/app/network/model/ai-camera.model';
import { Resource } from 'src/app/network/model/resource.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';
import { RegionTreeComponent } from '../../../common/components/region-tree/region-tree.component';
import { CameraMoveBusiness } from './camera-move.business';

@Component({
  selector: 'howell-camera-move',
  templateUrl: './camera-move.component.html',
  styleUrls: ['./camera-move.component.less'],
  providers: [CameraMoveBusiness],
})
export class CameraMoveComponent implements OnInit {
  private _currentNode?: CommonFlatNode<RegionTreeSource>;

  cameras: AICamera[] = [];

  @Input()
  resourceIds: string[] = [];

  @Output()
  closeEvent = new EventEmitter<boolean>();

  @ViewChild(RegionTreeComponent) regionTree?: RegionTreeComponent;

  constructor(
    private _business: CameraMoveBusiness,
    private _toastrService: ToastrService
  ) {}

  async ngOnInit() {
    if (this.resourceIds.length) {
      this.cameras = (await this._business.getAICameras(this.resourceIds)).Data;
      console.log('cameras', this.cameras);
    }
  }
  ngAfterViewInit(): void {
    if (this.regionTree) {
      let extra = new CommonNestNode();
      extra.Id = String(null);
      extra.Name = '未分配摄像机';
      extra.HasChildren = false;
      extra.ParentId = null;
      extra.ChildrenLoaded = true;
      extra.ParentNode = null;
      extra.IconClass = 'howell-icon-video';
      this.regionTree.addNode(extra);
    }
  }
  selectRegionTreeNode(nodes: CommonFlatNode[]) {
    this._currentNode = nodes[0];
    console.log('外部结果', nodes);
  }

  async onSubmit() {
    if (this._currentNode) {
      if (this._currentNode.Expandable) {
        this._toastrService.warning('请选择最底层节点');
        return;
      }
      for (let i = 0; i < this.cameras.length; i++) {
        let camera = this.cameras[i];
        if (this._currentNode.Id == 'null') camera.RegionId = undefined;
        else camera.RegionId = this._currentNode.Id;
        await this._business.updateCamera(camera);
      }

      this._toastrService.success('操作成功');
      this.closeEvent.emit(true);
    }
  }
  onReset() {
    this.closeEvent.emit(false);
  }
}
