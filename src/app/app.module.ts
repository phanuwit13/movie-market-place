import { HttpClientModule } from '@angular/common/http'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MenuComponent } from '@components/menu/menu.component'
import { MovieSlideComponent } from '@components/movie-slide/movie-slide.component'
import { TrendingSlideComponent } from '@components/trending-slide/trending-slide.component'
import { TvSeriesSlideComponent } from '@components/tv-series-slide/tv-series-slide.component'
import {
  NgbAlertModule,
  NgbModule,
  NgbPaginationModule,
  NgbRatingModule
} from '@ng-bootstrap/ng-bootstrap'

import { NgIconsModule } from '@ng-icons/core'
import {
  heroChevronLeftMini,
  heroChevronRightMini,
  heroFireMini,
  heroPlayMini,
} from '@ng-icons/heroicons/mini'
import { HomePage } from '@pages/home/home.component'
import { MoviePage } from '@pages/movie/movie.component'
import { TrendingPage } from '@pages/trending/trending.component'
import { TvPage } from '@pages/tv/tv.component'
import { SlickCarouselModule } from 'ngx-slick-carousel'
import { NgxSpinnerModule } from 'ngx-spinner'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TrendingPage,
    TvPage,
    MoviePage,
    HomePage,
    TrendingSlideComponent,
    MovieSlideComponent,
    TvSeriesSlideComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      heroFireMini,
      heroPlayMini,
      heroChevronLeftMini,
      heroChevronRightMini,
    }),
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    SlickCarouselModule,
    NgbRatingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
