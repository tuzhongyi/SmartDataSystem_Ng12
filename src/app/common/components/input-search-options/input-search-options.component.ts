import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import {
  SearchOptionKey,
  SearchOptions,
} from 'src/app/view-model/search-options.model';
import { Language } from '../../tools/language';
@Component({
  selector: 'app-input-search-options',
  templateUrl: './input-search-options.component.html',
  styleUrls: ['./input-search-options.component.less'],
})
export class InputSearchOptionsComponent implements OnInit, AfterViewInit {
  searchInput = new FormControl('');

  @ViewChild('searchBtn')
  searchBtn?: ElementRef;

  @ViewChild('input')
  input?: ElementRef;

  @Input() placeholder = '';

  @Output() search: EventEmitter<SearchOptions> = new EventEmitter();

  @Input()
  focusToSelectContent = false;

  /**
   * pmx 20211-08-18
   */
  // 双向绑定抛出内容
  searctText: string = '';

  key = SearchOptionKey.name;

  Key = SearchOptionKey;
  Language = Language;

  constructor() {}

  focus(event: Event) {
    if (this.focusToSelectContent) {
      if (this.input) {
        this.input.nativeElement.select();
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.searchBtn) {
      const clicks = fromEvent(this.searchBtn.nativeElement, 'click');
      const result = clicks.pipe(throttleTime(500));
      if (this.input) {
        const keyUp = fromEvent(this.input.nativeElement, 'keyup');
        const keyUpEvent = keyUp.pipe(throttleTime(500));

        result.subscribe((x) => {
          let opts: SearchOptions = {
            text: this.searctText,
            propertyName: this.key,
          };
          this.search.emit(opts);
        });
        keyUpEvent.subscribe((x: any) => {
          if (x.key.toLocaleLowerCase() == 'enter') {
            let opts = {
              text: this.searctText,
              propertyName: this.key,
            };
            this.search.emit(opts);
          }
        });
      }
    }
  }

  ngOnInit() {}
}
