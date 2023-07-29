import { Component } from '@angular/core';
import { Album, AlbumService } from '../services/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent {
  public thing: string;
  public albums: Album[] = [];
  constructor(private service: AlbumService) {
    this.thing = service.something;
  }

  ngOnInit(): void {
    this.service.getAllPhotos().subscribe((albums) => (this.albums = albums));
  }
}
