import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from '@components/menu/menu.component';
import { CartComponent } from '@pages/cart/cart.component';
import { MarketComponent } from '@pages/market/market.component';
import { TrendingPage } from '@pages/trending/trending.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      { path: '', component: TrendingPage },
      { path: 'market', component: MarketComponent },
      { path: 'cart', component: CartComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
