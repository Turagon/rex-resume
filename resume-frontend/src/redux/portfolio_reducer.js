
const initPortfolioState = {}
export default function portfolioReducer(preState = initPortfolioState, action) {
  const { type, data } = action

  switch (type) {
    case 'initPortfolioEdit':
      return { ...data }

    case 'editPortfolioName':
      preState.name = data
      return preState

    case 'editGithub':
      preState.github = data
      return preState

    case 'editHeroku':
      preState.heroku = data
      return preState

    case 'editPortfolioImage':
      preState.image = data
      return preState

    case 'editPortfolioDescription':
      preState.description = data
      return preState

    case 'editPortfolioLanguage':
      preState.language = data
      return preState

    default:
      return initPortfolioState
  }
}