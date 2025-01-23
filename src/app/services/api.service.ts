import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


    getUsers(){
      return this.http.get(`${environment.apiUrl}/users`);
    }

    getTasks(){
      return this.http.get(`${environment.apiUrl}/todos`);
    }

    getUserTasks(userId: any){
      return this.http.get(`${environment.apiUrl}/todos?userId=${userId}`);
    }




}
