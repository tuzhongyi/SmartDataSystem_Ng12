import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[image]',
})
export class ImageDirective implements OnInit, OnChanges {
  @Input()
  url?: string | null;
  @Input()
  directiveClass = 'directive-image';
  @Input() default = '/assets/img/timg-pic.jpg';

  constructor(e: ElementRef) {
    this.ele = e.nativeElement;
  }

  ngOnInit(): void {
    if (!this.ele.classList.contains(this.directiveClass)) {
      this.ele.classList.add(this.directiveClass);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.url && this.url) {
      this.ele.style.backgroundImage = `url(${this.url})`;
      setTimeout(() => {
        this.ele.style.backgroundImage = `url(${this.url}), url(${this.default})`;
      }, 1000);
    }
  }
  private ele: HTMLElement;
}
