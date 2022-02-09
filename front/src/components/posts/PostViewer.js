// import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { palette } from "../../lib/styles/palette";
import Responsive from "../common/Responsive";
import SubInfo from "../common/SubInfo";
import Tags from "../common/Tags";

import receipt from "../../lib/styles/receipt3.001.jpeg";

const PostViewerBlock = styled(Responsive)`
  margin-top: 0;
  border: 1px solid white;
  height: 768px;
  background-image: url(${receipt});
  background-repeat: no-repeat;
  background-position: center;
  /* font-family: font-family: 'Gowun Dodum', sans-serif; */
`;

const PostHead = styled.div`
  /* border-bottom: 1px solid ${palette.colors.gray[200]}; */
  padding-bottom: 0;
  margin-top: 66px;
  text-align: center;

  .item {
    margin: 27px;
  }
  .item h2{
    display: inline;
  }
  .item h2:nth-child(2):before {
    content: "";
    margin: 100px;
  }

  .sub-info {
    margin-top: 181px;
  }

  .action-button {
    text-align: right;
    margin-top: 140px;
  }
`;

const PostContent = styled.div`
  font-size: 1rem;
  color: ${palette.colors.gray[800]};
  /* margin-top: 106px; */
  text-align: center;
`;

const PostViewer = ({post, error, loading, actionButtons}) => {
  // 에러 발생시
  if (error) {
    if (error.response && post.response.status === 404) {
      return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
    }
    return <PostViewerBlock>오류 발생. 개발팀에 문의하세요.</PostViewerBlock>
  }
  // console.log(post, "post viewer"); // 여기서 post 가 null 로 뜸
  // 로딩중이거나 아직 포스트 데이터가 없을 때
  if (loading || !post) {
    // console.log(loading, post);
    return null;
  }

  const {method, name, price, body, user, publishedDate, tags} = post;

  return (
    <PostViewerBlock>
      {/* <Helmet>
        <title>{name}</title>
      </Helmet> */}
      <PostHead>
        <div className="sub-info">
          <SubInfo method={method} username={user.username} publishedDate={publishedDate} hasMarginTop fontSize="true" />
        </div>
        <div className="item">
          <h2 className="name">{name}</h2>
          <h2 className="price">{price}원</h2>
        </div>
      </PostHead>
      <Tags tags={tags} center="true" />
      <PostContent dangerouslySetInnerHTML={{__html: body}} />
      {/* 그냥 작성하면 JSX 에서는 <p>, <b> 가 문자 그대로 나타나기 떄문에 dangerouslySetInnerHTML 라는 props 설정해주어야 함  */}
      <div className="action-button">{actionButtons}</div>
    </PostViewerBlock>
  );
};

export default PostViewer;
