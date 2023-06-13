import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ISignup } from 'src/app/models/user';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  formSignup = this.formBuilder.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.checkPassword }
  );

  checkPassword(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password === confirmPassword) return null;
    return { notMatch: true };
  }
  onHandleSubmit() {
    if (this.formSignup.invalid) return;
    const user: ISignup = {
      name: this.formSignup.value.name || '',
      email: this.formSignup.value.email || '',
      password: this.formSignup.value.password || '',
      confirmPassword: this.formSignup.value.confirmPassword || '',
    };
    console.log(user);
    console.log(this.formSignup);
    if (this.formSignup.valid) {
      this.userService.signup(user).subscribe(
        (data) => {
          if (data.success) {
            console.log('data', data);
            this.toastr.success(data.message);
            this.router.navigateByUrl('/sign-in');
          }
        },
        (error) => {
          if (error) {
            this.toastr.error(error.error.message);
          }
          console.log(error);
        }
      );
    }
  }
}
