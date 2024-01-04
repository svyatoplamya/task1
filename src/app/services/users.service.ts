import {inject, Injectable} from '@angular/core';
import {IUser} from "../IUser.interface";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public users: IUser[] = [];
  private localStorageService: LocalStorageService = inject(LocalStorageService)

  public addUser(newUser: IUser) {
        this.users.push(newUser);
        this.localStorageService.saveDataToLocalStorage(this.users)
        console.log(this.users)
    }

  public editUser(editedUser: any) {
    const user = this.users.find((user) => user.id === editedUser.id);
    if (user) {
      Object.assign(user, editedUser);
    }
    this.localStorageService.saveDataToLocalStorage(this.users)
    // console.log(this.users)
  }

  public deleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
    this.localStorageService.saveDataToLocalStorage(this.users)
    console.log(this.users)
  }
}
