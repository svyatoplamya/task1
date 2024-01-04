import { Component, inject, OnInit } from '@angular/core';
import { UsersApiService } from '../../services/users-api.service';
import {CommonModule} from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';
import { RouterLink } from '@angular/router';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {UsersService} from "../../services/users.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {UserActionsComponent} from "../user-actions/user-actions.component";
import {IUser} from "../../IUser.interface";
import {UsersFormService} from "../../services/users-form.service";


@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
  imports: [CommonModule, UserCardComponent, RouterLink, MatDialogModule, MatButtonModule],
})
export class UsersListComponent implements OnInit {
  public usersApiService = inject(UsersApiService);
  public usersService: UsersService = inject(UsersService)
  private localStorageService: LocalStorageService = inject(LocalStorageService)
  private dialogService = inject(MatDialog)

  ngOnInit() {
    const loadedUsers: IUser[] = this.localStorageService.loadDataFromLocalStorage()
    if (loadedUsers) {
      this.usersService.users = loadedUsers;
    }
    if(this.usersService.users.length === 0) {
      this.usersApiService.getUsers().subscribe((value) => {
        this.usersService.users = value;
      });
    }
    this.localStorageService.saveDataToLocalStorage(this.usersService.users);
  }

  public openAddDialog(isEdit: boolean) {
    const dialogRef = this.dialogService.open(UserActionsComponent);
    dialogRef.componentInstance.isEdit = isEdit;
  }
}
