import { Component } from '@angular/core';
import { GroupService } from '../../../services/group.service';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../../../interfaces/post.interface';
import { Pagination } from '../../../helpers/pagination';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'social-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent extends Pagination<IPost> {
  loading = true;
  end     = false;
  id : string | null = null;
  error?: string = undefined;

  constructor(
    private readonly groupService: GroupService,
    private readonly activatedRoute: ActivatedRoute)
  {
    super();
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async (param) => {
      const id = param.get('id');

      if (id != this.id) this.page.items = [];

      this.id = id;

      await this.requestPage();
    });
  }

  override async requestPage() {
    try {
      const postsPage = await this.groupService.getGroupPosts(this.id!, this.pageRequest);

      if (postsPage.items.length == 0) {
        this.end = true;
        return;
      }

      this.page.items.push(...postsPage.items);
      this.loading = false;
      (this.pageRequest.pageNumber!)++;
    } catch(error: any) {
      this.error = error.error.Message;
    }
  }
}
