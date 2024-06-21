import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Pagination } from '../../../helpers/pagination';
import { IJoinRequest } from '../../../interfaces/group.interface';
import { GroupService } from '../../../services/group.service';

@Component({
  selector: 'app-join-requests',
  templateUrl: './join-requests.component.html',
  styleUrl: './join-requests.component.scss'
})
export class JoinRequestsComponent extends Pagination<IJoinRequest> {
  id?: string;
  layout: 'list' | 'grid' = "list";

  constructor(private groupService: GroupService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { super(); }

  override async requestPage() {
    this.page = await this.groupService.getRequests(this.id!, this.pageRequest);
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

  async respond(id: string, accept: boolean) {
    await this.groupService.respondToRequest(this.id!, id, accept);
    this.page.items = this.page.items.filter(item => item.profileId != id);
  }
}

