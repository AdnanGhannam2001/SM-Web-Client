import { Component, Input } from '@angular/core';

export type Severity =
  "Success"
  | "Error"
  | "Info"
  | "Warn";

@Component({
  selector: 'social-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() severity: Severity = "Info";
  get icon() {
    if (this.severity == "Success") return "pi pi-check";
    if (this.severity == "Info") return "pi pi-info-circle";
    if (this.severity == "Warn") return "pi pi-exclamation-circle";
    return "pi pi-times";
  }

  get color() {
    if (this.severity == "Success") return "--green-300";
    if (this.severity == "Info") return "--blue-400";
    if (this.severity == "Warn") return "--yellow-400";
    return "--red-300";
  }
}
