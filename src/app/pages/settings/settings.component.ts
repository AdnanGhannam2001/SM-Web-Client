import { Component } from '@angular/core';

@Component({
  selector: 'social-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  items = [
    {
      label: "Personal Information",
      icon: "pi pi-id-card",
      url: "/settings"
    },
    {
      label: "Privacy",
      icon: "pi pi-key",
      url: "/settings/privacy"
    },
    {
      label: "Profile Image",
      icon: "pi pi-key",
      url: "/settings/image"
    },
    {
      label: "Cover Image",
      icon: "pi pi-key",
      url: "/settings/cover-image"
    },
    {
      label: "Sent Friendship Requests",
      icon: "pi pi-user",
      url: "/settings/sent-friendship-requests"
    },
    {
      label: "Recevied Friendship Requests",
      icon: "pi pi-user",
      url: "/settings/recevied-friendship-requests"
    },
    {
      label: "Blocked List",
      icon: "pi pi-ban",
      url: "/settings/blocked"
    }
  ];
}
