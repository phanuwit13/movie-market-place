import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  // search/movie?api_key=179d983912bdcb395e93864692030745&query=
  public ROOT_PATH: string =
    'https://api.themoviedb.org/3/'
  public imgBasePath: string = 'https://image.tmdb.org/t/p/w500/'

  public totalCart = 0

  private ROUTE_API = {
    TREND_MOVIE: 'trending/movie/week',
  }

  constructor(private http: HttpClient, private router: Router) {}

  public get = (path: string) => {
    return new Promise(async (resolve) => {
      try {
        const response = await this.http.get(this.ROOT_PATH + path).toPromise()
        resolve({ success: true, response })
      } catch (error) {
        resolve({ success: false, response: error })
      }
    })
  }

  public getTrendListMovie = (path: string) => {
    return new Promise(async (resolve) => {
      try {
        const response = await this.http
          .get(
            `${this.ROOT_PATH}${this.ROUTE_API.TREND_MOVIE}?api_key=${'179d983912bdcb395e93864692030745'}`
          )
          .toPromise()
        resolve({ success: true, response })
      } catch (error) {
        resolve({ success: false, response: error })
      }
    })
  }
}
