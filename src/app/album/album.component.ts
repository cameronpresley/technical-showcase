import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  Observable,
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from "rxjs";
import { Album, AlbumService, Photo } from "../services/album.service";

@Component({
  selector: "app-album",
  templateUrl: "./album.component.html",
  styleUrls: ["./album.component.scss"],
})
export class AlbumComponent implements OnInit, OnDestroy {
  public photos: Photo[] = [];
  public albums: Album[] = [];
  public specificAlbum$!: Observable<Album | null>;
  public loading = false;
  private searchTerm = new Subject<number>();

  private subscriptions: Subscription[] = [];
  constructor(private service: AlbumService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.service.getAllPhotos().subscribe((photos) => (this.photos = photos)),
      this.service.getAllAlbums().subscribe((albums) => (this.albums = albums))
    );
    this.specificAlbum$ = this.searchTerm.pipe(
      tap(() => {
        this.loading = true;
      }),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: number) => this.service.getSpecificAlbum(term)),
      tap(() => {
        this.loading = false;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  searchForAlbum(id: string): void {
    this.searchTerm.next(+id);
  }
}
