
const initEducationState = {}
export default function eudcationReducer(preState = initEducationState, action) {
  const { type, data } = action

  switch (type) {
    case 'initEducationEdit':
      return { ...data }

    case 'editSchoolName':
      preState.name = data
      return preState

    case 'editMajor':
      preState.major = data
      return preState

    case 'editDegree':
      preState.degree = data
      return preState

    case 'editEducationFrom':
      preState.from = data
      return preState

    case 'editEducationTo':
      preState.to = data
      return preState

    case 'editEducationLocation':
      preState.location = data
      return preState

    case 'editEducationLanguage':
      preState.language = data
      return preState

    default:
      return initEducationState
  }
}