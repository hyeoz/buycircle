import { Link } from "react-router-dom";
import styled from "styled-components";
import { palette } from "../../lib/styles/palette";
import Button from "./Button";
import Responsive from "./Responsive";

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: ${palette.colors.gray[50]};
  border-bottom: 1px solid ${palette.colors.gray[50]};
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    font-family: 'Patua One', cursive;
    font-size: 1.2rem;
  }

  .right {
    font-family: 'Patua One', cursive;
    font-size: 1rem;
    display: flex;
    align-items: center;
  }
`;

const UserInfo = styled.div`
  font-weight: 800;
`;

const Header = ({user, onLogout}) => {
  // console.log(user);
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">BUYCIRCLE</Link>
          {user ? (
            <div className="right">
              <UserInfo style={{marginRight: '1rem'}}>{user.username}</UserInfo>
              <Button onClick={onLogout}>LOGOUT</Button>
              <Button to="/write" orange style={{marginLeft: '0.5rem'}}>새 글 작성하기</Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login">LOGIN/REGISTER</Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
    </>
  );
};

export default Header;
