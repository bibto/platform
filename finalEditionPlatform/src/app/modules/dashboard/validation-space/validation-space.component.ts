import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login_service/login.service';
import { ActivatedRoute } from '@angular/router';
import { PushStudentToService } from 'src/app/services/push-student-to.service';

@Component({
  selector: 'app-validation-space',
  templateUrl: './validation-space.component.html',
  styleUrls: ['./validation-space.component.scss']
})
export class ValidationSpaceComponent implements OnInit {
  studentsArray=[]
  statusoptions=["","not treated yet","waitting","valid","not valid"]
  filter={studentid:"",registrationdate:"",date_of_start:"",status:""}
  constructor(private loginservice:LoginService,private route:ActivatedRoute,private PSTSP:PushStudentToService) {
    
  }

  ngOnInit() {
    
  }

  pushStudentToProfile(studentID){
    this.PSTSP.pushstudentto(studentID)
  }

  searchByFilter(){
    this.loginservice.validationspace(this.filter)
    .subscribe(res=>{this.studentsArray=res["studentsArray"]
    console.log(this.studentsArray)
  })

  }

}
