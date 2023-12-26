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
      this.get(this.url).then((x) => {
        this.ele.style.backgroundImage = `url(${x})`;
      });
    }
  }

  get(url: string) {
    return new Promise<string>((resolve) => {
      let img = new Image();
      img.src = url;
      img.onerror = () => {
        resolve(this.default);
      };
      img.onload = () => {
        resolve(url);
      };
    });
  }

  private ele: HTMLElement;
}
