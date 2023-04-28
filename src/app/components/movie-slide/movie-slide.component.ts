import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { IMAGE_BASE_PATH } from '@configs/constants'
import { IHttpResponse } from '@interfaces/response'
import { ITrendItem } from '@interfaces/trend'
import dayjs from 'dayjs'
import { HttpService } from 'src/services/http.service'

@Component({
  selector: 'movie-slide',
  templateUrl: './movie-slide.component.html',
  styleUrls: ['./movie-slide.component.scss'],
})
export class MovieSlideComponent {
  public movie: ITrendItem[] = []
  public dayjs = dayjs
  public loading: boolean = false
  public totalResults: number = 0
  public  slideConfig = {
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

  constructor(
    private http: HttpService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.fetchMovieNowPlayingData()
  }

  async fetchMovieNowPlayingData() {
    this.loading = true
    let httpResponse: IHttpResponse = await this.http.getMovieNowPlaying(1)
    this.loading = false
    if (httpResponse.response) {
      this.movie = [
        ...httpResponse.response.results?.map((item: ITrendItem) => ({
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
