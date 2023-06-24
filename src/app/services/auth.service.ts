import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from './api.endpoints';
import { ROLES } from '../utils/roles';

interface loginData {
  email: string;
  password: string;
}

interface token {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  // loginUser
  public loginUser(loginData: loginData) {
    return this._http.post(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.LOGIN}`,
      loginData
    );
  }

  // set token in local storage
  public setTokenInLocalStorage(token: token) {
    const tokenString = JSON.stringify(token);
    localStorage.setItem('token', tokenString);
  }

  // set user in localstorage
  public setUserInLocalStorage(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // user is logged in or not
  public isLoggedIn() {
    let token = localStorage.getItem('token');
    return token !== null;
  }

  // logout user
  public logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // get token from local storage
  public getTokenFromLocalStorage() {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
      const token = JSON.parse(tokenString);
      return token;
    } else {
      return null;
    }
  }

  // get user from localstorage
  public getUserFromLocalStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      return userData;
    } else {
      return null;
    }
  }

  // get roles from localstorage
  public getRolesFromLocalStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      return userData.roles;
    } else {
      return null;
    }
  }

  // check if user is admin or not
  public isAdminUser() {
    const user = localStorage.getItem('user');
    if (user) {
      const roles = JSON.parse(user)?.roles;
      if (roles.find((role: any) => role.roleName === ROLES.ADMIN)) {
        return true;
      } else {
        return false;
      }
    } else {
      return null;
    }
  }

  // check if user is admin or not
  public isNormalUser() {
    const user = localStorage.getItem('user');
    if (user) {
      const roles = JSON.parse(user)?.roles;
      if (roles.find((role: any) => role.roleName === ROLES.NORMAL)) {
        return true;
      } else {
        return false;
      }
    } else {
      return null;
    }
  }
}
