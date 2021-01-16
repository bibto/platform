import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { RegisterComponent } from './modules/register/register.component';
import { LoginComponent } from './modules/login/login.component';
import { DashboradShowComponent } from './modules/dashboard/dashborad-show/dashborad-show.component';
import { DashboradStudentManagerComponent } from './modules/dashboard/dashborad-student-manager/dashborad-student-manager.component';
import { DashboradAccountManagerComponent } from './modules/dashboard/dashborad-account-manager/dashborad-account-manager.component';
import { StudentProfileComponent } from './modules/dashboard/student-profile/student-profile.component';
import { ValidationSpaceComponent } from './modules/dashboard/validation-space/validation-space.component';
import { GuardServiceGuard } from './guard-service.guard';
import { StudentGuard } from './student.guard';


const routes: Routes = [
  {
    path: '', component: DefaultComponent,
    children: [{ path: '', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [{ path: 'dashboardShow', component: DashboradShowComponent },
    { path: '', redirectTo: 'dashboardShow', pathMatch: 'full' },
    { path: 'student_manager', component: DashboradStudentManagerComponent,
    canActivate:[StudentGuard],
  children:[{path:'student_profile/:id',component:StudentProfileComponent}] },
    { path: 'account_manager', component: DashboradAccountManagerComponent },
    {path:'validation_space',component:ValidationSpaceComponent,
  children:[{path:'student_profile/:id',component:StudentProfileComponent}]}
    ],
    canActivate:[GuardServiceGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
