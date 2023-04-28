import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { IMAGE_BASE_PATH } from '@configs/constants'
import { IHttpResponse } from '@interfaces/response'
import { ITrendItem } from '@interfaces/trend'
import dayjs from 'dayjs'
import { NgxSpinnerService } from 'ngx-spinner'
import { HttpService } from 'src/services/http.service'

@Component({
  selector: 'trending-slide',
  templateUrl: './trending-slide.component.html',
  styleUrls: ['./trending-slide.component.scss'],
})
export class TrendingSlideComponent {
  public movie: ITrendItem[] = []
  public movieTrendingWeek: ITrendItem[] = []
  public addProduct: any = []
  public price = 0
  public dayjs = dayjs
  public page: number = 1
  public loading: boolean = false
  totalResults: number = 0

  constructor(
    private http: HttpService,
    private spinner: NgxSpinnerService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.page = Number(this.route.snapshot.queryParamMap.get('page')) || 1
    this.fetchData()
    this.fetchMovieTrendingWeekData()
  }

  async fetchData() {
    this.loading = true
    let httpResponse: IHttpResponse = await this.http.getTrendListMovie(
      this.page
    )
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
      this.page = httpResponse.response.page
      this.totalResults = Math.min(httpResponse.response.total_results, 10000)
    }
  }

  async fetchMovieTrendingWeekData() {
    this.spinner.show()
    let httpResponse: IHttpResponse = await this.http.getTrendListMovie(1)
    this.spinner.hide()
    if (httpResponse.response) {
      this.movieTrendingWeek = [
        ...httpResponse.response.results?.map((item: ITrendItem) => ({
          ...item,
          poster_path: item.poster_path
            ? `${IMAGE_BASE_PATH}w200/${item.poster_path}`
            : 'assets/image/no-image.jpg',
        })),
      ]
    }
  }

  async fetchDataChangePage() {
    const queryParams = {
      page: this.page,
    }
    this.router.navigate([''], { queryParams: queryParams })
    await this.fetchData()
    window.scrollTo(0, 0)
  }

  slideConfig = {
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

  breakpoint(e: any) {
    console.log('breakpoint', e)
  }
}
