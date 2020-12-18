import { all } from 'redux-saga/effects';
import watchAll from './auth';
import watchAllAccount from './account';
import watchAllUsers from './user';

export default function* rootSaga() {
  yield all([watchAll(), watchAllAccount(), watchAllUsers()]);
}
