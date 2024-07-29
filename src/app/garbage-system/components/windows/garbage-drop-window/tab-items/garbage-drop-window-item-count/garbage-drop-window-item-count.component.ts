import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { UserUIType } from 'src/app/enum/user-ui-type.enum';

@Component({
  selector: 'garbage-drop-window-item-count',
  templateUrl: './garbage-drop-window-item-count.component.html',
  styleUrls: ['./garbage-drop-window-item-count.component.less'],
  providers: [],
})
export class GarbageDropStationWindowItemCountComponent implements OnInit {
  constructor(local: LocalStorageService) {
    this.ui = local.user.UIType ?? UserUIType.garbage;
  }
  ui: UserUIType;
  UserUIType = UserUIType;
  async ngOnInit() {}
}
