import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { ENV, ROOT_PATH, ROUTE_API } from '@configs/constants'
import { IPagination } from '@interfaces/pagination'
import { IHttpResponse } from '@interfaces/response'

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private router: Router) {}

  public pagination: IPagination = {
    page: 0,
    total_pages: 0,
    total_results: 0,
    results: [],
  }

  public isDarkEnable = window.localStorage.getItem('theme') === 'dark' && true

  public changeTheme = () => {
    this.isDarkEnable = !this.isDarkEnable
    window.localStorage.setItem('theme', this.isDarkEnable ? 'dark' : 'light')
  }

  public get = (path: string) => {
    return new Promise<IHttpResponse>(async (resolve) => {
      try {
        const response = await this.http
          .get(ROOT_PATH + path + `api_key=${ENV.API_KEY}`)
          .toPromise()
        resolve({ success: true, response })
      } catch (error) {
        resolve({ success: false, response: error })
      }
    })
  }

  public setPagination = async (response: any) => {
    this.pagination = {
      page: response.page,
      total_pages: response.total_pages,
      total_results: response.total_results,
      results: response.results,
    }
  }

  public getTrendListMovie = async (page: number = 1) => {
    const info = await this.get(`${ROUTE_API.TREND_MOVIE}?page=${page}&`)
    if (info.success && info.response) {
      this.setPagination(info.response)
    }
    return { ...info }
  }

  public getMovieNowPlaying = async (page: number = 1) => {
    const info = await this.get(`${ROUTE_API.MOVIE_NOW_PLAYING}?page=${page}&`)
    if (info.success && info.response) {
      this.setPagination(info.response)
    }
    return { ...info }
  }

  public getTVAiringToday = async (page: number = 1) => {
    const info = await this.get(`${ROUTE_API.TV_AIRING_TODAY}?page=${page}&`)
    if (info.success && info.response) {
      this.setPagination(info.response)
    }
    return { ...info }
  }

  public getTVPopular = async (page: number = 1) => {
    const info = await this.get(`${ROUTE_API.TV_POPULAR}?page=${page}&`)
    if (info.success && info.response) {
      this.setPagination(info.response)
    }
    return { ...info }
  }
}
