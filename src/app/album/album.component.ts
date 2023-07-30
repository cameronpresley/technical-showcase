import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Album, AlbumService, Photo } from "../services/album.service";

@Component({
  selector: "app-album",
  templateUrl: "./album.component.html",
  styleUrls: ["./album.component.scss"],
})
export class AlbumComponent implements OnInit, OnDestroy {
  public photos: Photo[] = [];
  public albums: Album[] = [];

  private subscriptions: Subscription[] = [];
  constructor(private service: AlbumService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.service.getAllPhotos().subscribe((photos) => (this.photos = photos)),
      this.service.getAllAlbums().subscribe((albums) => (this.albums = albums))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
    console.log("destroyed!");
  }
}
