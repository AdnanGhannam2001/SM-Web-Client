import { Component, Inject } from '@angular/core';
import { IMember } from '../../../interfaces/group.interface';
import { GroupService } from '../../../services/group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupComponent } from '../group.component';
import { Pagination } from '../../../helpers/pagination';

@Component({
  selector: 'social-members',
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent extends Pagination<IMember> {
  id?: string;
  layout: 'list' | 'grid' = "list";

  membership?: IMember;

  constructor(private groupService: GroupService,
              private router: Router,
              @Inject(GroupComponent) private readonly parent: GroupComponent,
              private activatedRoute: ActivatedRoute) { super(); }

  override async requestPage() {
    this.page = await this.groupService.getMembers(this.id!, this.pageRequest);
  }

  ngOnInit() {
    this.activatedRoute.parent?.paramMap.subscribe(async param => {
      this.id = param.get("id") ?? undefined;

      if (!this.id) {
        this.router.navigate(['/not-found']);
        return;
      }

      try {
        await this.requestPage();
      } catch (error) {
        this.router.navigate(['/not-found']);
      }
    });
  }

  ngAfterViewChecked() {
    this.membership = this.parent.membership;
  }
}
