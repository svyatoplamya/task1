import {Component, inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {UsersService} from "../../services/users.service";
import {UsersFormService} from "../../services/users-form.service";
import {IUser} from "../../IUser.interface";

@Component({
  selector: 'app-user-actions',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './user-actions.component.html',
  styleUrl: './user-actions.component.css'
})
export class UserActionsComponent implements OnInit{
  public data = inject(MAT_DIALOG_DATA)
  private usersService: UsersService = inject(UsersService)
  private usersFormService: UsersFormService = inject(UsersFormService)
  private dialogRef: MatDialogRef<UserActionsComponent> = inject(MatDialogRef)

  @Input() isEdit!: boolean;
  @Input() userData?: IUser;

  public userFormGroup!: FormGroup;

  ngOnInit() {
    if(this.data) {
      this.userFormGroup = this.usersFormService.createUserFormGroup(this.data)
      // console.log(this.data)
    } else {
      this.userFormGroup = this.usersFormService.createUserFormGroup()
    }
    console.log(this.userFormGroup.value)
  }


  onCreateButton() {
    this.usersService.addUser(this.userFormGroup.value);
    this.dialogRef.close('Add User');
  }

  onEditButton() {
    console.log(this.userFormGroup.value)
    this.usersService.editUser(this.userFormGroup.value)
    this.dialogRef.close('Edit User')
  }
}
