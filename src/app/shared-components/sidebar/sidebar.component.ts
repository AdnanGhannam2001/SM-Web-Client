import { Component, ElementRef } from '@angular/core';

interface ListGroup {
  name?: string;
  items: {
    icon: string;
    label: string;
    url?: string;
    badge?: string;
  }[];
};

@Component({
  selector: 'social-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  groups: ListGroup[] = [
    {
      name: 'Personal',
      items: [
        {
          icon: 'pi pi-home',
          label: 'Home',
          url: '/',
        },
        {
          icon: 'pi pi-user',
          label: 'My Profile',
          url: '/profile',
        },
      ],
    },
    {
      name: 'Community',
      items: [
        {
          label: 'Users',
          icon: 'pi pi-users',
          url: '/profiles',
        },
        {
          label: 'Groups',
          icon: 'pi pi-users',
          url: '/groups',
        },
        {
          label: 'Chats',
          icon: 'pi pi-comments',
          url: '/chats',
        },
      ],
    },
  ];
}
