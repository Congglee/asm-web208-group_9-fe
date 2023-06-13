import { Component } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userData: any;
  role: any;

  constructor(
    private router: Router,
    private authService: UserService,
    private toastr: ToastrService
  ) {
    this.userData = JSON.parse(localStorage.getItem('userData')!);
    // console.log(userData);

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken: any = jwt_decode(accessToken);
      this.role = decodedToken.role;
    }
  }

  onHandleLogOut() {
    this.authService.logOut();
    this.toastr.success('Đăng xuất thành công!');
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}

// onHandleLogOut(){}
