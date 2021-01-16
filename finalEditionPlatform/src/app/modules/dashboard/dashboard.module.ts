import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardSideBarComponent } from './dashboard-side-bar/dashboard-side-bar.component';
import { DashboardComponent } from './dashboard.component';
import { DashboradHeaderComponent } from './dashborad-header/dashborad-header.component';
import { DashboradShowComponent } from './dashborad-show/dashborad-show.component';
import { DashboradStudentManagerComponent } from './dashborad-student-manager/dashborad-student-manager.component';
import { DashboradAccountManagerComponent } from './dashborad-account-manager/dashborad-account-manager.component';
import { ChartsComponent } from './widgets/charts/charts.component';

import {ChartsModule} from 'ng2-charts'
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatListModule} from '@angular/material'
import { AngularModulesModule } from 'src/app/angular-modules/angular-modules.module';
import { ValidationSpaceComponent } from './validation-space/validation-space.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DashboardSideBarComponent,
  DashboardComponent,
  DashboradHeaderComponent,
  DashboradShowComponent,
  DashboradStudentManagerComponent,
  DashboradAccountManagerComponent,
  ChartsComponent,
  ValidationSpaceComponent,
  StudentProfileComponent
  
  ],
imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    ChartsModule,
    AngularModulesModule,
    MatListModule,
    FormsModule
    
  ]
})
export class DashboardModule { }
