import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Album, AlbumService } from "../services/album.service";

@Component({
  selector: "app-album",
  templateUrl: "./album.component.html",
  styleUrls: ["./album.component.scss"],
})
export class AlbumComponent implements OnInit, OnDestroy {
  public albums: Album[] = [];
  private albumSubscription!: Subscription;
  constructor(private service: AlbumService) {}

  ngOnInit(): void {
    this.albumSubscription = this.service
      .getAllPhotos()
      .subscribe((albums) => (this.albums = albums));
  }

  ngOnDestroy(): void {
    this.albumSubscription.unsubscribe();
    console.log("destroyed!");
  }
}
