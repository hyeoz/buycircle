import { Link } from "react-router-dom";
import styled from "styled-components";
import { palette } from "../../lib/styles/palette";
import Button from "../common/Button";
import Responsive from "../common/Responsive";
import SubInfo from "../common/SubInfo";
import Tags from "../common/Tags";

const PostListBlock = styled(Responsive)`
  margin-top: 2rem;
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
  font-family: 'Gowun Dodum', sans-serif;
  padding-top: 3rem;
  padding-bottom: 3rem;
  margin-top: 1rem;
  // 맨 위 포스트는 padding-top 을 갖지않도록
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.colors.gray[200]};
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    padding-top: 1rem;
    &:hover {
      color: ${palette.colors.gray[600]};
    }
  }

  p {
    margin-top: 2rem;
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.colors.gray[800]};
  font-family: 'Gowun Dodum', sans-serif;
`;

const PostItem = ({post}) => {
  // console.log(post, "post item posts");
  const {publishedDate, user, tags, method, name, price, body, _id} = post;
  // console.log(user, "post item의 user"); 
  return (
    <PostItemBlock>
      <h2>
        <Link to={`/@${user.username}/${_id}`}>{name}</Link>
      </h2>
      <h4>{price}원 {method}</h4>
      <PostContent dangerouslySetInnerHTML={{__html: body}} />
      <SubInfo username={user.username} publishedDate={new Date(publishedDate)} />
      <Tags tags={tags} />
    </PostItemBlock>
  );
};

const PostList = ({posts, loading, error, showWriteButton}) => {
  // console.log(posts, ":posts");
  // console.log(error, ":error");
  // 에러 발생시
  if (error) {
    console.log(error, "post list error")
    return <PostListBlock>여기서 에러가 발생했습니다.</PostListBlock>
  }
  // console.log(!!showWriteButton, "showWriteButton");
  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        {/* 왜 안뜨지.. 안떠서 헤더에 옮김 */}
        <Button to="/write" orange>
          새 글 작성하기
        </Button>
      </WritePostButtonWrapper>
      {/* 로딩중이 아니고, 포스트 배열이 존재할 때만 보여줌 */}
      {!loading && posts && (
        <div>
          {posts.map((post) => (
            <PostItem post={post} key={post._id} />
          ))}
        </div>
      )}
    </PostListBlock>
  );
};

export default PostList;
