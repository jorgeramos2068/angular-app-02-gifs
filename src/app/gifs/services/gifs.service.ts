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

  constructor(private http: HttpClient) {}

  get historicalList(): string[] {
    return [...this._historicalList];
  }

  searchGifs(query: string = '') {
    query = query.trim().toLowerCase();
    if (!this._historicalList.includes(query)) {
      this._historicalList.unshift(query);
      this._historicalList = this._historicalList.splice(0, 10);
    }
    this.http
      .get<SearchGifsResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`
      )
      .subscribe((resp) => {
        this.results = resp.data;
      });
  }
}
