
const initPersonState = {}
export default function personReducer(preState = initPersonState, action) {
  const { type, data } = action

  switch (type) {
    case 'initPersonEdit':
      return { ...data }

    case 'editPersonName':
      preState.name = data
      return preState

    case 'editImage':
      preState.image = data
      return preState

    case 'editBirthday':
      preState.birthday = data
      return preState

    case 'editAddress':
      preState.address = data
      return preState

    case 'editPhone':
      preState.phone = data
      return preState

    case 'editEmail':
      preState.email = data
      return preState

    case 'editLanguage':
      preState.language = data
      return preState

    default:
      return initPersonState
  }
}