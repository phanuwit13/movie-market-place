import { Component, OnInit } from '@angular/core'
import { HttpService } from 'src/services/http.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {
  // public basePath = this.http.imgBasePath
  public movieShow = []
  public movie = []
  public addProduct: any = []
  public price = 0
  public amount = 1

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.setValue()
  }
  setValue() {
    this.movie = this.getValue()
    this.movieShow = this.getValue()
  }
  showProduct(value: any) {
    this.addProduct = value
  }
  getValue() {
    return JSON.parse(window.localStorage.getItem('market') || '')
  }
  getCart() {
    return JSON.parse(window.localStorage.getItem('cart') || '')
  }
  productAddCart() {
    let old = this.getCart()
    let cart = {
      detail: this.addProduct,
      amount: this.amount,
    }
    if (old !== null) {
      let check = 0
      old.map((value: any, index: number) => {
        if (value.detail.id === this.addProduct.id) {
          check = 1
          value.amount += this.amount
        }
        return true
      })
      if (check === 1) {
        window.localStorage.setItem('cart', JSON.stringify([...old]))
        Swal.fire('', 'เพิ่มสินค้าสำเร็จ', 'success')
      } else {
        window.localStorage.setItem('cart', JSON.stringify([...old, cart]))
        Swal.fire('', 'เพิ่มสินค้าสำเร็จ', 'success')
      }
    } else {
      window.localStorage.setItem('cart', JSON.stringify([cart]))
      Swal.fire('', 'เพิ่มสินค้าสำเร็จ', 'success')
    }
    // this.http.totalCart = this.getCart().length
    this.amount = 1
  }
  changeAmount(type: any) {
    if (type === 'add') {
      this.amount = this.amount + 1
    } else {
      this.amount > 0 ? (this.amount = this.amount - 1) : this.amount
    }
  }
  filterList(keyWord: string) {
    let data = this.movie
    let str = keyWord.toLowerCase()
    data = data.filter(function (value: any) {
      // console.log(value.name)
      return value?.title.toLowerCase().indexOf(str) !== -1 // returns true or false
    })
    this.movieShow = data
  }
}
