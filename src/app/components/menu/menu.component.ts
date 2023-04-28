import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { HttpService } from 'src/services/http.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public isOpenNav = false
  constructor(
    public router: Router,
    public http: HttpService,
    public location: Location
  ) {}

  ngOnInit(): void {
    console.log('router', this.router.url)
  }

  menuList = [
    {
      name: 'Home',
      path: '/',
      icon: 'heroFireMini',
    },
    {
      name: 'Trending',
      path: '/trend',
      icon: 'heroFireMini',
    },
    {
      name: 'Movie',
      path: '/movie',
      icon: 'heroFireMini',
    },
    {
      name: 'TV',
      path: '/tv',
      icon: 'heroPlayMini',
    },
  ]

  // currentMenu = this.menuList.find(
  //   (item) => item.path === this.router.url.split('?')[0]
  // )

  getCurrentMenu() {
    return this.menuList.find(
      (item) => item.path === this.router.url.split('?')[0]
    )
  }

  setOpenNav(value: boolean) {
    this.isOpenNav = value
  }
}
