
const initCertificateState = {}
export default function certificateReducer(preState = initCertificateState, action) {
  const { type, data } = action

  switch (type) {
    case 'initCertificateEdit':
      return { ...data }

    case 'editCertificateName':
      preState.name = data
      return preState

    case 'editCertificateImage':
      preState.image = data
      return preState

    case 'editInstitution':
      preState.institution = data
      return preState

    case 'editDate':
      preState.date = data
      return preState

    default:
      return initCertificateState
  }
}