import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { from } from 'rxjs';
import { DefaultModule } from './layouts/default/default.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegistrationService } from './services/registration_service/registration.service';
import { FormsModule } from '@angular/forms';
import { LoginService } from './services/login_service/login.service';
import { GuardServiceGuard } from './guard-service.guard';
import { TokenIterceptorService } from './services/token-iterceptor.service';
import { StudentGuard } from './student.guard';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    DefaultModule,
    DashboardModule,
    HttpClientModule,
    FormsModule,

   
  ],
  providers: [RegistrationService,LoginService,GuardServiceGuard,StudentGuard,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenIterceptorService,
    multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
