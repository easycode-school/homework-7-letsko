import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { User } from './../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl: string = environment.apiUrl;
  private users: Array<User> = [];

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Обращается к серверу для получения массива пользователей и возвращает его
   */
  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.apiUrl}/users`);
  }

  /**
   * Обращается к серверу для получения объекта пользователя по его id и возвращает его
   * @param id - id пользователя
   */
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  /**
   * Обращается к серверу для обновления объекта пользователя
   * @param user - объект пользователя
   */
  putUser(user: User): Observable<object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=UTF-8'
      })
    };
    return this.http.put(`${this.apiUrl}/users/${user.id}`, user, httpOptions);
  }

  /**
   * Callback ф-ция для поиска индекса объекта в массиве по его id
   * @param userId - id пользователя
   */
  private getIndex(userId: number) {
    return (someUser: { id: number; }): boolean => someUser.id === userId;
  }

  /**
   * Забирает массив пользователей из localstorage;
   * Находит индекс обновляемого пользователя и по нему заменяет объект имеющегося пользователя на новый объект;
   * Возврашает в localstorage обновленный массив пользователей.
   * @param user - обновленный объект пользователей
   */
  public editUser(user: User): void {
    this.users = JSON.parse(localStorage.getItem('users'));
    const index = this.users.findIndex(this.getIndex(user.id));
    this.users.splice(index, 1, user);
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
