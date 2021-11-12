
const initState = {}
export default function workReducer (preState = initState, action) {
  const { type, data } = action

  switch (type) {
    case 'initEdit':
      return { ...data }

    case 'editCompany':
      preState.company = data
      return preState

    case 'editTitle':
      preState.jobTitle = data
      return preState

    case 'editFrom':
      preState.from = data
      return preState

    case 'editTo':
      preState.to = data
      return preState

    case 'editDescription':
      preState.description = data
      return preState

    case 'editLocation':
      preState.location = data
      return preState

    case 'editLanguage':
      preState.language = data
      return preState
  
    default:
      return initState
  }
}