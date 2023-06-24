import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from './api.endpoints';

interface User {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  // register user
  public registerUser(user: User) {
    return this._http.post(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.USERS}`,
      user
    );
  }

  // update user
  public updateUser(id: string, user: any) {
    return this._http.put(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.USERS}/${id}`,
      user
    );
  }
}
