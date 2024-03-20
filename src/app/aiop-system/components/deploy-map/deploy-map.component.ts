import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import { GisType } from 'src/app/enum/gis-type.enum';
import { IconTypeEnum } from 'src/app/enum/icon-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { DeployAMapBusiness } from './amap/deploy-amap.business';
import { DeployAMapClient } from './amap/deploy-amap.client';
import { DeployMapStationBusiness } from './deploy-map-station.business';
import { DeployMapBusiness } from './deploy-map.business';
import { DeployMapConverter } from './deploy-map.converter';
import { DeployMapWindow } from './deploy-map.model';

@Component({
  selector: 'howell-deploy-map',
  templateUrl: './deploy-map.component.html',
  styleUrls: ['./deploy-map.component.less'],
  providers: [
    DeployAMapClient,
    DeployAMapBusiness,
    DeployMapStationBusiness,
    DeployMapBusiness,
  ],
})
export class DeployMapComponent implements OnInit, AfterViewInit {
  constructor(
    sanitizer: DomSanitizer,
    private toastr: ToastrService,
    public business: DeployMapBusiness
  ) {
    this.srcUrl = sanitizer.bypassSecurityTrustResourceUrl(
      this.business.amap.src
    );
  }
  GisType = GisType;

  window = new DeployMapWindow();

  isDragging = false;
  // iframe 地址
  srcUrl: SafeResourceUrl = '';
  converter = new DeployMapConverter();
  selected: {
    station?: GarbageStation;
    point?: CesiumDataController.Point;
    node?: CommonFlatNode;
  } = {};
  treetrigger = new EventEmitter<string[]>();

  @ViewChild('iframe') iframe!: ElementRef<HTMLIFrameElement>;
  ngOnInit(): void {
    this.business.amap.dragend.subscribe((x) => {
      this.selected.point = x.point;
      this.window.location.point = x.point;
      this.window.location.position = x.position;
      this.window.location.show = true;
      this.business.station.get(x.point.id).then((x) => {
        this.selected.station = x;
      });
    });
    this.business.amap.dblclick.subscribe((position) => {
      if (this.selected.station || this.selected.point) {
        this.window.location.position = position;
        this.window.location.show = true;
      }
    });
    this.business.amap.click.subscribe((point) => {
      this.selected.point = point;
      this.business.station.get(point.id).then((x) => {
        this.selected.station = x;
        this.treetrigger.emit([x.Id]);
      });
    });
  }

  ngAfterViewInit(): void {
    if (this.iframe) {
      this.business.amap.init(this.iframe.nativeElement);
    }
  }
  async ontreeselected(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    this.selected.station = undefined;
    this.selected.point = undefined;
    this.selected.node = undefined;

    if (nodes.length) {
      let node = nodes[0];
      if (node.RawData instanceof Division) {
        this.business.amap.selectVillage(node.RawData.Id);
      } else if (node.RawData instanceof GarbageStation) {
        this.selected.node = node;
        this.selected.station = node.RawData;
        if (this.selected.station.DivisionId) {
          this.business.amap.selectVillage(this.selected.station.DivisionId);

          try {
            this.selected.point = await this.business.amap.selectPoint(
              this.selected.station.DivisionId,
              this.selected.station.Id
            );
          } catch (e) {
            this.toastr.error('还未部署该点位');
          }
        }
      }
    }
  }
  // 绑定 - 解绑
  ontreebutton(node: CommonFlatNode) {
    if (node.CurrentButtonIcon != void 0) {
      this.selected.node = node;
      this.selected.station = node.RawData;
      switch (node.ButtonIconClasses[node.CurrentButtonIcon]) {
        case IconTypeEnum.link:
          this.window.coordinate.station = node.RawData;
          this.window.coordinate.show = true;
          break;
        case IconTypeEnum.unlink:
          this.window.unbind.show = true;
          break;
      }
    }
  }
  ondrag() {
    this.isDragging = !this.isDragging;
    if (this.isDragging) {
      this.toastr.success('点位拖拽已开启');
    } else {
      this.toastr.warning('点位拖拽已关闭');
    }
    this.business.amap.drag(this.isDragging);
  }

