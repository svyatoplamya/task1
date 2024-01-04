import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorageKey: string = 'users'

  public saveDataToLocalStorage(users: Object) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }

  public loadDataFromLocalStorage() {
    const savedUsers = localStorage.getItem(this.localStorageKey);
    return savedUsers ? JSON.parse(savedUsers) : null;
  }
}
