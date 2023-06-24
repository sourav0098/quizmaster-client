import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(public _authService: AuthService, private _router: Router) {}

  isAdmin(){
    if(this._authService.isAdminUser()){
      return true
    }else{
      return false
    }
  }

  logout() {
    this._authService.logoutUser();
    this._router.navigate(['/login']);
  }
}
