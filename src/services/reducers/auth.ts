import { TAuthActions } from "../actions/auth";
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
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_FAILED,
  AUTH_CHECKED,
  AUTH_CHECKED_FAILD,
} from "../actions/constants/auth";

import { TUser } from '../types/data'

export type TAuthState = {
  isAuthSuccess: boolean;
  form: {
    name: string,
    email: string,
    password: string,
    code: string
  };

  user: TUser;

  getUserDataRequest: boolean;
  getUserDataFaild: boolean;
  getUserDataSuccess: boolean;

  updateUserDataRequest: boolean;
  updateUserDataFaild: boolean;
  updateUserDataSuccess: boolean;

  registrationUserRequest: boolean;
  registrationUserFaild: boolean;
  registrationUserSuccess: boolean;

  authorizationRequest: boolean;
  authorizationFaild: boolean;
  authorizationSuccess: boolean;

  logoutRequest: boolean;
  logoutFaild: boolean;
  logoutSuccess: boolean;

  recoveryPasswordRequest: boolean;
  recoveryPasswordFaild: boolean;
  recoveryPasswordSuccess: boolean;

  resetPasswordRequest: boolean;
  resetPasswordFaild: boolean;
  resetPasswordSuccess: boolean;

  updateTokenRequest: boolean;
  updateTokenFaild: boolean;
  updateTokenSuccess: boolean;
}

const initialState: TAuthState = {
  isAuthSuccess: false,

  form: {
    name: "",
    email: "",
    password: "",
    code: ""
  },

  user: {
    email: "",
    name: "",
  },

  getUserDataRequest: false,
  getUserDataFaild: false,
  getUserDataSuccess: false,

  updateUserDataRequest: false,
  updateUserDataFaild: false,
  updateUserDataSuccess: false,

  registrationUserRequest: false,
  registrationUserFaild: false,
  registrationUserSuccess: false,

  authorizationRequest: false,
  authorizationFaild: false,
  authorizationSuccess: false,

  logoutRequest: false,
  logoutFaild: false,
  logoutSuccess: false,

  recoveryPasswordRequest: false,
  recoveryPasswordFaild: false,
  recoveryPasswordSuccess: false,

  resetPasswordRequest: false,
  resetPasswordFaild: false,
  resetPasswordSuccess: false,

  updateTokenRequest: false,
  updateTokenFaild: false,
  updateTokenSuccess: false,
}

