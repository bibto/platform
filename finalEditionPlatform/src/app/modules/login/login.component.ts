import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login_service/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
user={}
val=true
result=0
  constructor(private loginservice:LoginService,private router:Router) { }

  ngOnInit() {
  }
  login(){
    this.loginservice.login(this.user).subscribe(res=>{
      console.log(res);
      localStorage.setItem('token',res["token"])
      this.router.navigate(['dashboard'])
      
    },err=>console.log(err))
  }

}
