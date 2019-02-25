import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from './../../interfaces/user';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styles: [`
    p-toast {
      word-wrap: break-word;
    }
  `],
  providers: [ UsersService, MessageService ]
})
export class UserEditComponent implements OnInit {
  public users: Array<User>;
  public user: User;
  public name = '';
  public email = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private usersService: UsersService,
    private messageService: MessageService
  ) { }

  /**
   * Получает id пользователя из параметров роута;
   * Забирает заголовок из data в роутинге и устанавливает его как загаловок страницы;
   * Получает массив пользователей из localstorage;
   * Если массив существует - находит в нем нужного пользователя по id, присваивает в компоненту объект пользователя;
   * Если пользователя нет - получает его от сервера, присваивает в компоненту объект пользователя;
   * Забирает из объекта пользователя значения name и email;
   */
  ngOnInit() {
    const id = this.route.snapshot.params.id;

    this.route.data.subscribe((item): void => {
      this.title.setTitle(item.title + id);
    });

    const users = localStorage.getItem('users');

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

    this.name = this.user.name;
    this.email = this.user.email;
  }

  /**
   * onEdit:
   *    1. Проверяет заполненыли ли поля форму, если нет - выводит сообщение о ошибке;
   *    2. Забирает в объект пользователя значения name и email;
   *    3. Передает в метод для обновления пользователя сервиса новое значение объекта пользователя;
   *    4. Подписывается на ответ серера и передает его в метод сервиса для обновления пользователя в localstorage;
   *    5. Выводит сообщение о удачном изменении;
   *    6. Перенаправляет клиента на страницу 'users';
   *    7. В случае ошибки - выводит о ней сообщение.
   * @param form - объект формы
   */
  public onEdit(): void {
    if (!this.name || !this.email) {
      return console.log('check form fields');
    }
    this.user.name = this.name;
    this.user.email = this.email;
    this.usersService.putUser(this.user).subscribe((updatedUser: User): void => {
      this.usersService.editUser(this.user);
      this.messageService.add({
        severity: 'success',
        summary: 'Successfully edited!',
        life: 2000
      });
      setTimeout((): RouterModule => this.router.navigate(['/users']), 2000);
    }, (error: Error): void => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error! ' + error.message,
        life: 3000
      });
    });
  }

}
