import { Component } from '@angular/core';
import { UploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'social-cover-image',
  templateUrl: './cover-image.component.html',
  styleUrl: './cover-image.component.scss'
})
export class CoverImageComponent {
  uploadedImage: any;

  onUpload(event: UploadEvent) { }
}
