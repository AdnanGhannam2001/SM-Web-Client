import { Component, ElementRef } from '@angular/core';

// TODO: Fill from api
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
  onToggle() {
    this.collapsed = !this.collapsed;

    setTimeout(() => {
      const newWidth = this.elementRef.nativeElement.offsetWidth + 'px';
      document.documentElement.style.setProperty('--sidebar-width', newWidth);
    }, 0);
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.onToggle();
  }

  collapsed = false;

  groups: ListGroup[] = [
    {
      name: 'Personal',
      items: [
        {
          icon: 'pi pi-user',
          label: 'My Profile',
          url: '/profile',
        },
        {
          icon: 'pi pi-home',
          label: 'My Timeline',
          url: '/',
          badge: '10',
        },
      ],
    },
    {
      name: 'Community',
      items: [
        {
          label: 'My Friends',
          icon: 'pi pi-users',
          url: '/friends',
        },
        {
          label: 'My Groups',
          icon: 'pi pi-users',
          url: '/groups',
        },
      ],
    },
  ];
}
