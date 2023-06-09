import { Component } from '@angular/core'
import { HttpService } from '@services/http.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'movie-market-place'
  constructor(public http: HttpService) {}
}
