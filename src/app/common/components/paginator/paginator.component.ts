/*
 * @Author: pmx
 * @Date: 2021-12-30 15:27:11
 * @Last Modified by: pmx
 * @Last Modified time: 2021-12-30 15:51:51
 */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ElementRef,
  Inject,
  Injector,
  Input,
  OnInit,
  Optional,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import {
  MatPaginatorDefaultOptions,
  MAT_PAGINATOR_DEFAULT_OPTIONS,
  _MatPaginatorBase,
} from '@angular/material/paginator';
import { TimeComponent } from '../time/time.component';
import { PaginatorIntl } from './paginator-intl';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.less'],
  host: { class: 'paginator' },
  providers: [PaginatorIntl],
  exportAs: 'paginator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PaginatorComponent
  extends _MatPaginatorBase<MatPaginatorDefaultOptions>
  implements AfterViewInit
{
  @Input() currentCount = 0;
  @ViewChild('actionContainer')
  actionContainer?: ElementRef;

  @ViewChild('nextPageNode')
  nextPageNode?: MatButton;

  @ViewChild('buttonContainer', { read: ViewContainerRef })
  buttonContainer?: ViewContainerRef;

  constructor(
    private _injector: Injector,
    private _renderer: Renderer2,
    private resolver: ComponentFactoryResolver,
    public intl: PaginatorIntl,
    changeDetectorRef: ChangeDetectorRef,
    @Optional()
    @Inject(MAT_PAGINATOR_DEFAULT_OPTIONS)
    defaults?: MatPaginatorDefaultOptions
  ) {
    super(intl, changeDetectorRef, defaults);
  }
  override ngOnInit(): void {
    super.ngOnInit();
  }
  ngAfterViewInit(): void {
    console.log(this.buttonContainer);
    let div = this._renderer.createElement('div');
    div.innerHTML = '4';
    const factory: ComponentFactory<MatButton> =
      this.resolver.resolveComponentFactory(MatButton);
    let componentRef = this.buttonContainer?.createComponent(
      factory,
      0,
      this._injector,
      [[div]]
    );
    console.log(componentRef);
  }

  private _createButton(index: number) {}
}
