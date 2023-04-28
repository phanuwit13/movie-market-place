import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from '@components/menu/menu.component';
import { HomePage } from '@pages/home/home.component';
import { MoviePage } from '@pages/movie/movie.component';
import { TrendingPage } from '@pages/trending/trending.component';
import { TvPage } from '@pages/tv/tv.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      { path: '', component: HomePage },
      { path: 'trend', component: TrendingPage },
      { path: 'tv', component: TvPage },
      { path: 'movie', component: MoviePage },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
