import actions from '../actionTypes'

const reducerInitState = {
  notFetched: true,

  pending: false,

  fetchSucceeded: false,
  prevData: null,
  data: null,

  fetchFailed: false,
  prevError: null,
  error: null,

  uncontrolledErrorHappened: false,
  prevUncontrolledError: null,
  uncontrolledError: null,

  previousUserFetchAction: null,
}

/**
 * there is always fetch before: success, fail, or uncontrolledFail.
 * fetches can be infinite, last is taken.
 * success, fail, or uncontrolledFail: cant be two in a row, they are always in between fetches.
 * @param state
 * @param type
 * @param payload
 * @returns {*}
 */
const fetchInstance = (state = reducerInitState, action) => {
  const { type, payload } = action
  switch (type) {
    case actions.instance.USER_FETCH: {
      const { pending, data, error, uncontrolledError, prevData, prevError, prevUncontrolledError } = state
      const { savePreviousResponse } = payload

      return !pending
        ? {
            notFetched: false,

            pending: true,

            fetchSucceeded: false,
            prevData: savePreviousResponse ? data : null,
            data,

            fetchFailed: false,
            prevError: savePreviousResponse ? error : null,
            error,

            uncontrolledErrorHappened: false,
            prevUncontrolledError: savePreviousResponse ? uncontrolledError : null,
            uncontrolledError,

            previousUserFetchAction: {
              ...action,
              meta: {
                instanceName: action.meta.instanceName,
              },
            },
          }
        : {
            ...state,

            prevData: savePreviousResponse ? prevData : null,

            prevError: savePreviousResponse ? prevError : null,

            prevUncontrolledError: savePreviousResponse ? prevUncontrolledError : null,

            previousUserFetchAction: {
              ...action,
              meta: {
                instanceName: action.meta.instanceName,
              },
            },
          }
    }
    // when time comes to delete this comment permanently, fetch action use cases need to be
    // changed(arguments and generally rethink removing this case)
    // case actions.instance.FETCH: {
    //   const { pending, data, error, uncontrolledError, prevData, prevError, prevUncontrolledError } = state
    //   const { savePreviousResponse } = payload
    //
    //   return !pending
    //     ? {
    //         ...state,
    //         notFetched: false,
    //
    //         pending: true,
    //
    //         fetchSucceeded: false,
    //         prevData: savePreviousResponse ? data : null,
    //         data: null,
    //
    //         fetchFailed: false,
    //         prevError: savePreviousResponse ? error : null,
    //         error: null,
    //
    //         uncontrolledErrorHappened: false,
    //         prevUncontrolledError: savePreviousResponse ? uncontrolledError : null,
    //         uncontrolledError: null,
    //       }
    //     : {
    //         ...state,
    //
    //         prevData: savePreviousResponse ? prevData : null,
    //
    //         prevError: savePreviousResponse ? prevError : null,
    //
    //         prevUncontrolledError: savePreviousResponse ? prevUncontrolledError : null,
    //       }
    // }
    case actions.instance.FETCH_SUCCEEDED: {
      return {
        ...state,

        pending: false,

        fetchSucceeded: true,

        data: payload,
        error: null,
        uncontrolledError: null,
      }
    }
    case actions.instance.FETCH_FAILED: {
      return {
        ...state,

        pending: false,

        fetchFailed: true,
        data: null,
        error: payload,
        uncontrolledError: null,
      }
    }
    case actions.instance.UNCONTROLLED_ERROR_HAPPENED: {
      return {
        ...state,

        pending: false,

        uncontrolledErrorHappened: true,
        data: null,
        error: null,
        uncontrolledError: payload,
      }
    }
    default:
      return state
  }
}

export default fetchInstance
