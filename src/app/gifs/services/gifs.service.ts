import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'MY_KEY';
  private _historicalList: string[] = [];
  public results: Gif[] = [];

  constructor(private http: HttpClient) {
    const localHistorical: string =
      localStorage.getItem('gifsHistorical') || '';
    if (localHistorical.length) {
      this._historicalList = JSON.parse(localHistorical);
    }
    const localResults: string = localStorage.getItem('gifsResults') || '';
    if (localResults.length) {
      this.results = JSON.parse(localResults);
    }
  }

  get historicalList(): string[] {
    return [...this._historicalList];
  }

  searchGifs(query: string = '') {
    query = query.trim().toLowerCase();
    if (!this._historicalList.includes(query)) {
      this._historicalList.unshift(query);
      this._historicalList = this._historicalList.splice(0, 10);
      localStorage.setItem(
        'gifsHistorical',
        JSON.stringify(this._historicalList)
      );
    }
    this.http
      .get<SearchGifsResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`
      )
      .subscribe((resp) => {
        this.results = resp.data;
        localStorage.setItem('gifsResults', JSON.stringify(this.results));
      });
  }
}
