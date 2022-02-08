// import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { palette } from "../../lib/styles/palette";
import Responsive from "../common/Responsive";
import SubInfo from "../common/SubInfo";
import Tags from "../common/Tags";

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid ${palette.colors.gray[200]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;

  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.colors.gray[800]};
`;

const PostViewer = ({post, error, loading, actionButtons}) => {
  // 에러 발생시
  if (error) {
    if (error.response && post.response.status === 404) {
      return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
    }
    return <PostViewerBlock>오류 발생. 개발팀에 문의하세요.</PostViewerBlock>
  }
  console.log(post, "post viewer");
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
        <h1>{name}</h1>
        <SubInfo username={user.username} publishedDate={publishedDate} hasMarginTop />
        <Tags tags={tags} />
      </PostHead>
      {actionButtons}
      <p>{price}원 {method}</p>
      <PostContent dangerouslySetInnerHTML={{__html: body}} />
      {/* 그냥 작성하면 JSX 에서는 <p>, <b> 가 문자 그대로 나타나기 떄문에 dangerouslySetInnerHTML 라는 props 설정해주어야 함  */}
    </PostViewerBlock>
  );
};

export default PostViewer;
