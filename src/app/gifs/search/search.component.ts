import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent {
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  search() {
    const localValue = this.txtSearch.nativeElement.value;
    if (localValue.trim().length === 0) {
      return;
    }
    this.gifsService.searchGifs(localValue);
    this.txtSearch.nativeElement.value = '';
  }
}
