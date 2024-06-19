import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostService } from '../../services/post.service';
import {
  IPost,
  IPostRequest,
  PostVisibilities,
} from '../../interfaces/post.interface';

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
  image;
  visibilities;
  selected;

  mediaOptions: any[] = [
    { icon: 'pi pi-camera', tooltip: 'Attach photo', value: 'img' },
    { icon: 'pi pi-file', tooltip: 'Attach file', value: 'file' },
  ];

  constructor(private readonly postService: PostService) {
    this.visibilities = postService
      .getVisibilities()
      .map(([key, value]) => ({ name: value, code: Number(key) }));
    this.selected = this.visibilities[0];
    this.postRequest = { content: '', visibility: PostVisibilities.Public };
    this.image = localStorage.getItem('image') ?? '';
  }

  ngOnInit() {
    if (this.post) {
      this.postRequest = this.post;
    }
  }

  // TODO
  onSelect(event: any) {
    console.log({ event });
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
          this.postRequest
        );
      } else {
        this.post = await this.postService.createPost(this.postRequest);
      }

      this.sending = false;
      this.visible = false;
    } catch (error) {
      console.warn({ error });
    }
  }
}
