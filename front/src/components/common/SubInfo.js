import { Link } from "react-router-dom";
import styled, {css} from "styled-components";
import { palette } from "../../lib/styles/palette";

const SubInfoBlock = styled.div`
  ${(props) => props.hasMarginTop &&
  css`
    margin-top: 1rem;
  `}
  color: ${palette.colors.gray[600]};
  /* 폰트사이즈 조절 파라미터 */
  ${(props) => props.fontSize &&
  css`
    font-size: 1.5rem;
  `}

  // 가운데점 보여주기
  span + span:before {
    color: ${palette.colors.gray[400]};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7'; // 가운데점 문자
  }
`;

const SubInfo = ({method, username, publishedDate, hasMarginTop, fontSize}) => {
  return (
    <SubInfoBlock hasMarginTop={hasMarginTop} fontSize={fontSize}>
      <span>{method}</span>
      <span>
        <b>
          <Link to={`/@${username}`}>{username}</Link>
        </b>
      </span>
      <span>{new Date(publishedDate).toLocaleDateString()}</span>
    </SubInfoBlock>
  );
};

export default SubInfo;
