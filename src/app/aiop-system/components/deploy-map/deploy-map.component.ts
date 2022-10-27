import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DivisionTreeSource } from 'src/app/converter/division-tree.converter';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { formatDate, Location, PlatformLocation } from '@angular/common';
import { MessageBar } from 'src/app/common/tools/message-bar';
import { ToastrService } from 'ngx-toastr';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { ConfirmDialogComponent } from 'src/app/common/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from 'src/app/view-model/confirm-dialog.model';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import { IconTypeEnum } from 'src/app/enum/icon-type.enum';
import { CoordinateTransform } from 'src/app/common/tools/coordinateTransform';
import { GisPoint } from 'src/app/network/model/gis-point.model';
import { GisType } from 'src/app/enum/gis-type.enum';
import { DeployMapBusiness } from './deploy-map.business';
import { IDialogMessage } from 'src/app/common/interfaces/dialog-message.interface';
import { ICoordinate } from 'src/app/common/interfaces/coordinate.interface';

@Component({
  selector: 'howell-deploy-map',
  templateUrl: './deploy-map.component.html',
  styleUrls: ['./deploy-map.component.less'],
  providers: [DeployMapBusiness],
})
export class DeployMapComponent implements OnInit, AfterViewInit {
  gisType = GisType.BD09;
  GisType = GisType;

  mouseLon = 0;
  mouseLat = 0;

  isDragging = false;
  locationDialog = false;
  unbindDialog = false;
  bindDialog = false;

  showOperate = false;
  operateTitle = '';

  locationModel = new ConfirmDialogModel('提示', '是否保存当前位置');
  unbindModel = new ConfirmDialogModel('提示', '是否解除绑定该点位');
  bindModel = new ConfirmDialogModel('提示', '是否绑定该点位');

  // iframe 地址
  srcUrl: SafeResourceUrl = '';

  // 当前选中节点
  currentNode: CommonFlatNode<DivisionTreeSource> | null = null;

  point: CesiumDataController.Point | null = null;
  position: CesiumDataController.Position | null = null;

  client!: CesiumMapClient;
  mapLoaded = false;

  @ViewChild('iframe') iframe!: ElementRef<HTMLIFrameElement>;

