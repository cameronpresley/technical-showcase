import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";
import { Album, AlbumService, Photo } from "../services/album.service";
import { AlbumComponent } from "./album.component";
describe("AlbumComponent", () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;
  let mockAlbumService: jasmine.SpyObj<AlbumService>;

  beforeEach(() => {
    mockAlbumService = jasmine.createSpyObj("AlbumService", [
      "getAllPhotos",
      "getAllAlbums",
    ]);
    mockAlbumService.getAllPhotos.and.returnValue(of([]));
    mockAlbumService.getAllAlbums.and.returnValue(of([]));
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AlbumService,
        { provide: AlbumService, useValue: mockAlbumService },
      ],
      declarations: [AlbumComponent],
    });
    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set photos", () => {
    mockAlbumService.getAllPhotos.and.returnValue(
      of([1, 2, 3, 4, 5].map((_) => createPhoto()))
    );
    component.ngOnInit();
    expect(component.photos.length).toEqual(5);
  });

  it("should set albums", () => {
    mockAlbumService.getAllAlbums.and.returnValue(
      of([1, 2].map((_) => createAlbum()))
    );
    component.ngOnInit();
    expect(component.albums.length).toEqual(2);
  });

  function createAlbum(): Album {
    return {
      albumId: 1,
      photos: [],
    };
  }
  function createPhoto(): Photo {
    return {
      albumId: 1,
      id: 1,
      url: "someUrl",
      thumbnailUrl: "someThumbnailUrl",
      title: "someTitle",
    };
  }
});
