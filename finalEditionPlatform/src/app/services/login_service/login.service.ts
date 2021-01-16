import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
private loginUrl="http://localhost:3000/api/login/"
private studentmanager="http://localhost:3000/api/studentManager/"
private dashboardurl="http://localhost:3000/api/dashboardAcess/"
private studenturl="http://localhost:3000/api/getstudent/"
private updatestudenturl="http://localhost:3000/api/updatestudent"
private validationspaceurl="http://localhost:3000/api/validationspace"
private getuserurl="http://localhost:3000/api/getusers"
private adduserurl="http://localhost:3000/api/adduser"
  constructor(private http:HttpClient) { }
login(data){
  return this.http.post<any>(this.loginUrl,data)
}

studentManager(filter){
  return this.http.post(this.studentmanager,filter)
}
dashboardAcess(){
return this.http.get(this.dashboardurl)
}
loggedIn(){
  return !!localStorage.getItem('token')
}
gettoken(){
  return localStorage.getItem('token')
}
getStudent(){
return !!localStorage.getItem('student')
}
getStudentInfo(id){
return this.http.get(this.studenturl+id)
}
updatestudent(studentCredentials){
return this.http.post(this.updatestudenturl,studentCredentials)
}
validationspace(filter){
  return this.http.post(this.validationspaceurl,filter)
}
getusers(){
  return this.http.get(this.getuserurl)
}

adduser(agent){
  return this.http.post(this.adduserurl,agent)
}
}