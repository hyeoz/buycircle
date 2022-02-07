import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router";
import AuthForm from "../../components/auth/AuthForm";
import { changeField, initializeForm, login } from "../../modules/auth";
import { check } from "../../modules/user";

const LoginFormContainer = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {form, auth, authError, user} = useSelector(({auth, user}) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onChange = (e) => {
    const {value, name} = e.target;
    dispatch(changeField({
      form: 'login',
      key: name,
      value
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const {username, password} = form;
    dispatch(login({username, password}))
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      setError('로그인에 실패하였습니다.');
      return;
    }
    if (auth) {
      dispatch(check())
    }
  }, [authError, auth, dispatch])

  useEffect(() => {
    if (user) {
      navigate('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('local storage is not working');
      }
    }
  });

  return (
    <AuthForm type="login" form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
  );
};

export default LoginFormContainer;
