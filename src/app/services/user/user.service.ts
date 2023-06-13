import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ISignin,
  ISignup,
  IUser,
  IUserResponse,
  IUsersResponse,
} from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  Api = 'http://localhost:8080/api/users';
  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('accessToken');
    return new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
  }

  signup(user: ISignup): Observable<any> {
    return this.http.post(this.Api + '/register/', user);
  }

  signin(user: ISignin): Observable<any> {
    return this.http.post(this.Api + '/login/', user);
  }

  logOut() {
    localStorage.clear();
  }
  getUsers(): Observable<IUsersResponse> {
    const headers = this.getHeaders();
    return this.http.get<IUsersResponse>(`http://localhost:8080/api/users`, {
      headers,
    });
  }

  getUserByClient(_id?: string | number): Observable<IUserResponse> {
    const headers = this.getHeaders();
    return this.http.get<IUserResponse>(
      `http://localhost:8080/api/users/${_id}`,
      {
        headers,
      }
    );
  }

  updateUserInfo(
    userId?: string | number,
    userInfo?: FormData
  ): Observable<IUser> {
    const headers = this.getHeaders();
    return this.http.put<IUser>(
      `http://localhost:8080/api/users/${userId}`,
      userInfo,
      { headers }
    );
  }
}
