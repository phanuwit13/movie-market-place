import { Component, OnInit } from '@angular/core'
import { HttpService } from 'src/services/http.service'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  // public basePath = this.http.imgBasePath

  public cartProduct: any = []
  public total = 0
  public pricePromo = 0
  public priceTotal = 0
  public test = 59
  public Countdown: any
  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.cartProduct = this.getCart()
    console.log(this.cartProduct)
    if (this.cartProduct) {
      this.total = this.sumtotle()
      this.priceTotal = this.sumPrice()
      this.pricePromo = this.sumPromotion()
      this.test = JSON.parse(window.localStorage.getItem('time') || '')
    }
  }
  getCart() {
    return JSON.parse(window.localStorage.getItem('cart') || '')
  }
  sumtotle() {
    let sum = 0
    this.cartProduct.map((value: any) => {
      return (sum += value.amount)
    })
    return sum
  }
  sumPrice() {
    let sum = 0
    this.cartProduct.map((value: any) => {
      return (sum += value.amount * value.detail.price)
    })
    return sum
  }
  sumPromotion() {
    let sum = 0
    let checkPromotion = this.sumtotle()
    console.log(checkPromotion)
    this.cartProduct.map((value: any) => {
      return (sum += value.amount * value.detail.price)
    })
    if (checkPromotion > 3 && checkPromotion <= 5) {
      return sum - (sum * 10) / 100
    } else if (checkPromotion > 5) {
      return sum - (sum * 20) / 100
    } else return sum
  }
  clearCart() {
    Swal.fire({
      icon: 'question',
      title: '',
      text: 'ยืนยันการล้างตะกร้า?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `ยืนยัน`,
      cancelButtonText: `ยกเลิก`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('', 'สำเร็จ!', 'success')
        window.localStorage.setItem('cart', JSON.stringify([]))
        this.cartProduct = this.getCart()
        this.total = 0
        this.pricePromo = 0
        this.priceTotal = 0
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
  deleteCart(id: string) {
    let newData = this.cartProduct.filter((value: any) => {
      return value.detail.id !== id
    })
    // console.log(newData)
    window.localStorage.setItem('cart', JSON.stringify([...newData]))
    this.cartProduct = this.getCart()
    // this.http.totalCart = this.getCart().length
    this.total = this.sumtotle()
    this.priceTotal = this.sumPrice()
    this.pricePromo = this.sumPromotion()
  }
  pay() {
    this.test = JSON.parse(window.localStorage.getItem('time') || '')
    let count = JSON.parse(window.localStorage.getItem('time') || '')
    if (count) {
      this.getTime()
    } else {
      window.localStorage.setItem('time', JSON.stringify(59))
      this.count()
    }
  }
  count() {
    this.Countdown = setInterval(() => {
      if (this.test === 0) {
        window.localStorage.removeItem('time')
        clearInterval(this.Countdown)
        this.test = 59
      } else {
        this.test = JSON.parse(window.localStorage.getItem('time') || '') - 1
        window.localStorage.setItem('time', JSON.stringify(this.test))
      }
    }, 1000)
  }
  getTime() {
    var Countdown = setInterval(() => {
      this.test = JSON.parse(window.localStorage.getItem('time') || '')
    }, 1000)
  }
  clearTime() {
    clearInterval(this.Countdown)
    window.localStorage.removeItem('time')
  }
}
