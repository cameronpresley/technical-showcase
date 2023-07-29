import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AlbumService } from "../services/album.service";
import { AlbumComponent } from "./album.component";

describe("AlbumComponent", () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumService],
      declarations: [AlbumComponent],
    });
    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
