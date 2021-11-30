import { RESTDataSource } from 'apollo-datasource-rest'
import { rescoutries_base_uri } from '@/config'

export default class CountryAPI extends RESTDataSource {
  constructor() {
    super()
    // set base url for REST request
    this.baseURL = rescoutries_base_uri
  }
  async getCountry(name) {
    return this.get(`/name/${encodeURIComponent(name)}`)
  }
}