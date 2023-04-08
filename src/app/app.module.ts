import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { MenuComponent } from '@components/menu/menu.component'
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIconsModule } from '@ng-icons/core'
import { heroFireMini, heroPlayMini } from '@ng-icons/heroicons/mini'
import { CartComponent } from '@pages/cart/cart.component'
import { MarketComponent } from '@pages/market/market.component'
import { TrendingPage } from '@pages/trending/trending.component'
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
    MarketComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({ heroFireMini, heroPlayMini }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
