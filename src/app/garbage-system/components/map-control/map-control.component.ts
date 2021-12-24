import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LocalStorageService } from 'src/app/global/service/local-storage.service';
import { AMapBusiness } from './amap.business';

@Component({
  selector: 'app-map-control',
  templateUrl: './map-control.component.html',
  styleUrls: ['./map-control.component.less'],
  providers: [DatePipe, AMapBusiness],
})
export class MapControlComponent implements OnInit {
  constructor(
    private sanitizer: DomSanitizer,
    private business: AMapBusiness
  ) {}

  src?: SafeResourceUrl;

  ngOnInit(): void {
    let src = this.business.getSrc();
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(src);
  }

  onLoad(event: Event) {}
}
