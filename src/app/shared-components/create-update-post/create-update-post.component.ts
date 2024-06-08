import { Component, Input } from '@angular/core';

@Component({
  selector: 'social-create-update-post',
  templateUrl: './create-update-post.component.html',
  styleUrl: './create-update-post.component.scss'
})
export class CreateUpdatePostComponent {
  @Input() image = "";
  @Input() placeholder = "";
  @Input() text?: string;
  visible = false;
  mediaType: string = "";
  sending = false;

  mediaOptions: any[] = [
    { icon: 'pi pi-camera', tooltip: 'Attach photo', value: "img" },
    { icon: 'pi pi-file', tooltip: 'Attach file', value: "file" }
  ];

  // TODO
  onUpload(event: any) { }

  // TODO
  sendPost() {
    this.sending = true;
  }
}
