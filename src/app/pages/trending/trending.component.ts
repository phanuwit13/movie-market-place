import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { IMAGE_BASE_PATH } from '@configs/constants'
import { IHttpResponse } from '@interfaces/response'
import { ITrendItem } from '@interfaces/trend'
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap'
import dayjs from 'dayjs'
import { NgxSpinnerService } from 'ngx-spinner'
import { HttpService } from 'src/services/http.service'

@Component({
  selector: 'app-content',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
})
export class TrendingPage implements OnInit {
  // public basePath = this.http.imgBasePath

  public movie: ITrendItem[] = []
  public addProduct: any = []
  public price = 0
  public dayjs = dayjs
  public page: number = 1
  totalResults: number = 0

  constructor(
    private http: HttpService,
    private spinner: NgxSpinnerService,
    public router: Router,
    private route: ActivatedRoute,
    private config: NgbRatingConfig
  ) {
    config.max = 5
    config.readonly = true
  }

  ngOnInit(): void {
    this.page = Number(this.route.snapshot.queryParamMap.get('page')) || 1
    this.fetchData()
  }

  async fetchData() {
    this.spinner.show()
    let httpResponse: IHttpResponse = await this.http.getTrendListMovie(
      this.page
    )
    this.spinner.hide()
    if (httpResponse.response) {
      this.movie = [
        ...httpResponse.response.results?.map((item: ITrendItem) => ({
          ...item,
          poster_path: item.poster_path
            ? `${IMAGE_BASE_PATH}w200/${item.poster_path}`
            : 'assets/image/no-image.jpg',
          backdrop_path: item.backdrop_path
            ? `${IMAGE_BASE_PATH}original${item.backdrop_path}`
            : 'assets/image/no-image.jpg',
        })),
      ]
      this.page = httpResponse.response.page
      this.totalResults = Math.min(httpResponse.response.total_results, 10000)
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
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 2000,
    // autoplaySpeed: 2000,
  }

  breakpoint(e: any) {
    console.log('breakpoint', e)
  }
}
