import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { Link, useLocation, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { registerUser } from "../../utils/api/api";

export const Register = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((store) => {
    return store.user;
  });

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  const onNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  //Регистрация
  const onFormSubmitRegister = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(registerUser(nameValue, passwordValue, emailValue));
    },
    [nameValue, passwordValue, emailValue]
  );

  //Проверяем, авторизован ли пользователь
  if (user.user) {
    return <Redirect to={"/"} />;
  }

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-medium pb-6`}>
        Регистрация
      </h2>
      <form className={styles.form} onSubmit={(e) => onFormSubmitRegister(e)}>
        <div className="pb-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onNameChange}
            value={nameValue}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className="pb-6">
          <EmailInput
            onChange={onEmailChange}
            value={emailValue}
            name={"email"}
            size="default"
          />
        </div>
        <div className="pb-6">
          <PasswordInput
            onChange={onPasswordChange}
            value={passwordValue}
            name={"password"}
            size="default"
          />
        </div>
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive pt-20 pb-4">
        Уже зарегистрированы?
        <Link
          className={`${styles.link} text text_type_main-default`}
          to="/login"
        >
          Войти
        </Link>
      </p>
    </div>
  );
};
