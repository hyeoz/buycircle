import { Link } from "react-router-dom";
import styled from "styled-components";
import { palette } from "../../lib/styles/palette";
import Button from "../common/Button";

/* 회원가입 또는 로그인 폼을 보여줌 */

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.colors.gray[800]};
    margin-bottom: 1rem;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.colors.gray[500]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: ${palette.colors.yellow[700]};
    border-bottom: 1px solid ${palette.colors.gray[700]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.colors.gray[600]};
    text-decoration: underline;
    &:hover {
      color: ${palette.colors.gray[900]};
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const textMap = {
  login: "로그인",
  register: "회원가입",
};

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const AuthForm = ({type, form, onChange, onSubmit, error}) => {
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput autoComplete="username" name="username" placeholder="아이디" onChange={onChange} value={form.username} />
        <StyledInput autoComplete="new-password" name="password" placeholder="비밀번호" type="password" onChange={onChange} value={form.password} />
        {type === 'register' && (
          <StyledInput autoComplete="new-password" name="passwordConfirm" placeholder="비밀번호 확인" type="password" onChange={onChange} value={form.passwordConfirm} />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonWithMarginTop orange fullWidth>{text}</ButtonWithMarginTop>
      </form>
      <Footer>
        {type === 'login' ? ( 
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
