import {inject, Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "./users.service";
import {IUser} from "../IUser.interface";

@Injectable({
  providedIn: 'root'
})
export class UsersFormService {
  private fb: FormBuilder = inject(FormBuilder)
  private usersService = inject(UsersService)



  public getUserMaxId(users?: IUser[]) {
      return users ? (Math.max(...users.map((user) => user.id)) + 1)
        : null;
  }

  public createUserFormGroup(userData?: any): FormGroup {
    // console.log(userData);
      return this.fb.group({
        id: [userData?.id ?? this.getUserMaxId(this.usersService.users)],
        name: [userData?.name ?? '', Validators.required],
        email: [userData?.email ?? '', [Validators.email, Validators.required]],
        phone: [userData?.phone ?? '', Validators.required],
        website: [userData?.website ?? '', Validators.required],
      })
    }
}
