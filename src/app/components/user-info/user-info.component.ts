import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../../interfaces/user';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styles: [],
  providers: [UsersService]
})
export class UserInfoComponent implements OnInit {
  public user: User;
  public users: Array<User>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private title: Title
  ) { }

  /**
   * Получает id пользователя из параметров роута;
   * Забирает заголовок из data в роутинге и устанавливает его как загаловок страницы;
   * Получает массив пользователей из localstorage;
   * Если массив существует - находит в нем нужного пользователя по id, присваивает в компоненту объект пользователя;
   * Если пользователя нет - получает его от сервера, присваивает в компоненту объект пользователя.
   */
  ngOnInit() {
    const id = this.route.snapshot.params.id;

    this.route.data.subscribe((item) => {
      this.title.setTitle(item.title);
    });

    const users: string = localStorage.getItem('users');
    if (users) {
      this.users = JSON.parse(users);
      this.users.forEach((user: User): void => {
        if (user.id === Number(id)) {
          this.user = user;
        }
      });
    } else {
      this.usersService.getUser(id).subscribe((user: User): void => {
        this.user = user;
      }, (err: Error): void => { console.log(err); });
    }
  }

  /**
   * Направляет клиента на страницу 'users'
   */
  goBack(): void {
    this.router.navigate(['/users']);
  }
}
