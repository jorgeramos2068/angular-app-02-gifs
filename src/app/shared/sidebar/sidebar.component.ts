import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(private gifsService: GifsService) {}

  get historicalList(): string[] {
    return this.gifsService.historicalList;
  }

  search(query: string) {
    if (query.trim().length !== 0) {
      this.gifsService.searchGifs(query);
    }
  }
}
