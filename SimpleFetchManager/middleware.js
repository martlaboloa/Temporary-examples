import actionTypes from './actionTypes'

export default () => next => action => {
  if (
    (action.type === actionTypes.instance.USER_FETCH || action.type === actionTypes.instance.PREV_USER_FETCH) &&
    !action.meta.resolve &&
    !action.meta.reject
  ) {
    return new Promise((resolve, reject) => {
      next({ ...action, meta: { ...action.meta, resolve, reject } })
    })
  }
  return next(action)
}
