import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService  {
 
  constructor(private httpService: HttpClient) { }
  users : User[] = []
  getAllUsers(): Observable<any>{
    
   return this.httpService.get<User[]>('https://localhost:7135/api/Users/get_all_users')
   
  };
  addUser(user:User): Observable<any>{
    
    return this.httpService.post<User>('https://localhost:7135/api/Users/add_user',user)
    
   };
   updateUser(user:User): Observable<any>{
    
    return this.httpService.put<User>('https://localhost:7135/api/Users/update_user',user)
    
   };
   deleteUser(userId:any): Observable<any>{
    console.log(userId)
    return this.httpService.delete(`https://localhost:7135/api/Users/delete_user/${userId}`)
    
   };
}
