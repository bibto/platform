import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login_service/login.service';
import { Student } from '../../student';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { PushStudentToService } from 'src/app/services/push-student-to.service';

@Component({
  selector: 'app-dashborad-student-manager',
  templateUrl: './dashborad-student-manager.component.html',
  styleUrls: ['./dashborad-student-manager.component.scss'],
  providers:[PushStudentToService]
})
export class DashboradStudentManagerComponent implements OnInit {
  statusoptions=["","not treated yet","waitting","valid","not valid"]
  filter={studentid:"",agentid:"",registrationdate:"",date_of_start:"",status:""}
  student=new Student('','','',0,'','','','')
  studentsArray=[]
  agentslist=[]
  constructor(private loginservice:LoginService,private router:Router,private PSTSP:PushStudentToService) {
  
  }

  ngOnInit() {
    this.loginservice.getusers()
    .subscribe((res)=>{
      this.agentslist=res["agentsList"]
    })
  }
  get(id){
    console.log(id)
  }
  pushStudentToProfile(studentid){
    this.PSTSP.pushstudentto(studentid)
  }

searchByFilter(){
  this.loginservice.studentManager(this.filter)
  .subscribe((res)=>{this.studentsArray=res["studentsArray"]
  console.log(this.studentsArray)
  },
  (err)=>{
    if (err instanceof HttpErrorResponse)
    {
      if (err.status==401){this.router.navigate(['/login'])}
    }
  })
}

}
