import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { Gif } from '../interfaces/gifs.interface';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styles: [],
})
export class ResultsComponent {
  get results(): Gif[] {
    return this.gifsService.results;
  }

  constructor(private gifsService: GifsService) {}
}
