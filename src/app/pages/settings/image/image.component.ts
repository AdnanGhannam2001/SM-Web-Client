import { Component } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'social-image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {
  constructor(private readonly config: PrimeNGConfig,
              private readonly profileService: ProfileService,
              private readonly messageService: MessageService
  ) { }

  choose(event: MouseEvent, callback: any) {
    callback();
  }

  upload(callback: any) {
    callback();
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Image Updated',
    });
  }

  remove() {
    this.profileService.removeImage();
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Image Deleted',
    });
    localStorage.setItem('image', 'false');
  }

  formatSize(bytes: any) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes;
    if (bytes === 0) {
      return `0 ${sizes?.[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes?.[i]}`;
  }
}
