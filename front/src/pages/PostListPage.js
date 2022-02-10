// import Header from "../components/common/Header"
import HeaderContainer from "../container/common/HeaderContainer";
import PostListContainer from '../container/posts/PostListContainer';
// import InfiniteScroll from "../components/posts/Scroll";

const PostListPage = () => {
  return (
    <div>
      <HeaderContainer />
      <PostListContainer />
      {/* <InfiniteScroll /> */}
    </div>
  );
};

export default PostListPage;
