import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISignin, ISignup } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  Api = 'http://localhost:8080/api/users';
  constructor(private http: HttpClient) {}
  signup(user: ISignup): Observable<any> {
    return this.http.post(this.Api + '/register/', user);
  }
  signin(user: ISignin): Observable<any> {
    return this.http.post(this.Api + '/login/', user);
  }
  logOut() {
    localStorage.clear();
  }
}
