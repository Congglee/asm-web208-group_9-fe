import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update-user-info-form',
  templateUrl: './update-user-info-form.component.html',
  styleUrls: ['./update-user-info-form.component.scss'],
})
export class UpdateUserInfoFormComponent {
  user!: IUser;
  users: IUser[] = [];
  userForm!: FormGroup;

  showSuccessMsg: boolean = false;

  selectedAvatarFile: File | null = null;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data.users;
    });

    this.userForm = this.formBuilder.group({
      name: [''],
      email: ['', [Validators.required, this.validateUserEmail.bind(this)]],
      avatar: [''],
    });

    this.route.paramMap.subscribe((param) => {
      const userId = param.get('id') || '';

      this.userService.getUserByClient(userId).subscribe((user) => {
        this.user = user.userData;
        console.log(
          'adassad: ' + user.userData.name,
          user.userData.email,
          user.userData.avatar
        );
        this.userForm.patchValue({
          name: user.userData.name,
          email: user.userData.email,
          avatar: '',
        });
      });
    });
  }

  onSelectAvatar(event: any) {
    const file = event.target.files[0];
    this.selectedAvatarFile = file;
  }

  validateUserEmail(control: AbstractControl): ValidationErrors | null {
    const userEmail = control.value.trim();
    if (userEmail === '') {
      return { required: true };
    }

    const duplicateUserEmail = this.users.find(
      (user) => user._id !== this.user._id && user.email.trim() === userEmail
    );

    if (duplicateUserEmail) {
      return { duplicate: true };
    }

    return null;
  }

  onHandleUpdateUser() {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      const formData = new FormData();

      formData.append('name', this.userForm.value.name);
      formData.append('email', this.userForm.value.email);

      if (this.selectedAvatarFile) {
        formData.append('avatar', this.selectedAvatarFile);
      }

      this.userService.updateUserInfo(this.user._id, formData).subscribe(
        (data) => {
          this.showSuccessMsg = true;
          // window.location.reload();
        },
        (error) => {
          console.log(error.message);
          this.showSuccessMsg = false;
        }
      );
    } else {
      this.showSuccessMsg = false;
    }
  }
}
