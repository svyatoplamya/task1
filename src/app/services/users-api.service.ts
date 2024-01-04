import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IUser} from "../IUser.interface";

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/users'

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl);
  }

}
