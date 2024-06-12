import { Component } from '@angular/core';
import { IGroup } from '../../interfaces/group.interface';
import { TabMenuItem } from '../../ui-components/tab-menu/tab-menu.component';
import { GroupService } from '../../services/group.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'social-group',
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent {
  group?: IGroup;
  tabs: TabMenuItem[] = [];

  constructor(private groupService: GroupService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async param => {
      const id = param.get("id");

      if (!id) {
        this.router.navigate(['/not-found']);
        return;
      }

      try {
        this.group = await this.groupService.getGroup(id);

        const url = `/groups/${id}/`;

        this.tabs = [
          {
            url,
            text: "Posts",
          },
          {
            url: url + "members",
            text: "Members",
          }
        ];
      } catch (error) {
        console.warn({ error });
      }
    });
  }
}
