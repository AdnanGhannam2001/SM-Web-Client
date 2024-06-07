import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  opened = false;

  constructor() { }

  toggle() {
    this.opened = !this.opened;
  }
}
