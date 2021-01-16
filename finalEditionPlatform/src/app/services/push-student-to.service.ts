import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PushStudentToService {
private pushStudentSource=new Subject<any>()
private pushAgentsStource=new Subject<any>()

pushStudent$=this.pushStudentSource.asObservable();
pushAgents$=this.pushAgentsStource.asObservable();

pushstudentto(studentId){
  this.pushStudentSource.next(studentId);
}

pushagentto(agentslist){
  this.pushAgentsStource.next(agentslist)
}


}
