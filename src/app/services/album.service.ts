import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of, reduce } from "rxjs";
import { AppConfigService } from "../shared/app-config.service";
import { LoggerService } from "../shared/logger.service";

@Injectable({
  providedIn: "root",
})
export class AlbumService {
  constructor(
    private http: HttpClient,
    private logger: LoggerService,
    private config: AppConfigService
  ) {}

  getAllPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.config.getConfig().albumUrl).pipe(
      catchError((err: any) => {
        this.logger.log(`Failed to get photos: ${err.message}`);
        return of([]);
      })
    );
  }

  getAllAlbums(): Observable<Album[]> {
    const reducer = (acc: Album[], photo: Photo) => {
      let album = acc.find((x) => x.albumId === photo.albumId);
      if (!album) {
        album = { albumId: photo.albumId, photos: [] };
        acc.push(album);
      }
      album.photos.push(photo);
      return acc;
    };
    return this.http.get<Photo[]>(this.config.getConfig().albumUrl).pipe(
      reduce((_: Album[], photos: Photo[]) => {
        return photos.reduce(reducer, []);
      }, []),
      catchError((err: any) => {
        this.logger.log(`Failed to get albums: ${err.message}`);
        return of([]);
      })
    );
  }
}

export type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};
export type Album = {
  albumId: number;
  photos: Photo[];
};
