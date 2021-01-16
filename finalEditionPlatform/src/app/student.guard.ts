import { Injectable } from '@angular/core';
import { LoginService } from './services/login_service/login.service';
import { Router,CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {
  constructor(private loginservice:LoginService,private router:Router){}

  canActivate():boolean{
    if(this.loginservice.getStudent()){return true}
    else{this.router.navigate(['/dashboard']);
    return false
    }
  }
  }
  

