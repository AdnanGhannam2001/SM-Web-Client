import { Component } from '@angular/core';
import { UploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'social-image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {
  uploadedImage: any;

  onUpload(event: UploadEvent) { }
}
