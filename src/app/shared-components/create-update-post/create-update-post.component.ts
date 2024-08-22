import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostService } from '../../services/post.service';
import {
  IPost,
  IPostRequest,
  PostVisibilities,
} from '../../interfaces/post.interface';
import { FileSelectEvent } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'social-create-update-post',
  templateUrl: './create-update-post.component.html',
  styleUrl: './create-update-post.component.scss',
})
export class CreateUpdatePostComponent {
  @Input() post?: IPost;
  private _visible = false;
  get visible() { return this._visible; }
  @Input() set visible(val: boolean) { this._visible = val; this.visibleChange.emit(val); }
  @Output() visibleChange = new EventEmitter<boolean>();

  postRequest: IPostRequest;
  mediaType: string = '';
  sending = false;
  visibilities;
  selected;
  file?: File;

  mediaOptions: any[] = [
    { icon: 'pi pi-camera', tooltip: 'Attach photo', value: 'img' },
    { icon: 'pi pi-file', tooltip: 'Attach file', value: 'file' },
  ];

  constructor(private readonly postService: PostService,
              private readonly messageService: MessageService)
  {
    this.visibilities = postService
      .getVisibilities()
      .map(([key, value]) => ({ name: value, code: Number(key) }));
    this.selected = this.visibilities[0];
    this.postRequest = { content: '', visibility: PostVisibilities.Public };
  }

  ngOnInit() {
    if (this.post) {
      this.postRequest = this.post;
    }
  }

  onSelect(event: FileSelectEvent) {
    this.file = event.files[0];
  }

  async sendPost() {
    this.sending = true;

    try {
      this.postRequest.visibility = this.selected.code;

      if (this.post) {
        this.post.content = this.postRequest.content;
        this.post.visibility = this.postRequest.visibility;
        this.post = await this.postService.updatePost(
          this.post.id,
          this.postRequest,
          this.file
        );
      } else {
        this.post = await this.postService.createPost(this.postRequest, this.file);
      }

    } catch ({ error }: any) {
      this.messageService.add({
        severity: 'danger',
        summary: 'Failed',
        detail: error?.errors?.Content[0],
      });
    }

    this.sending = false;
    this.visible = false;
  }
}
