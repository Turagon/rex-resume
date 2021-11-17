
const initGeneralState = {}
export default function generalReducer(preState = initGeneralState, action) {
  const { type, data } = action

  switch (type) {
    case 'initGeneralEdit':
      return { ...data }

    case 'editGeneralUsername':
      preState.username = data
      return preState

    case 'editToken':
      preState.token = data
      return preState

    default:
      return initGeneralState
  }
}