import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  userData: any;
  role: any;

  constructor(private router: Router, private authService: UserService) {}

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData')!);

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken: any = jwt_decode(accessToken);
      this.role = decodedToken.role;
    }
  }
}
