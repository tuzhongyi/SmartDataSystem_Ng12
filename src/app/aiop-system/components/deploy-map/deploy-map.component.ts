import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { ConfirmDialogEnum } from 'src/app/enum/confim-dialog.enum';
import { IconTypeEnum } from 'src/app/enum/icon-type.enum';
import { Coordinate } from 'src/app/common/components/coordinate-manage/coordinate-manage.component';
import { CoordinateTransform } from 'src/app/common/tools/CoordinateTransform';
import { GisPoint } from 'src/app/network/model/gis-point.model';
import { GisType } from 'src/app/enum/gis-type.enum';
import { DeployMapBusiness } from './deploy-map.business';

@Component({
  selector: 'howell-deploy-map',
  templateUrl: './deploy-map.component.html',
  styleUrls: ['./deploy-map.component.less'],
  providers: [
    DeployMapBusiness
  ]
})
export class DeployMapComponent implements OnInit, AfterViewInit {

  mouseLon = 0;
  mouseLat = 0;
  isDragging = false;
  locationDialog = false;
  unbindDialog = false;

  showOperate = false;
  operateTitle = "";


  locationModel = new ConfirmDialogModel("提示", "是否保存当前位置");
  unbindModel = new ConfirmDialogModel("提示", "是否解除绑定");

  // iframe 地址
  srcUrl: SafeResourceUrl = "";

  // 当前选中节点
  currentNode: CommonFlatNode<DivisionTreeSource> | null = null;

  point: CesiumDataController.Point | null = null;
  position: CesiumDataController.Position | null = null;

  client!: CesiumMapClient;
  mapLoaded = false;

  @ViewChild('iframe') iframe!: ElementRef<HTMLIFrameElement>;

  constructor(private _sanitizer: DomSanitizer, private _location: PlatformLocation, private _toastrService: ToastrService, private _business: DeployMapBusiness) {
    this.srcUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this._getSrc());
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.client = new CesiumMapClient(this.iframe.nativeElement);
    this.client.Events.OnLoading = () => {
      console.log('loading')
    }
    this.client.Events.OnLoaded = () => {
      this._toastrService.success('地图初始化完成');
      this.mapLoaded = true;
    }
    this.client.Events.OnMouseMoving = (lon: number, lat: number) => {
      this.mouseLon = lon;
      this.mouseLat = lat;
    }
    this.client.Events.OnElementDragend = (point: CesiumDataController.Point, position: CesiumDataController.Position) => {
      this.locationDialog = true;
      this.point = point;
      this.position = position;
    }
    this.client.Events.OnElementsClicked = (objs) => {
      if (!objs || objs.length < 0) return;
      console.log("点击: ", objs)
      this.point = objs[0] as unknown as CesiumDataController.Point;
      this.client.Viewer.MoveTo(this.point!.position)
    }
  }
  selectTreeNode(node: CommonFlatNode<DivisionTreeSource>[]) {
    if (!this.mapLoaded) return;
    if (node.length) {
      this.currentNode = node[0];
      let rawData = this.currentNode.RawData;

      if (rawData instanceof Division) {
        this.client.Village.Select(rawData.Id);
        let village = this.client.DataController.Village.Get(rawData.Id);
        this.client.Viewer.MoveTo(village.center)
      } else if (rawData instanceof GarbageStation) {
        if (rawData.DivisionId) {
          this.client.Village.Select(rawData.DivisionId)
          this.point = this.client.DataController.Village.Point.Get(rawData.DivisionId, rawData.Id);
          this.client.Viewer.MoveTo(this.point.position)
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
    this.client.Point.Draggable(this.isDragging)
  }
  locationDialogMsg(status: ConfirmDialogEnum) {
    this.locationDialog = false;
    if (status == ConfirmDialogEnum.confirm) {
      this.locationYesClick();
    } else if (status == ConfirmDialogEnum.cancel) {
      this.locationCancelClick();
    }
  }
  async locationYesClick() {
    if (this.point && this.position) {
      this.point.position.lon = this.position.lon;
      this.point.position.lat = this.position.lat;

      try {
        this.client.DataController.Village.Point.Update(this.point.parentId, this.point.id, this.point)

        let gisPoint = new GisPoint();
        gisPoint.Longitude = this.position.lon;
        gisPoint.Latitude = this.position.lat;
        gisPoint.GisType = GisType.GCJ02;

        let res = await this._updateGarbageStation(gisPoint);
        if (res) {
          this._toastrService.success('地图数据修改成功')
        }
      } catch (e) {
        this._toastrService.success('地图数据修改失败')
      }

    }
  }
  locationCancelClick() {
    if (this.point) {
      this.client.Point.Remove(this.point.id)
      this.client.Point.Create(this.point)
    }
  }

  unbindDialogMsg(status: ConfirmDialogEnum) {

    if (status == ConfirmDialogEnum.confirm) {

    }
    else if (status == ConfirmDialogEnum.cancel) {

    }
    this.unbindDialog = false;
  }


  buttonIconClick(node: CommonFlatNode) {
    if (node.CurrentButtonIcon != void 0) {
      switch (node.ButtonIconClasses[node.CurrentButtonIcon]) {
        case IconTypeEnum.link:
          this.operateTitle = node.Name;
          this.linkClicked();
          break;
        case IconTypeEnum.unlink:
          break;
      }
    }
  }
  closeForm(data: Coordinate | null) {
    if (data && this.currentNode) {
      let rawData = this.currentNode.RawData;
      if (rawData instanceof GarbageStation) {
        let lon = data.lon;
        let lat = data.lat;

        let point = new CesiumDataController.Point();
        point.id = rawData.Id;
        point.name = rawData.Name;
        point.parentId = rawData.DivisionId ?? "";
        point.villageId = point.parentId;
        point.type = CesiumDataController.ElementType.Camera;


        let gcj02 = CoordinateTransform.bd09togcj02(lon, lat);
        point.position = new CesiumDataController.Position(
          gcj02[0],
          gcj02[1],
          18
        )
        try {
          this.client.DataController.Village.Point.Create(point.villageId, point.id, point);
          this.client.Point.Create(point);
        } catch (e) {
          this._toastrService.error('点位录入坐标失败')
        }



      }

    }
    this.showOperate = false;
  }
  private async _updateGarbageStation(gisPoint: GisPoint) {
    if (this.currentNode) {
      let rawData = this.currentNode.RawData;
      if (rawData instanceof GarbageStation) {
        rawData.GisPoint = gisPoint;
        let res = await this._business.updateGarbageStation(rawData)
        console.log('点位更新 ', res)

        return res;
      }
    }
    return null;
  }
  private linkClicked() {
    this.showOperate = true;
  }
  private unlinkClicked() {

  }

  private _getSrc() {
    const host = this._location.hostname;
    const port = this._location.port;
    const date = formatDate(new Date(), 'yyyyMMddHHmmss', "zh-CN")
    return `http://${host}:${port}/amap/map_ts.html?v=${date}`;
  }

}

// 121.481032  31.277591