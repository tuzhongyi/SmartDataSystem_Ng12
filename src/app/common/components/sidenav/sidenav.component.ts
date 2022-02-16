import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'howell-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.less'],
  host: {},
})
export class SidenavComponent implements OnInit {
  @Input() shrink = false;

  constructor(private _router: Router) {}

  ngOnInit(): void {}
  clickHandler() {
    this._router.navigateByUrl('/aiop/aiop-manage/monitor-platform/deploy-map');
  }
}