  constructor(
    private _sanitizer: DomSanitizer,
    private _location: PlatformLocation,
    private _toastrService: ToastrService,
    private _business: DeployMapBusiness
  ) {
    this.srcUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
      this._getSrc()
    );
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.client = new CesiumMapClient(this.iframe.nativeElement);
    this.client.Events.OnLoading = () => {
      console.log('loading');
    };
    this.client.Events.OnLoaded = () => {
      this._toastrService.success('地图初始化完成');
      this.mapLoaded = true;
    };
    this.client.Events.OnMouseMoving = (lon: number, lat: number) => {
      this.mouseLon = lon;
      this.mouseLat = lat;
    };
    this.client.Events.OnElementDragend = (
      point: CesiumDataController.Point,
      position: CesiumDataController.Position
    ) => {
      this.locationDialog = true;
      this.point = point;
      this.position = position;
    };
    this.client.Events.OnElementsClicked = (objs) => {
      if (!objs || objs.length < 0) return;
      // console.log("点击: ", objs)
      this.point = objs[0] as unknown as CesiumDataController.Point;
      this.client.Viewer.MoveTo(this.point!.position);
    };
    this.client.Events.OnMouseDoubleClick = (position) => {
      console.log('双击: ', position);

      // this.bindDialog = true;

      if (this.currentNode) {
        let rawData = this.currentNode.RawData;
        if (rawData instanceof GarbageStation) {
          if (rawData.GisPoint) return;
          else {
            this.position = position;
            this.bindDialog = true;
          }
        }
      }

      // this.position = position;
      // this._createPoint(data.lon, data.lat, rawData);
    };
  }
  selectTreeNode(node: CommonFlatNode<DivisionTreeSource>[]) {
    // console.log("selectTreeNode")
    this.point = null;
    this.position = null;
    if (!this.mapLoaded) return;
    if (node.length) {
      this.currentNode = node[0];
      console.log(this.currentNode);
      let rawData = this.currentNode.RawData;

      if (rawData instanceof Division) {
        this.client.Village.Select(rawData.Id);
        let village = this.client.DataController.Village.Get(rawData.Id);
        this.client.Viewer.MoveTo(village.center);
      } else if (rawData instanceof GarbageStation) {
        if (rawData.DivisionId) {
          this.client.Village.Select(rawData.DivisionId);

          try {
            this.point = this.client.DataController.Village.Point.Get(
              rawData.DivisionId,
              rawData.Id
            );
            this.client.Viewer.MoveTo(this.point.position);
          } catch (e) {
            let village = this.client.DataController.Village.Get(
              rawData.DivisionId
            );
            this.client.Viewer.MoveTo(village.center);
            this._toastrService.error('还未部署该点位');
          }
        }
      }
    }
  }
  dragPoint() {
    this.isDragging = !this.isDragging;
    if (this.isDragging) {
      this._toastrService.success('点位拖拽已开启');
    } else {
      this._toastrService.warning('点位拖拽已关闭');
    }
    this.client.Point.Draggable(this.isDragging);
  }

  // 绑定 - 解绑
  buttonIconClick(node: CommonFlatNode) {
    console.log('buttonIconClick');
    if (node.CurrentButtonIcon != void 0) {
      switch (node.ButtonIconClasses[node.CurrentButtonIcon]) {
        case IconTypeEnum.link:
          this.operateTitle = node.Name;
          this.linkClicked();
          break;
        case IconTypeEnum.unlink:
          this.unlinkClicked();
          break;
      }
    }
  }

  linkClicked() {
    this.showOperate = true;
  }
  unlinkClicked() {
    this.unbindDialog = true;
  }

  // 拖拽点位
  locationDialogMsg(status: DialogEnum) {
    this.locationDialog = false;
    if (status == DialogEnum.confirm) {
      this.locationYesClick();
    } else if (status == DialogEnum.cancel) {
      this.locationCancelClick();
    }
  }
  async locationYesClick() {
    if (this.point && this.position) {
      this.point.position.lon = this.position.lon;
      this.point.position.lat = this.position.lat;

      try {
        this.client.DataController.Village.Point.Update(
          this.point.parentId,
          this.point.id,
          this.point
        );

        let res = await this._updateGarbageStation(
          this.position.lon,
          this.position.lat
        );
        if (res) {
          this._toastrService.success('地图数据修改成功');
        }
      } catch (e) {
        this._toastrService.success('地图数据修改失败');
      }
    }
  }
  locationCancelClick() {
    if (this.point) {
      this.client.Point.Remove(this.point.id);
      this.client.Point.Create(this.point);
    }
  }

  // 解绑对话框
  unbindDialogMsg(status: DialogEnum) {
    if (status == DialogEnum.confirm) {
      this.unbindYesClick();
    } else if (status == DialogEnum.cancel) {
      // do nothing
    }
    this.unbindDialog = false;
  }
  async unbindYesClick() {
    if (this.currentNode) {
      let rawData = this.currentNode.RawData;
      if (rawData instanceof GarbageStation && rawData.DivisionId) {
        // 移除地图点位
        this._removePoint(rawData);

        // 更新垃圾厢房点位信息
        this._updateGarbageStation();

        // 更新树节点绑定图标
        this._toggleLink();
      }
    }
  }

  bindDialogMsg(status: DialogEnum) {
    if (status == DialogEnum.confirm) {
      if (this.currentNode && this.position) {
        let rawData = this.currentNode.RawData;
        if (rawData instanceof GarbageStation) {
          if (rawData.GisPoint) return;
          this._createPoint(this.position, rawData);
          // 更新垃圾厢房点位信息
          this._updateGarbageStation(this.position.lon, this.position.lat);
          // 更新树节点绑定图标
          this._toggleLink();
        }
      }
    } else if (status == DialogEnum.cancel) {
      // do nothing
    }
    this.bindDialog = false;
  }
  // 绑定点位
  async coordinateDialogMsg(msg: IDialogMessage<ICoordinate | null>) {
    if (msg.type == DialogEnum.confirm) {
      let data = msg.data;
      if (data && this.currentNode) {
        let rawData = this.currentNode.RawData;
        if (rawData instanceof GarbageStation) {
          let gcj02 = [data.lon, data.lat];

          switch (this.gisType) {
            case GisType.BD09:
              gcj02 = CoordinateTransform.bd09togcj02(data.lon, data.lat);
              break;
            case GisType.WGS84:
              gcj02 = CoordinateTransform.wgs84togcj02(data.lon, data.lat);
              break;
            default:
              break;
          }

          let position = new CesiumDataController.Position(
            gcj02[0],
            gcj02[1],
            18
          );

          // 创建地图点位
          this._createPoint(position, rawData);

          // 更新垃圾厢房点位信息
          this._updateGarbageStation(position.lon, position.lat);

          // 更新树节点绑定图标
          this._toggleLink();
        }
      }
    } else if (msg.type == DialogEnum.cancel) {
      // do nothing
    }
    this.showOperate = false;
  }

  // 给垃圾厢房创建对应的点位
  private _createPoint(
    position: CesiumDataController.Position,
    garbageStation: GarbageStation
  ) {
    let point = new CesiumDataController.Point();
    point.id = garbageStation.Id;
    point.name = garbageStation.Name;
    point.parentId = garbageStation.DivisionId ?? '';
    point.villageId = point.parentId;
    point.type = CesiumDataController.ElementType.Camera;
    point.position = position;
    point.position.height = 18;
    try {
      this.client.DataController.Village.Point.Create(
        point.villageId,
        point.id,
        point
      );
      this.client.Point.Create(point);
      this.client.Viewer.MoveTo(point.position);
      this.point = point;
      this.position = point.position;
      this._toastrService.success('点位数据创建成功');
    } catch (e) {
      this._toastrService.error('点位数据创建失败');
    }
  }
  private _removePoint(garbageStation: GarbageStation) {
    if (garbageStation.Id && garbageStation.DivisionId) {
      try {
        this.client.Point.Remove(garbageStation.Id);
        this.client.DataController.Village.Point.Remove(
          garbageStation.DivisionId,
          garbageStation.Id
        );

        this.point = null;
        this.position = null;

        this._toastrService.success('点位数据删除成功');
      } catch (e) {
        this._toastrService.error('点位数据删除失败');
      }
    }
  }
  private async _updateGarbageStation(lon?: number, lat?: number) {
    if (this.currentNode) {
      let rawData = this.currentNode.RawData;
      if (rawData instanceof GarbageStation) {
        if (lon && lat) {
          let gisPoint = new GisPoint();
          gisPoint.Longitude = lon;
          gisPoint.Latitude = lat;
          gisPoint.GisType = GisType.GCJ02;
          rawData.GisPoint = gisPoint;
        } else {
          rawData.GisPoint = void 0;
        }

        let res = await this._business.updateGarbageStation(rawData);

        // this._toastrService.success('垃圾厢房点位信息更新');

        return res;
      }
    }
    return null;
  }

  private _toggleLink() {
    if (!this.currentNode) return;
    // if (this.currentNode.CurrentButtonIcon != void 0) {
    //   let iconClass = this.currentNode.ButtonIconClasses[this.currentNode.CurrentButtonIcon]

    //   if (iconClass == IconTypeEnum.link) {
    //     this.currentNode.ButtonIconClasses[this.currentNode.CurrentButtonIcon] = IconTypeEnum.unlink
    //   } else if (iconClass == IconTypeEnum.unlink) {
    //     this.currentNode.ButtonIconClasses[this.currentNode.CurrentButtonIcon] = IconTypeEnum.link
    //   }
    // }

    // 通过代码自动创建点位时，更改状态，
    if (this.currentNode.ButtonIconClasses.includes(IconTypeEnum.link)) {
      let index = this.currentNode.ButtonIconClasses.indexOf(IconTypeEnum.link);
      this.currentNode.ButtonIconClasses[index] = IconTypeEnum.unlink;
    } else if (
      this.currentNode.ButtonIconClasses.includes(IconTypeEnum.unlink)
    ) {
      let index = this.currentNode.ButtonIconClasses.indexOf(
        IconTypeEnum.unlink
      );
      this.currentNode.ButtonIconClasses[index] = IconTypeEnum.link;
    }
  }
  private _getSrc() {
    const host = this._location.hostname;
    const port = this._location.port;
    const date = formatDate(new Date(), 'yyyyMMddHHmmss', 'zh-CN');
    return `http://${host}:${port}/amap/map_ts.html?v=${date}`;
  }
}
