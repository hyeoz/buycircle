
import { useEffect, useState } from "react";
import PostList from "./PostList";

const InfiniteScroll = ({posts, loading, error}) => {
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

  // 스크롤 맨 아래 닿았을 때
  if (scrollTop + clientHeight >= scrollHeight) {
    console.log("들어오나요?");
    // 이거 지정 안해주면 무한 리렌더링 되길래...
    // setClientHeight(clientHeight - 0.1);
    // setScrollTop(scrollTop - 0.1);
    // console.log(loading, "inside");

    if (posts) {
      for (let i = scrollOption; i < scrollOption + 5; i++) {
        data.push(posts[i])
      }
    }
    // 스크롤 맨 아래 닿으면 새로운 포스트 5개 더 보이게
    setScrollOption(scrollOption + 5);
    console.log(fetch, "outside");
    console.log(scrollOption);
    
  }

  if (scrollOption > posts.length + 5) {
    window.removeEventListener('scroll', onScroll);
  } 

  return <PostList loading={loading} error={error} posts={data}  />

}

// return 이슈
export default InfiniteScroll;