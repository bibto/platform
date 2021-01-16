import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { RegistrationService } from 'src/app/services/registration_service/registration.service';
RegistrationService
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  student=new Student('','','',0,'','','','')
  
  countryList=['tun','alger','maroc','libya','germ','turk']
  fieldList=['networking','dev','managment','arch']
  
  constructor(private auth:RegistrationService) { }

  ngOnInit() {
  }
submitFunc(){
  this.auth.registerf(this.student)
  .subscribe(
    res=>console.log(res),
    err=>console.log(err)
  )
}
}
