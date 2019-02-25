import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styles: []
})
export class AboutComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private auth: AuthService
  ) { }

  /**
   * Забирает заголовок из data в роутинге и устанавливает его как загаловок страницы.
   */
  ngOnInit() {
    this.route.data.subscribe((item) => {
      this.title.setTitle(item.title);
    });
  }

}
