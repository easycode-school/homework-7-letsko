import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
  providers: [AuthService]
})
export class NavbarComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {}

  /**
   * Очищает localstorage, редиректит пользователя на страницу 'login'.
   */
  onLogout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
