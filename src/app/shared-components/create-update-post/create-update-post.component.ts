import { Component, Input } from '@angular/core';
import { PostVisibilities } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'social-create-update-post',
  templateUrl: './create-update-post.component.html',
  styleUrl: './create-update-post.component.scss'
})
export class CreateUpdatePostComponent {
  image;
  @Input() placeholder = "";
  @Input() text?: string;
  visible = false;
  mediaType: string = "";
  sending = false;

  visibilities;
  selected;

  mediaOptions: any[] = [
    { icon: 'pi pi-camera', tooltip: 'Attach photo', value: "img" },
    { icon: 'pi pi-file', tooltip: 'Attach file', value: "file" }
  ];

  constructor(private readonly postService: PostService) {
    this.visibilities = postService.getVisibilities().map(([key, value]) => ({ name: value, code: Number(key) }));
    this.selected = this.visibilities[0];
    this.image = localStorage.getItem("image") ?? "";
  }

  // TODO
  onSelect(event: any) { console.log({ event })}

  // TODO
  async sendPost() {
    this.sending = true;

    try {
      const post = await this.postService.createPost({ content: this.text!, visibility: this.selected.code });
      this.sending = false;
      this.visible = false;
    } catch (error) {
      console.warn({ error });
    }
  }
}
