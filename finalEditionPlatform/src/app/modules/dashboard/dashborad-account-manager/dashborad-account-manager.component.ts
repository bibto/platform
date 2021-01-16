import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login_service/login.service';
LoginService
@Component({
  selector: 'app-dashborad-account-manager',
  templateUrl: './dashborad-account-manager.component.html',
  styleUrls: ['./dashborad-account-manager.component.scss']
})
export class DashboradAccountManagerComponent implements OnInit {
 agent={}
 acess=false
 addstatus=false
  constructor(private loginservice:LoginService) { }

  ngOnInit() {
  }
  addagent(){
    this.loginservice.adduser(this.agent)
    .subscribe(res=>{console.log(this.addstatus)})
  }

}
