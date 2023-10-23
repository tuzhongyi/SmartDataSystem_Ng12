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
    }
  }
  private ele: HTMLElement;
}