  // 拖拽点位
  async onlocation(status: DialogEnum) {
    if (status == DialogEnum.confirm) {
      await this.onlocationyes();
    } else if (status == DialogEnum.cancel) {
      this.onlocationcancel();
    }
    this.window.location.clean();
    this.window.location.show = false;
  }
  async onlocationyes() {
    if (this.selected.station && this.window.location.position) {
      let amapResult: Promise<CesiumDataController.Point | undefined>;
      let point: CesiumDataController.Point;
      let result = false;
      // 点位拖拽
      if (this.window.location.point) {
        point = this.window.location.point;

        point.position.lon = this.window.location.position.lon;
        point.position.lat = this.window.location.position.lat;
        result = await this.business.amap.update(point);
      }
      // 修改位置
      else if (this.selected.point) {
        point = this.selected.point;

        point.position.lon = this.window.location.position.lon;
        point.position.lat = this.window.location.position.lat;
        result = await this.business.amap.update(point);
      }
      // 绑定
      else {
        point = this.converter.convert(this.selected.station);

        point.position.lon = this.window.location.position.lon;
        point.position.lat = this.window.location.position.lat;
        result = await this.business.amap.create(
          this.selected.station.DivisionId!,
          point
        );
      }
      if (result) {
        this.toastr.success('地图点位更新成功');
        this.selected.station.GisPoint = this.converter.position.to(
          this.window.location.position
        );
        this.business.station.update(this.selected.station).then((x) => {
          this.toastr.success('数据库厢房更新成功');
          this._toggleLink();
        });
      } else {
        this.toastr.error('地图点位更新失败');
      }
    }
  }
  onlocationcancel() {
    if (this.window.location.point) {
      this.business.amap.refresh(this.window.location.point);
    }
  }

  // 解绑对话框
  onunbind(status: DialogEnum) {
    if (status == DialogEnum.confirm) {
      this.onunbindyes();
    } else if (status == DialogEnum.cancel) {
      // do nothing
    }
    this.window.unbind.show = false;
  }
  async onunbindyes() {
    if (this.selected.station) {
      let result = await this.business.amap.remove(
        this.selected.station.DivisionId!,
        this.selected.station.Id
      );
      if (result) {
        this.toastr.success('地图点位删除成功');
      } else {
        this.toastr.error('地图点位删除失败');
      }
      this.selected.station.GisPoint = undefined;
      this.business.station.update(this.selected.station).then((x) => {
        this.toastr.success('数据库厢房更新成功');
        this._toggleLink();
      });
    }
  }

  // onbind(status: DialogEnum) {
  //   if (status == DialogEnum.confirm) {
  //     if (this.currentNode && this.position) {
  //       let rawData = this.currentNode.RawData;
  //       if (rawData instanceof GarbageStation) {
  //         if (rawData.GisPoint) return;
  //         this._createPoint(this.position, rawData);
  //         // 更新垃圾厢房点位信息
  //         this._updateGarbageStation(this.position.lon, this.position.lat);
  //         // 更新树节点绑定图标
  //         this._toggleLink();
  //       }
  //     }
  //   } else if (status == DialogEnum.cancel) {
  //     // do nothing
  //   }
  //   this.bindDialog = false;
  // }
  // 绑定点位
  async onCoordinateDialogOk(station: GarbageStation) {
    this.selected.station = station;
    if (this.selected.station && station.GisPoint) {
      let point = this.converter.convert(station);
      let result = await this.business.amap.create(station.DivisionId!, point);
      if (result) {
        this.toastr.success('地图点位创建成功');
        this.business.station.update(station).then((x) => {
          this.toastr.success('数据库厢房更新成功');
          // 更新树节点绑定图标
          this._toggleLink();
        });
      }
    }

    this.window.coordinate.show = false;
  }

  private _toggleLink() {
    if (!this.selected.node) return;

    // 通过代码自动创建点位时，更改状态，
    if (this.selected.node.ButtonIconClasses.includes(IconTypeEnum.link)) {
      let index = this.selected.node.ButtonIconClasses.indexOf(
        IconTypeEnum.link
      );
      this.selected.node.ButtonIconClasses[index] = IconTypeEnum.unlink;
    } else if (
      this.selected.node.ButtonIconClasses.includes(IconTypeEnum.unlink)
    ) {
      let index = this.selected.node.ButtonIconClasses.indexOf(
        IconTypeEnum.unlink
      );
      this.selected.node.ButtonIconClasses[index] = IconTypeEnum.link;
    }
  }
}
