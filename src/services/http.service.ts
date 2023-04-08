import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { ENV, ROOT_PATH, ROUTE_API } from '@configs/constants'

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  // search/movie?api_key=179d983912bdcb395e93864692030745&query=

  constructor(private http: HttpClient, private router: Router) {}

  public get = (path: string) => {
    return new Promise(async (resolve) => {
      try {
        const response = await this.http
          .get(ROOT_PATH + path + `?api_key=${ENV.API_KEY}`)
          .toPromise()
        resolve({ success: true, response })
      } catch (error) {
        resolve({ success: false, response: error })
      }
    })
  }

  public getTrendListMovie = () => {
    return this.get(`${ROUTE_API.TREND_MOVIE}`)
  }
}
