import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login_service/login.service';
import { userCredential } from 'src/app/userCredential';
userCredential
@Component({
  selector: 'app-dashboard-side-bar',
  templateUrl: './dashboard-side-bar.component.html',
  styleUrls: ['./dashboard-side-bar.component.scss']
})
export class DashboardSideBarComponent implements OnInit {
  @Input() data:userCredential;

  constructor(private loginservice:LoginService) { }

  ngOnInit() {
  }


}