export const authReducer = (state = initialState, action: TAuthActions): TAuthState => {
  switch (action.type) {
    case AUTH_CHECKED: {
      return {
        ...state,

        isAuthSuccess: true,
      }
    }
    case AUTH_CHECKED_FAILD: {
      return {
        ...state,

        isAuthSuccess: false,
      }
    }

    //Получение данных пользователя
    case GET_USER_REQUEST: {
      return {
        ...state,

        getUserDataRequest: true,
        getUserDataFaild: false,
      }
    }

    case GET_USER_FAILED: {
      return {
        ...state,

        getUserDataRequest: false,
        getUserDataFaild: true,
        isAuthSuccess: false,
      }
    }

    case GET_USER_SUCCESS: {
      return {
        ...state,

        getUserDataFaild: false,
        getUserDataSuccess: true,

        user: action.user,
      }
    }

    //Обновление данных пользователя 
    case UPDATE_USER_REQUEST: {
      return {
        ...state,

        updateUserDataRequest: true,
        updateUserDataFaild: false,
        updateUserDataSuccess: false,
      }
    }

    case UPDATE_USER_FAILED: {
      return {
        ...state,

        updateUserDataRequest: false,
        updateUserDataSuccess: false,
        updateUserDataFaild: true,
      }
    }

    case UPDATE_USER_SUCCESS: {
      return {
        ...state,

        updateUserDataRequest: false,
        updateUserDataSuccess: true,
        updateUserDataFaild: false,

        user: action.user,

        form: {
          ...state.form,
          email: "",
          password: "",
          name: "",
        },
      }
    }

    //Регистрация пользователя
    case REGISTRATION_FORM_REQUEST: {
      return {
        ...state,

        registrationUserRequest: true,
        registrationUserFaild: false,
        registrationUserSuccess: false,
      }
    }

    case REGISTRATION_FORM_FAILED: {
      return {
        ...state,

        registrationUserRequest: false,
        registrationUserFaild: true,
        registrationUserSuccess: false,
      }
    }

    case REGISTRATION_FORM_SUCCESS: {
      return {
        ...state,

        user: action.user,

        form: {
          ...state.form,
          email: "",
          password: "",
          name: "",
        },

        registrationUserRequest: false,
        registrationUserFaild: false,
        registrationUserSuccess: true,
      }
    }

    case LOGIN_REQUEST: {
      return {
        ...state,
        authorizationRequest: true,
        authorizationFaild: false,
        authorizationSuccess: false,
      }
    }

    case LOGIN_FAILED: {
      return {
        ...state,
        authorizationRequest: false,
        authorizationFaild: true,
        authorizationSuccess: false,

        isAuthSuccess: false,
      }
    }

    case LOGIN_SUCCESS: {

      return {
        ...state,

        user: action.user,

        form: {
          ...state.form,
          email: '',
          name: '',
          password: '',
        },


        isAuthSuccess: true,

        authorizationRequest: false,
        authorizationFaild: false,
        authorizationSuccess: true,
      }
    }

    //Выход из системы
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutFaild: false,
        logoutSuccess: false,
      }
    }

    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFaild: true,
        logoutSuccess: false,
      }
    }

    case LOGOUT_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          email: "",
          name: "",
        },

        form: {
          ...state.form,
          email: '',
          name: '',
          password: '',
        },

        logoutRequest: false,
        logoutFaild: false,
        logoutSuccess: true,

        isAuthSuccess: false,
      }
    }

    //Восстановление пароля
    case RECOVERY_PASSWORD_REQUEST: {
      return {
        ...state,
        recoveryPasswordRequest: true,
        recoveryPasswordFaild: false,
        recoveryPasswordSuccess: false,
      }
    }

    case RECOVERY_PASSWORD_FAILED: {
      return {
        ...state,
        recoveryPasswordRequest: false,
        recoveryPasswordFaild: true,
        recoveryPasswordSuccess: false,
      }
    }

    case RECOVERY_PASSWORD_SUCCESS: {
      return {
        ...state,

        form: {
          ...state.form,
          email: '',
        },

        recoveryPasswordRequest: false,
        recoveryPasswordFaild: false,
        recoveryPasswordSuccess: true,
      }
    }


    //Сброс пароля
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,

        resetPasswordRequest: true,
        resetPasswordFaild: false,
        resetPasswordSuccess: false,
      }
    }

    case RESET_PASSWORD_FAILED: {
      return {
        ...state,

        resetPasswordRequest: false,
        resetPasswordFaild: true,
        resetPasswordSuccess: false,
      }
    }

    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,

        resetPasswordRequest: false,
        resetPasswordFaild: false,
        resetPasswordSuccess: true,
      }
    }

    //Обновление токена
    case UPDATE_TOKEN_REQUEST: {
      return {
        ...state,
        updateTokenRequest: true,
        updateTokenFaild: false,
        updateTokenSuccess: false,
      }
    }

    case UPDATE_TOKEN_FAILED: {
      return {
        ...state,
        updateTokenRequest: false,
        updateTokenFaild: true,
        updateTokenSuccess: false,
      }
    }

    case UPDATE_TOKEN_SUCCESS: {
      return {
        ...state,
        updateTokenRequest: false,
        updateTokenFaild: false,
        updateTokenSuccess: true,
      }
    }

    default: {
      return state;
    }
  }

}