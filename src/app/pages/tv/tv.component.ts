import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { IMAGE_BASE_PATH } from '@configs/constants'
import { IHttpResponse } from '@interfaces/response'
import { ITrendItem } from '@interfaces/trend'
import dayjs from 'dayjs'
import { NgxSpinnerService } from 'ngx-spinner'
import { HttpService } from 'src/services/http.service'

@Component({
  selector: 'app-content',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss'],
})
export class TvPage implements OnInit {
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
    private route: ActivatedRoute
  ) {}

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
  // showProduct(value: string) {
  //   console.log(value)
  //   // this.price.setValue(0)
  //   this.addProduct = value
  // }
  // getValue() {
  //   return JSON.parse(window.localStorage.getItem('market') || '')
  // }
  // productAddStore(item: string) {
  //   let old = this.getValue()
  //   this.addProduct.price = item
  //   // console.log(this.addProduct)
  //   if (old !== null) {
  //     var valueArr = old.map(function (item: any) {
  //       return item.id
  //     })
  //     if (valueArr.indexOf(this.addProduct.id) == -1) {
  //       window.localStorage.setItem(
  //         'market',
  //         JSON.stringify([...old, this.addProduct])
  //       )
  //       Swal.fire('', 'เพิ่มสินค้าสำเร็จ', 'success')
  //     } else {
  //       Swal.fire('', 'มีสิ้นค้าชิ้นนี้ในร้านแล้ว', 'error')
  //     }
  //   } else {
  //     window.localStorage.setItem('market', JSON.stringify([this.addProduct]))
  //     Swal.fire('', 'เพิ่มสินค้าสำเร็จ', 'success')
  //   }
  //   this.price = 0
  // }
}
