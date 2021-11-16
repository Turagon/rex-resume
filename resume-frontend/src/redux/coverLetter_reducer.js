
const initLetterState = {}
export default function letterReducer(preState = initLetterState, action) {
  const { type, data } = action

  switch (type) {
    case 'initLetterEdit':
      return { ...data }

    case 'editUsername':
      preState.username = data
      return preState

    case 'editContent':
      preState.content = data
      return preState

    case 'editLetterTo':
      preState.to = data
      return preState

    case 'editAttention':
      preState.attention = data
      return preState

    case 'editDate':
      preState.date = data
      return preState

    default:
      return initLetterState
  }
}