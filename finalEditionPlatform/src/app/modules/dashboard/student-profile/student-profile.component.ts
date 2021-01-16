import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginService } from 'src/app/services/login_service/login.service';
import { PushStudentToService } from 'src/app/services/push-student-to.service';
import { Subscription } from 'rxjs';
import { Student } from '../../student';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
})
export class StudentProfileComponent implements OnInit{
  statusoptions=["waitting","valid","not valid"]
student={}
studentstatus=""
agentslist=[]
agentname=""
agentid=""
input={state:true,action:"Enable Form"};

  constructor(private loginservice:LoginService,private route:ActivatedRoute,private PSTSP:PushStudentToService) {
    PSTSP.pushStudent$
    .subscribe(studentid=>{
      this.loginservice.getStudentInfo(studentid)
      .subscribe(res=>{
      this.student=res["document"];
      this.agentslist=res["agents"];
      this.agentname=this.student["agentname"]
      this.agentid=this.student["agentid"]
      this.studentstatus=this.student["status"]
      this.input={state:true,action:"Enable Form"}
    })
   })
  }
  
  ngOnInit() {
   const studentid=this.route.snapshot.paramMap.get('id')
    this.loginservice.getStudentInfo(studentid)
    .subscribe(res=>{
    this.student=res["document"]
    this.agentslist=res["agents"];
    this.agentname=this.student["agentname"]
    this.agentid=this.student["agentid"]
    this.studentstatus=this.student["status"]
  })
  }
  form_state(){
    this.input.state=!this.input.state;
    if(this.input.state==true){this.input.action="Enable Form"}
    else{this.input.action="Disable Form"}
  }
  updatestudent(){
    let array=this.agentslist;
    let id=this.agentid;
    let result=array.filter(agent=>agent.agentid==id)
    console.log(result)
      if (result.length>0){
        this.student["agentname"]=result[0].name
        this.student["agentid"]=result[0].agentid
      }
      console.log(this.student)
        
   this.loginservice.updatestudent(this.student)
    .subscribe(res=>{
      console.log(res)
      
    })

  }



}
