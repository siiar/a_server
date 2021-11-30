import AuthorizedResolver from "../AuthorizedResolver"

export default {
  exchange: AuthorizedResolver( async (parent, args, context, info) => {
    const {
      base,
      amount,
      symbols
    } = args
    const {
      dataSources: {
        exchangeAPI
      }
    } = context
    try {
      const { rates } = await exchangeAPI.getExchange(base, symbols)
      return {
        base: {
          name: '',
          symbol: base,
          value: amount
        },
        currencies: Object.keys(rates).map((key) => ({
          name: '',
          symbol: key,
          value: rates[key] * amount
        }))
      }
    } catch (e) {
      console.log('Exchange Exception')
      console.log(e.message)
      throw e
    }
  })
  
  
}