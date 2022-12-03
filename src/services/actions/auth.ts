import {
  authorizationRequest,
  registrationUserRequest,
  getUserDataRequest,
  updateUserDataRequest,
  logoutRequest,
  updateTokenRequest,
  recoveryPasswordRequest,
  resetPasswordRequest
} from "../../utils/api/api";
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie/cookie';

import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,

  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,

  REGISTRATION_FORM_REQUEST,
  REGISTRATION_FORM_SUCCESS,
  REGISTRATION_FORM_FAILED,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,

  RECOVERY_PASSWORD_REQUEST,
  RECOVERY_PASSWORD_SUCCESS,
  RECOVERY_PASSWORD_FAILED,

  RESET_FORM_SET_VALUE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,

  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_FAILED,

  AUTH_CHECKED,
  AUTH_CHECKED_FAILD
} from "./constants/auth"

//Получение данных о пользователе
export function getUserData() {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUserDataRequest()
      .then((res) => {
        dispatch({
          type: GET_USER_SUCCESS,
          user: res.user,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_USER_FAILED,
        });
      });
  };
}

//Обновление данных пользователя
export function updateUserData(email, name, password) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    updateUserDataRequest(email, name, password)
      .then((res) => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          user: res.user,
        });
      })
      .catch(() => {
        dispatch({
          type: UPDATE_USER_FAILED,
        });
      });
  };
}

//Регистрация пользователя
export function registrationUser(name, email, password) {
  return function (dispatch) {
    dispatch({
      type: REGISTRATION_FORM_REQUEST,
    });
    registrationUserRequest(name, email, password)
      .then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return res;
      })
      .then((res) => {
        dispatch({
          type: REGISTRATION_FORM_SUCCESS,
          user: res.user,
        });
      })
      .catch(() => {
        dispatch({
          type: REGISTRATION_FORM_FAILED,
        });
      });
  };
}

//Авторизация
export function authorization(email, password) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    authorizationRequest(email, password)
      .then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return res;
      })
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          user: res.user,
        });
      })
      .catch(() => {
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
}

//Выход из системы
export function logout() {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    logoutRequest()
      .then((res) => {
        deleteCookie("token");
        localStorage.clear()
        if (res && res.ok) {
          dispatch({
            type: LOGOUT_SUCCESS,
          });
        } else {
          dispatch({ type: LOGOUT_FAILED });
          alert("Ошибка выхода из аккаунта");
        }
      })
      .catch(() => {
        dispatch({
          type: LOGOUT_FAILED,
        });
        alert("Ошибка выхода из аккаунта")
      });
  };
}

//Восстановление пароля
export function recoveryPassword(email) {
  return function (dispatch) {
    dispatch({
      type: RECOVERY_PASSWORD_REQUEST,
    });
    recoveryPasswordRequest(email)
      .then((res) => {
        dispatch({
          type: RECOVERY_PASSWORD_SUCCESS,
          message: res.message,
        });
      })
      .catch(() => {
        dispatch({
          type: RECOVERY_PASSWORD_FAILED,
        });
      });
  };
}

export const setResetFormValue = (field, value) => ({
  type: RESET_FORM_SET_VALUE,
  field,
  value,
});

//Сброс пароля пользователя
export function resetPassword(password, token) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    resetPasswordRequest(password, token)
      .then((res) => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
      })
      .catch(() => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      });
  };
}

//Обновление токена
export function updateToken() {
  return function (dispatch) {
    dispatch({ type: UPDATE_TOKEN_REQUEST });
    updateTokenRequest()
      .then((res) => {
        const authToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("token", authToken);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch({
          type: UPDATE_TOKEN_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_TOKEN_FAILED,
        });
      });
  };
}

export const checkUzerAuth = () => {
  return function (dispatch) {
    if (getCookie("token")) {
      dispatch({
        type: AUTH_CHECKED,
      });
    } else {
      dispatch({
        type: AUTH_CHECKED_FAILD,
      });
    }
  };
};
