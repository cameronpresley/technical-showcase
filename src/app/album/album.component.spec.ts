import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ReactiveFormsModule } from "@angular/forms";
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
      "getSpecificAlbum",
    ]);
    mockAlbumService.getAllPhotos.and.returnValue(of([]));
    mockAlbumService.getAllAlbums.and.returnValue(of([]));
    mockAlbumService.getSpecificAlbum.and.returnValue(of(null));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        AlbumService,
        { provide: AlbumService, useValue: mockAlbumService },
      ],
      declarations: [AlbumComponent],
    });
    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set albums", () => {
    mockAlbumService.getAllAlbums.and.returnValue(
      of([1, 2].map((_) => createAlbum()))
    );
    component.ngOnInit();
    expect(component.albums.length).toEqual(2);
  });

  describe("When searching for an album", () => {
    it("and there's an album, then album is set", async () => {
      const foundAlbum = createAlbum();
      mockAlbumService.getSpecificAlbum.and.returnValue(of(foundAlbum));
      component.specificAlbum$.subscribe((a) => {
        expect(a).toEqual(createAlbum());
      });

      component.searchForAlbum("20");
    });

    it("and there's not an album, then the album isn't set", async () => {
      mockAlbumService.getSpecificAlbum.and.returnValue(of(null));
      component.specificAlbum$.subscribe((a) => {
        expect(a).toBeNull();
      });

      component.searchForAlbum("20");
    });
  });

  function createAlbum(): Album {
    return {
      albumId: 1,
      photos: [1, 2, 3].map(createPhoto),
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
