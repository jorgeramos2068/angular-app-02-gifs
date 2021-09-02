import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _historicalList: string[] = [];

  get historicalList(): string[] {
    return [...this._historicalList];
  }

  searchGifs(query: string = '') {
    query = query.trim().toLowerCase();
    if (!this._historicalList.includes(query)) {
      this._historicalList.unshift(query);
      this._historicalList = this._historicalList.splice(0, 10);
    }
  }
}
