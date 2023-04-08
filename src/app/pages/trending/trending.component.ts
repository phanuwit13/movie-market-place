import { Component, OnInit } from '@angular/core'
import { HttpService } from 'src/services/http.service'
@Component({
  selector: 'app-content',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
})
export class TrendingPage implements OnInit {
  // public basePath = this.http.imgBasePath
  public movie = []
  public addProduct: any = []
  public price = 0

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    console.log('object')
    this.fetchData('a')
  }

  async fetchData(key: string) {
    let httpResponse: any = await this.http.getTrendListMovie()
    console.log(httpResponse)
    // if (httpResponse.connect) {
    //   this.movie = await httpResponse.response.results
    //   console.log(httpResponse.response.results)
    // } else {
    //   console.log(httpResponse.response.results)
    // }
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
