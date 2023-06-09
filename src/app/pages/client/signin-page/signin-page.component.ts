import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { ISignin } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss'],
})
export class SigninPageComponent {
  constructor(
    private authService: UserService,
    private formBuilder: FormBuilder,
    private toasrt: ToastrService,
    private router: Router
  ) {}
  formSignin = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  onHandleSubmit() {
    if (this.formSignin.invalid) return;
    const user: ISignin = {
      email: this.formSignin.value.email || '',
      password: this.formSignin.value.password || '',
    };
    if (this.formSignin.valid)
      this.authService.signin(user).subscribe(
        (data) => {
          if (data.success) {
            const { accessToken, userData } = data;
            console.log(accessToken, userData);
            if (userData || accessToken) {
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('userData', JSON.stringify(userData));
            }
            const decodedToken: any = jwt_decode(accessToken);
            const { role } = decodedToken;
            console.log(role);
            if (role === false) this.router.navigateByUrl('');
            else if (role === true) this.router.navigateByUrl('/admin');
            this.toasrt.success(data.message);
          }
        },
        (error) => {
          if (error) {
            this.toasrt.error(error.error.message);
          }
        }
      );
  }
}
