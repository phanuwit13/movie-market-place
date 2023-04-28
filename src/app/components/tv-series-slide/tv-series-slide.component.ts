import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { IMAGE_BASE_PATH } from '@configs/constants'
import { IHttpResponse } from '@interfaces/response'
import { TVItem } from '@interfaces/tv'
import dayjs from 'dayjs'
import { HttpService } from 'src/services/http.service'

@Component({
  selector: 'tv-series-slide',
  templateUrl: './tv-series-slide.component.html',
  styleUrls: ['./tv-series-slide.component.scss'],
})
export class TvSeriesSlideComponent {
  public movie: TVItem[] = []
  public dayjs = dayjs
  public loading: boolean = false
  public totalResults: number = 0
  public slideConfig = {
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1480,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  constructor(private http: HttpService, public router: Router) {}

  ngOnInit(): void {
    this.fetchMovieNowPlayingData()
  }

  async fetchMovieNowPlayingData() {
    this.loading = true
    let httpResponse: IHttpResponse = await this.http.getTVPopular(1)
    this.loading = false
    if (httpResponse.response) {
      this.movie = [
        ...httpResponse.response.results?.map((item: TVItem) => ({
          ...item,
          poster_path: item.poster_path
            ? `${IMAGE_BASE_PATH}w200/${item.poster_path}`
            : 'assets/image/no-image.jpg',
        })),
      ]
    }
  }

  breakpoint(e: any) {
    console.log('breakpoint', e)
  }
}
