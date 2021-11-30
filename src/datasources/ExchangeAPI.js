import {RESTDataSource} from 'apollo-datasource-rest'
import {
  fixer_base_uri,
  fixer_api_key
} from '@/config'

export default class ExchangeAPI extends RESTDataSource {
  constructor() {
    super()
    // sets the base url for rest requests
    this.baseURL = fixer_base_uri
  }
  willSendRequest(request) {
    request.params.set('access_key', fixer_api_key)
  }
  async getExchange(base = '', symbols = []) {
    return this.get('latest', {
      //base,
      symbols: symbols.join()
    })
  }
}