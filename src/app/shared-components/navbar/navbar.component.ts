import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SidebarService } from '../../services/sidebar.service';
import { getProfileImage } from '../../helpers/file-helper';

@Component({
  selector: 'social-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  search = "";
  searching = false;
  loading = true;

  loggedIn = false;
  firstname;
  image?: string;

  userMenuItems: MenuItem[] = [
    {
      label: "Profile",
      icon: "pi pi-user",
      url: "/profiles/profile"
    },
    {
      label: "Account",
      icon: "pi pi-id-card",
      url: "#"
    },
    {
      label: "Posts",
      icon: "pi pi-home",
      url: "/"
    },
    {
      label: "Notifications",
      icon: "pi pi-bell",
      url: "/notifications"
    },
    {
      label: "Friends",
      icon: "pi pi-users",
      url: "/profiles/profile/friends"
    },
    {
      label: "Settings",
      icon: "pi pi-cog",
      url: "/settings"
    },
    {
      separator: true
    },
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => { }
    }
  ];

  constructor (private readonly sidebarService: SidebarService) {
    this.loggedIn = localStorage.getItem("id") != undefined;
    this.firstname = localStorage.getItem("firstName") ?? "";
    const id = localStorage.getItem('id');
    const image = localStorage.getItem('image');
    if (id && image === 'true') {
      this.image = getProfileImage(id);
    }
  }

  openSidebar() { this.sidebarService.toggle(); }

  // TODO
  onSubmit() { }
}
