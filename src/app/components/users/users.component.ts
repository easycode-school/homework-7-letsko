import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from './../../interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {
  public users: Array<User> = [];

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  /**
   * Забирает заголовок из data в роутинге и устанавливает его как загаловок страницы.
   * Проверяет, есть ли в localstorage массив пользователей, если есть - забирает его из localstorage,
   * если нет - обращается е методу в сервисе для получения массива от сервера.
   * Присваивает полученный массив в свойство в компоненте.
   */
  ngOnInit() {
    this.route.data.subscribe((item): void => {
      this.title.setTitle(item.title);
    }, (err: Error): void => console.log(err));

    if (localStorage.getItem('users')) {
      this.users = JSON.parse(localStorage.getItem('users'));
    } else {
      this.usersService.getUsers().subscribe((users: Array<User>): void => {
        this.users = users;
        localStorage.setItem('users', JSON.stringify(this.users));
      }, (err: Error): void => console.log(err));
    }
  }

}
