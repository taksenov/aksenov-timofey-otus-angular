import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, retry, switchMap } from 'rxjs/operators';
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
      switchMap((item) =>
        this.http.get(
          // FIXME: Доработать ручку АПИ см. https://mymemory.translated.net/doc/spec.php
          `https://api.mymemory.translated.net/get?q=Hello World!&langpair=en|ru`,
        ),
      ),
      retry(3),
      map((item) => {
        const { text }: any = item;
        return {
          word,
          translate: text[0],
        };
      }),
    );
  }
}
