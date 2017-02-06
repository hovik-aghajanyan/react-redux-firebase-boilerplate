import { put, call } from 'redux-saga/effects'
import { userLoginSuccess, userLoginFailure, fetchUserFailure,
    fetchUserSuccess, userLogoutSuccess, userLogoutFailure } from '../actions/userAuth'
import FireBaseTools from '../utils/firebase'

export default function* userAuthSagas(data) {
    try {
        const user = yield call(FireBaseTools.loginUser, data)
        yield put(userLoginSuccess(user))
    } catch (error) {
        yield put(userLoginFailure(error))
    }
}

export function* userFetchSagas() {
    try {
        const user = yield call(FireBaseTools.fetchUser)
        if (user !== null) {
            yield put(fetchUserSuccess(user))
        } else {
            yield put(fetchUserFailure())
        }
    } catch (error) {
        yield put(fetchUserFailure())
    }
}

export function* userLogout(user) {
    console.log('user logout', user)
    try {
        const data = yield call(FireBaseTools.logoutUser, user)
        yield put(userLogoutSuccess(data))
    } catch (error) {
        yield put(userLogoutFailure(error))
    }
}
