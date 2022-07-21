import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Config from 'src/assets/json/header-nav.json';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.less'],
})
export class HeaderNavComponent implements OnInit {
  config = Config.data;

  constructor(private _router: Router) { }

  ngOnInit(): void { }
  navigate(path: string) {
    // console.log('path', path);
    this._router.navigateByUrl(path);
  }
}
