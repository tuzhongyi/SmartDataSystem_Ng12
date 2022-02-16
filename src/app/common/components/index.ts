import { AccountInfoComponent } from './account-info/account-info.component';
import { AccountOperationComponent } from './account-operation/account-operation.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { SelectControlComponent } from './select-control/select-control.component';
import { StatisticLineEChartsComponent } from './statistic-line-echarts/statistic-line-echarts.component';
import { TabTitleComponent } from './tab-title/tab-title.component';
import { TableComponent } from './table/table.component';
import { TimeComponent } from './time/time.component';
import { TotalWasteComponent } from './total-waste/total-waste.component';
import { TreeComponent } from './tree/tree.component';
import { VideoPlayerComponent } from './video-player/video-player.component';

import { WindowComponent } from './window-control/window.component';
import { ImageControlComponent } from './image-control/image-control.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { TableSelectComponent } from './table-select/table-select.component';
import { VideoWindowComponent } from './video-window/video-window.component';
import { InputSearchComponent } from './input-search/input-search.component';
import { ImageVideoControlComponent } from './image-video-control/image-video-control.component';
import { ImageVideoMultControlComponent } from './image-video-mult-control/image-video-mult-control.component';
import { SortHeaderComponent } from './sort-header/sort-header.component';
import { VideoSettingControlComponent } from './video-window/video-setting-control/video-setting-control.component';
import { VideoPresetPointControlComponent } from './video-window/video-preset-point-control/video-preset-point-control.component';
import { VideoPlaybackSettingControlComponent } from './video-window/video-playback-setting-control/video-playback-setting-control.component';
import { TimeControlComponent } from './time-control/time-control.component';
import { Table_COMPONENTS } from './tables/table-component';
import { VideoDownloadPanelComponent } from './panels/video-download-panel/video-download-panel.component';
import { IllegalDropRecordComponent } from 'src/app/aiop-system/components/illegal-drop-record/illegal-drop-record.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { SidenavComponent } from './sidenav/sidenav.component';

export const CUSTOM_COMPONENTS = [
  StatisticLineEChartsComponent,
  TreeComponent,
  TimeComponent,
  AccountInfoComponent,
  AccountOperationComponent,
  TotalWasteComponent,
  WindowComponent,
  SelectControlComponent,
  TabTitleComponent,
  HeaderNavComponent,
  VideoPlayerComponent,
  TableComponent,
  ImageControlComponent,
  PaginatorComponent,
  TableSelectComponent,
  VideoWindowComponent,
  InputSearchComponent,
  ImageVideoControlComponent,
  ImageVideoMultControlComponent,
  SortHeaderComponent,
  VideoSettingControlComponent,
  VideoPresetPointControlComponent,
  VideoPlaybackSettingControlComponent,
  TimeControlComponent,
  ...Table_COMPONENTS,
  VideoDownloadPanelComponent,
  LineChartComponent,
  SidenavComponent,
];
