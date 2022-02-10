import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { palette } from "../../lib/styles/palette";
import Responsive from "../common/Responsive";
import SubInfo from "../common/SubInfo";
import Tags from "../common/Tags";

const PostListBlock = styled(Responsive)`
  margin-top: 0;
  .header-block {
    content: '';
    height: 100px;
  }
`;

const PostItemBlock = styled.div`
  /* font-family: 'Gowun Dodum', sans-serif; */
  padding-top: 3rem;
  padding-bottom: 3rem;
  margin-top: 1rem;
  // 맨 위 포스트는 padding-top 을 갖지않도록
  &:first-child {
    padding-top: 0;
    margin-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.colors.gray[200]};
  }

  .pay-info {
    display: flex;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    padding-top: 1rem;
    flex: 1;
    align-items: flex-start;

    &:hover {
      color: ${palette.colors.gray[600]};
    }
  }

  h4 {
    flex: 1;
    align-items: flex-end;
    text-align: right;
    color: ${palette.colors.gray[700]};
  }

  p {
    margin-top: 2rem;
    margin-bottom: 0;
  }

`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.colors.gray[800]};
  /* font-family: 'Gowun Dodum', sans-serif; */
`;

const PostItem = ({post}) => {
  const {publishedDate, user, tags, method, name, price, body, _id} = post;

  return (
    <PostItemBlock>
      <SubInfo username={user.username} publishedDate={new Date(publishedDate)} />
      <div className="pay-info">  
        <h2>
          <Link to={`/@${user.username}/${_id}`}>{name}</Link>
        </h2>
        <h4>{method}  -{price}원</h4>
      </div>
      {/* 포스트 리스트에서 이미지 안뜸 */}
      <PostContent dangerouslySetInnerHTML={{__html: body}} /> 
      <Tags tags={tags} />
    </PostItemBlock>
  );
};


const PostList = ({posts, loading, error}) => {
  // console.log(posts, "post list");

  // Infinite Scroll 구현
  const [scrollOption, setScrollOption] = useState(5); // 처음 렌더링될 포스트 갯수
  const [clientHeight, setClientHeight] = useState(0); // 이미 스크롤되어서 보이지 않는 구간의 높이
  const [scrollTop, setScrollTop] = useState(document.documentElement.scrollTop);// 사용자에게 보여지는 페이지의 높이

  const scrollHeight = document.documentElement.scrollHeight; // 페이지 총 높이

  // 스크롤하는 위치 인식 함수
  const onScroll = (e) => {
    setClientHeight(e.srcElement.scrollingElement.clientHeight); 
    setScrollTop(e.srcElement.scrollingElement.scrollTop); 
  }

  useEffect(() => { // 시작할 때 이벤트리스너 온
    window.addEventListener('scroll', onScroll)
  }, [])

  // 스크롤 할 때마다 배열에 데이터를 담아 넘ㅁ겨줌
  const data = [];
  if (posts) {
    for (let i = 0; i < scrollOption; i++) {
      data.push(posts[i])
    }
  }

  if (scrollTop + clientHeight >= scrollHeight && !loading === true) {
    setScrollOption(scrollOption + 5);
  }

  if (scrollOption > data.length) {
    window.removeEventListener('scroll', onScroll)
  }

  // 에러 발생시
  if (error) {
    console.log(error, "post list error")
    return <PostListBlock>여기서 에러가 발생했습니다.</PostListBlock>
  }

  return (
    <PostListBlock>
      <div className="header-block" />
      {/* 로딩중이 아니고, 포스트 배열이 존재할 때만 보여줌 */}
      {!loading && posts && (
        <div>
          {data.map((d) => (
            <PostItem post={d} key={d._id} />
          ))}
        </div>
      )}
    </PostListBlock>
  );
};

export default PostList;
