import AuthTemplate from "../components/auth/AuthTemplate"
import RegisterFormContainer from "../container/auth/RegisterFormContainer";

const RegisterPage = () => {
  return (
    <AuthTemplate>
      <RegisterFormContainer />
    </AuthTemplate>
  );
};

export default RegisterPage;
