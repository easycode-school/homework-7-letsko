import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
  providers: [ AuthService, MessageService ]
})
export class LoginComponent implements OnInit {
  public login: FormGroup = this.formBuilder.group({
    password: ['', [
      Validators.required
      ]
    ],
    email: ['', [
      Validators.required,
      Validators.email
      ]
    ]
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  /**
   * Проводит аутентификацию пользователя, если пользователь уже вошел - редиректит его на страницу 'users'.
   * Забирает заголовок из data в роутинге и устанавливает его как загаловок страницы.
   */
  ngOnInit() {
    if (this.auth.isAuth()) {
      this.router.navigate(['/users']);
    }
    this.route.data.subscribe((item) => {
      this.title.setTitle(item.title);
    });
  }

  /**
   * Проверият, заполненыли поля формы, если не заполнены - воводит сообщение о ошибке.
   * Сохраняет в localstorage значения email и password, редиректит пользователя на страницу 'users'.
   * @param form - форма
   */
  onSubmit(form: FormGroup): void {
    if (form.controls.email.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Check e-mail!',
        life: 3000
      });
    }

    if (form.controls.password.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Check password!',
        life: 3000
      });
    }

    if (form.controls.email.valid && form.controls.password.valid) {
      localStorage.setItem('email', form.value.email);
      localStorage.setItem('password', form.value.password);
      this.router.navigate(['/users']);
    }
  }

}
