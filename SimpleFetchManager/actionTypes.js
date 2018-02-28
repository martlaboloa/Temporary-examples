const actionTypes = {
  factory: {
    REGISTER: 'SimpleFetchManager/REGISTER',
    UNREGISTER: 'SimpleFetchManager/UNREGISTER',
    RESET: 'SimpleFetchManager/RESET',
  },

  instance: {
    USER_FETCH: 'SimpleFetchManager/USER_FETCH',
    PREV_USER_FETCH: 'SimpleFetchManager/PREV_USER_FETCH',

    FETCH: 'SimpleFetchManager/FETCH',
    FETCH_SUCCEEDED: 'SimpleFetchManager/FETCH_SUCCEEDED',
    FETCH_FAILED: 'SimpleFetchManager/FETCH_FAILED',
    UNCONTROLLED_ERROR_HAPPENED: 'SimpleFetchManager/UNCONTROLLED_ERROR_HAPPENED',

    FINISH_TASK: 'SimpleFetchManager/FINISH_TASK',
    CANCEL_TASK: 'SimpleFetchManager/CANCEL_TASK',
  },
}

export default actionTypes
