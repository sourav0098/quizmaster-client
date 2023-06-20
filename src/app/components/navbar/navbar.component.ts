import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public _authService: AuthService, private _router: Router) {}

  public logout() {
    this._authService.logoutUser();
    this._router.navigate(['/login']);
  }
}
