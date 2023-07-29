import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { AppConfigService } from "../shared/appConfig.service";
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

  getAllPhotos(): Observable<Album[]> {
    return this.http.get<Album[]>(this.config.config.albumUrl).pipe(
      catchError((err: any) => {
        console.error(err);
        this.logger.log(`Failed to get albums: ${err.message}`);
        return of([]);
      })
    );
  }
}

export type Album = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};
