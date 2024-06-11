import { Component } from '@angular/core';
import { IPage } from '../../../interfaces/page.interface';
import { IMember } from '../../../interfaces/group.interface';
import { GroupService } from '../../../services/group.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'social-members',
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent {
  members: IPage<IMember> = { items: [], total: 0 }
  layout: 'list' | 'grid' = "list";

  constructor(private groupService: GroupService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.parent?.paramMap.subscribe(async param => {
      const id = param.get("id");

      if (!id) {
        this.router.navigate(['/not-found']);
        return;
      }

      try {
        // TODO: add page request
        this.members = await this.groupService.getMembers(id, {});
      } catch (error) {
        this.router.navigate(['/not-found']);
      }
    });
  }
}
