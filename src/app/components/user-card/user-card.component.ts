import {Component, inject, Input} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {UsersService} from "../../services/users.service";
import {ReactiveFormsModule} from "@angular/forms";
import {UserActionsComponent} from "../user-actions/user-actions.component";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, UserActionsComponent],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  private dialogService: MatDialog = inject(MatDialog)
  public usersService: UsersService = inject(UsersService)
  @Input() id!: number;
  @Input() name!: string;
  @Input() email!: string;
  @Input() phone!: string;
  @Input() website!: string;


  public deleteButton() {
    this.usersService.deleteUser(this.id)
  }

  public openEditUserDialog(isEdit: boolean) {
    const dialogRef = this.dialogService.open(UserActionsComponent, {
      data: {
        id: this.id,
        name: this.name,
        email: this.email,
        phone: this.phone,
        website: this.website,
      },
    });
    dialogRef.componentInstance.isEdit = isEdit;
  }
}
