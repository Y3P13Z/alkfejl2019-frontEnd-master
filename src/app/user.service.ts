import { Injectable } from '@angular/core';
import { AuthService, httpOptions } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth : AuthService, private httpClient: HttpClient) { }

  getUsers() : Promise<User[]>{
    return this.httpClient.get<User[]>("http://localhost:8080/user/getAll", httpOptions).toPromise();
  }
}
