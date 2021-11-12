
const initUserState = {}
export default function userReducer(preState = initUserState, action) {
  const { type, data } = action
  
  switch (type) {
    case 'initUserEdit':
      return { ...data }

    case 'editUsername':
      preState.name = data
      return preState

    case 'editRole':
      preState.role = data
      return preState

    case 'editIsActive':
      preState.isActive = data
      return preState

    case 'editPassword':
      preState.password = data
      return preState

    case 'editCheckPassword':
      preState.checkPassword = data
      return preState

    case 'editUserLanguage':
      preState.language = data
      return preState

    default:
      return initUserState
  }
}