import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'social-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  search = "";
  searching = false;
  loading = true;

  userMenuItems: MenuItem[] = [
    {
      label: "Profile",
      icon: "pi pi-user",
      url: "/profile"
    },
    {
      label: "Account",
      icon: "pi pi-id-card",
      url: "/account"
    },
    {
      label: "Timeline",
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
      url: "/friends"
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

  constructor (private readonly sidebarService: SidebarService) { }

  openSidebar() { this.sidebarService.toggle(); }

  // TODO
  loadNotifications() { }

  onSubmit() { }
}
