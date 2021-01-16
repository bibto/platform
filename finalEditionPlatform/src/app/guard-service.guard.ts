import { Injectable, RootRenderer } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { LoginService } from './services/login_service/login.service';
@Injectable({
  providedIn:"root"
})
export class GuardServiceGuard implements CanActivate {
  constructor(private loginservice:LoginService,private router:Router){}

  canActivate():boolean{
       if(this.loginservice.loggedIn()){return true}
       else{this.router.navigate(['/login'])
        return false
      }
  }
  }

