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

@Component({
  selector: 'howell-deploy-map',
  templateUrl: './deploy-map.component.html',
  styleUrls: ['./deploy-map.component.less']
})
export class DeployMapComponent implements OnInit, AfterViewInit {

  showOperate = false;
  mouseLon = 121.354257;
  mouseLat = 31.286901;
  isDragging = false;
  confirmLocation = false;

  locationDialog = new ConfirmDialogModel("提示", "是否保存当前位置");

  srcUrl: SafeResourceUrl = "";
  currentNode: CommonFlatNode<DivisionTreeSource> | null = null;
  point: CesiumDataController.Point | null = null;
  position: CesiumDataController.Position | null = null;

  client!: CesiumMapClient;
  mapLoaded = false;

  @ViewChild('iframe') iframe!: ElementRef<HTMLIFrameElement>;

  constructor(private _sanitizer: DomSanitizer, private _location: PlatformLocation, private _toastrService: ToastrService) {
    this.srcUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.getSrc());
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
      this.confirmLocation = true;
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
    this.confirmLocation = false;
    if (status == ConfirmDialogEnum.confirm) {
      this.locationYesClick();
    } else if (status == ConfirmDialogEnum.cancel) {
      this.locationCancelClick();
    }
  }
  locationYesClick() {
    if (this.point && this.position) {
      this.point.position.lon = this.position.lon;
      this.point.position.lat = this.position.lat;
      this.client.DataController.Village.Point.Update(this.point.parentId, this.point.id, this.point)
    }
  }
  locationCancelClick() {
    if (this.point) {
      this.client.Point.Remove(this.point.id)
      this.client.Point.Create(this.point)
    }
  }

  closeForm(update: boolean) {

  }


  getSrc() {
    const host = this._location.hostname;
    const port = this._location.port;
    const date = formatDate(new Date(), 'yyyyMMddHHmmss', "zh-CN")
    return `http://${host}:${port}/amap/map_ts.html?v=${date}`;
  }

}
