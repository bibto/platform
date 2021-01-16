import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login_service/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { userCredential } from 'src/app/userCredential';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user=new userCredential('','');

  constructor(private router:Router,private loginservice:LoginService) { }

  ngOnInit() {
    this.loginservice.dashboardAcess()
    .subscribe(res=>{this.user.name=res["userCredentials"]["name"];this.user.role=res["userCredentials"]["role"]

    //console.log(this.user)
  },
    err=>{
      if (err instanceof HttpErrorResponse)
      {
        if (err.status==401){this.router.navigate(['/login'])}
      }
    }
    )

  }

  }


