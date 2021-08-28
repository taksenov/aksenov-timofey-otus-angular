import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, retry, switchMap } from 'rxjs/operators';
import { get } from 'lodash';

import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) {}

  getDictItem(word: string): Observable<{ word: string; translate: string }> {
    const lang = this.storageService.getLang().value;
    return of(word).pipe(
      switchMap((item) => this.http.get(
          `https://api.mymemory.translated.net/get?q=${item}&langpair=${lang}`,
        ),
      ),
      retry(3),
      map((item) => {
        const text = get(item, 'responseData.translatedText', word) ?? word;
        return {
          word: word.toLowerCase(),
          translate: text.toLowerCase(),
        };
      }),
    );
  }
}
