import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { AppConfigService, Config } from "../shared/app-config.service";
import { LoggerService } from "../shared/logger.service";
import { AlbumService, Photo } from "./album.service";

describe("AlbumService", () => {
  let service: AlbumService;
  let httpTestingController: HttpTestingController;
  let loggerMock: LoggerService;
  let appConfigMock: jasmine.SpyObj<AppConfigService>;

  const appConfig: Config = {
    albumUrl: "someUrl",
  };

  beforeEach(() => {
    loggerMock = jasmine.createSpyObj("LoggerService", ["log"]);
    appConfigMock = jasmine.createSpyObj("AppConfigService", ["getConfig"]);
    appConfigMock.getConfig.and.returnValue(appConfig);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AlbumService,
        {
          provide: AppConfigService,
          useValue: appConfigMock,
        },
        { provide: LoggerService, useValue: loggerMock },
      ],
    });
    service = TestBed.inject(AlbumService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("When retrieving all photos", () => {
    it("and the request fails, then a message is logged", async () => {
      service.getAllPhotos().subscribe((p) => {
        expect(p.length).toEqual(0);
        expect(loggerMock.log).toHaveBeenCalledWith(
          "Failed to get photos: Http failure response for someUrl: 500 Internal Server Error"
        );
      });

      const err = new ProgressEvent("Failed to get photos");
      httpTestingController
        .expectOne(appConfig.albumUrl)
        .error(err, { status: 500, statusText: "Internal Server Error" });
    });

    it("and the request succeeds, then photos are returned", async () => {
      service.getAllPhotos().subscribe((p) => {
        expect(p.length).toEqual(1);
        expect(p[0]).toBeTruthy();
      });

      httpTestingController.expectOne(appConfig.albumUrl).flush([
        {
          albumId: 1,
          id: 1,
          title: "someTitle",
          url: "someUrl",
          thumbnailUrl: "someThumbnailUrl",
        },
      ]);
    });
  });

  describe("When retrieving all albums", () => {
    it("and the request fails, then a message is logged", async () => {
      service.getAllAlbums().subscribe((a) => {
        expect(a.length).toEqual(0);
        expect(loggerMock.log).toHaveBeenCalledWith(
          "Failed to get albums: Http failure response for someUrl: 500 Internal Server Error"
        );
      });

      const err = new ProgressEvent("Failed to get albums");
      httpTestingController
        .expectOne(appConfig.albumUrl)
        .error(err, { status: 500, statusText: "Internal Server Error" });
    });

    it("and the request succeeds, then albums are returned", async () => {
      service.getAllAlbums().subscribe((a) => {
        expect(a.length).toEqual(2);
        expect(a[0].photos.length).toEqual(2);
        expect(a[1].photos.length).toEqual(3);
      });

      const response: Photo[] = [
        createPhoto(1, 1),
        createPhoto(1, 2),
        createPhoto(2, 1),
        createPhoto(2, 2),
        createPhoto(2, 3),
      ];
      httpTestingController.expectOne(appConfig.albumUrl).flush(response);
    });
  });

  function createPhoto(albumId: number, photoId: number): Photo {
    return {
      albumId: albumId,
      id: photoId,
      title: "someTitle",
      url: "someUrl",
      thumbnailUrl: "someThumbnailUrl",
    };
  }
});
