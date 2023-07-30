import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, reduce } from "rxjs";
import { AppConfigService } from "../shared/app-config.service";
import { LoggerService } from "../shared/logger.service";

@Injectable({
  providedIn: "root",
})
export class AlbumService {
  constructor(
    private http: HttpClient,
    private logger: LoggerService,
    private appConfigService: AppConfigService
  ) {}

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
    return this.http
      .get<Photo[]>(this.appConfigService.getConfig().albumUrl)
      .pipe(
        reduce((_: Album[], photos: Photo[]) => {
          return photos.reduce(reducer, []);
        }, []),
        catchError((err: any) => {
          this.logger.log(`Failed to get albums: ${err.message}`);
          return of([]);
        })
      );
  }

  getSpecificAlbum(albumId: number): Observable<Album | null> {
    return this.http
      .get<Photo[]>(
        `${this.appConfigService.getConfig().albumUrl}?albumId=${albumId}`
      )
      .pipe(
        map((photos) => {
          if (!photos || !photos.length) {
            return null;
          } else {
            return {
              albumId: albumId,
              photos: photos,
            };
          }
        }),
        catchError((err: any) => {
          this.logger.log(`Failed to get specific album: ${err.message}`);
          return of(null);
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
