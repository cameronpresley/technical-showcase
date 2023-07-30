import { Component, Input } from "@angular/core";
import { Photo } from "../services/album.service";

@Component({
  selector: "app-photo",
  templateUrl: "./photo.component.html",
  styleUrls: ["./photo.component.scss"],
})
export class PhotoComponent {
  @Input()
  public photo?: Photo;
}
