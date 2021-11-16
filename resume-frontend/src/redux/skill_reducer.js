
const initSkillState = {}
export default function skillReducer(preState = initSkillState, action) {
  const { type, data } = action

  switch (type) {
    case 'initSkillEdit':
      return { ...data }

    case 'editCategory':
      preState.category = data
      return preState

    case 'editSkillName':
      preState.name = data
      return preState

    default:
      return initSkillState
  }
}