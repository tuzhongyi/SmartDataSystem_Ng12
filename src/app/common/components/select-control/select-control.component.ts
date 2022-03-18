import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SelectItem } from './select-control.model';

@Component({
  selector: 'app-select-control',
  templateUrl: './select-control.component.html',
  styleUrls: ['./select-control.component.less'],
})
export class SelectControlComponent implements OnInit, OnChanges {
  @Input()
  data?: SelectItem[];

  @Input()
  load?: EventEmitter<any>;
  @Output()
  select: EventEmitter<SelectItem> = new EventEmitter();
  @Input()
  cannull:boolean = false;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {    
    if (changes.load && changes.load.firstChange) {
      if (this.load) {
        this.load.subscribe((x) => {
          if (x) {            
            this.onselect(x)
          } 
        });
      }
    }
  }

  ngOnInit(): void {
    window.addEventListener('click', () => {
      this.opened = false;
    });
    if(this.data && this.data.length > 0 && !this.load){
      
      this.onselect(this.data[0])
    }
  }

  selected?: SelectItem;

  opened = false;

  toggle(event: Event) {
    this.opened = !this.opened;
    event.stopPropagation();
  }
  onselect(item: SelectItem, event?: Event) {
    if (this.selected === item) return;
    this.selected = item;
    this.opened = false;
    this.select.emit(item);
  }

  clear(event:Event){
    this.selected = undefined;
    event.cancelBubble = true;
    this.opened = false;
    this.select.emit(undefined);
  }
}
