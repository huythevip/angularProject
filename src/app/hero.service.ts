import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private heroesUrl = 'http://localhost:3000/heroes';  // URL to web api
  private heroesCreateUrl = 'http://localhost:3000/heroes/create';  // URL to web api


  constructor(private messageService: MessageService,
              private http: HttpClient) { }

  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
     return this.http.get<Hero[]>(this.heroesUrl)
       .pipe(
         tap(heroes => this.log(`fetched heroes`)),
         catchError(this.handleError('getHeroes', []))
       );

  }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    // const url = `${this.heroesUrlById}${id}`;
    // return this.http.get<Hero>(url).pipe(
    //   tap(_ => this.log(`fetched hero id=${id}`)),
    //   catchError(this.handleError<Hero>(`getHero id=${id}`))
    // );
    return this.http.get<Hero>(this.heroesUrl + '/' + id);
    // return this.http.post<Hero>(url, { id }, httpOptions);
  }

  saveHero(newHero: Hero): Observable<any> {
    // console.log('ahihi');
    const id = newHero['id'];
    return this.http.post(this.heroesUrl + '/' + id, newHero);
  }

  createHero(heroData: string): Observable<any> {
    return this.http.post(this.heroesCreateUrl, {heroData});
  }

  deleteHero(hero): Observable<any> {
    const id = hero['id'];
    return this.http.post(this.heroesUrl + '/' + id, hero);
  }

}
