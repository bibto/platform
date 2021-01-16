import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { ICON_REGISTRY_PROVIDER_FACTORY } from '@angular/material';
@Injectable({
  providedIn: 'root'
})

export class RegistrationService {
private registerAPi="http://localhost:3000/api/register"
  constructor(private http:HttpClient) { }
  registerf(data){
    return this.http.post<any>(this.registerAPi,data)
  }
}
 