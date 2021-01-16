import { Injectable,Injector } from '@angular/core';
import {HttpInterceptor,HttpRequest,HttpHandler} from '@angular/common/http'
import { LoginService } from './login_service/login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenIterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) { }
  intercept(req:HttpRequest<any>,next:HttpHandler){
    let loginservice=this.injector.get(LoginService)
    let tokenize=req.clone({
            setHeaders:{
        Authorization:`bearer ${loginservice.gettoken()}`
      }
    })
    return next.handle(tokenize) 
  }
}
