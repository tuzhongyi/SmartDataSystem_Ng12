import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommitteesIndexComponent } from './index/index.component';
import { GarbageCommitteesRoutingModule } from './garbage-committees-routing.module';
import { GarbageComponentsModule } from '../components/garbage-components.module';
import { CommitteesNavicationComponent } from './navication/committees-navication.component';
import { DivisionInformationComponent } from './station-information/station-information.component';
import { CommitteesStatisticComponent } from './statistic/committees-statistic.component';
import { TaskTableComponent } from './task-table/task-table.component';
import { CommitteesHistroyTableComponent } from './histroy-table/committees-history-table.component';
import { CommitteesMessageBarComponent } from './message-bar/message-bar.component';
import { MobileChangeComponent } from './mobile/mobile-change/mobile-change.component';
import { MobileViewComponent } from './mobile/mobile-change/view/mobile-view.component';
import { MobileBindingComponent } from './mobile/mobile-binding/mobile-binding.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordChangeComponent } from './password-change/password-change.component';

@NgModule({
  declarations: [
    CommitteesIndexComponent,
    CommitteesNavicationComponent,
    DivisionInformationComponent,
    CommitteesStatisticComponent,
    TaskTableComponent,
    CommitteesHistroyTableComponent,
    CommitteesMessageBarComponent,

    MobileChangeComponent,
    MobileViewComponent,
    MobileBindingComponent,

    PasswordChangeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GarbageCommitteesRoutingModule,
    GarbageComponentsModule,
  ],
})
export class GarbageCommitteesModule {}
