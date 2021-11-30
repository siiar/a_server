import AuthorizedResolver from '../AuthorizedResolver'

export default {
  country: AuthorizedResolver(async (parent, args, context, info) => {
    const { name } = args
    const {
      dataSources: {
        countryAPI
      }
    } = context
    try {
      const [{
        name: {official},
        tld,
        currencies,
        capital,
        population,
        continents,
        flags
      }] = await countryAPI.getCountry(name)
      return {
        name: official,
        topLevelDomain: tld,
        region: continents,
        population,
        currencies:  Object.keys(currencies)
                      .map(key => ({ name: currencies[key].name, symbol: key })),
        capital: capital,
        flag: flags.png
      }
    } catch (e) {
      console.log('Country Exception')
      console.log(e.message)
      throw e
    }
  }
  )
}