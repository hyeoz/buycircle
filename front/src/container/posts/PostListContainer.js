import React, {useEffect} from "react";
import qs from 'qs';
import { useDispatch, useSelector } from "react-redux";
import PostList from "../../components/posts/PostList";
import { listPosts } from "../../modules/posts";
import { useParams, useLocation } from "react-router";

const PostListContainer = () => {
  const dispatch = useDispatch();
  const {username} = useParams();

  const {posts, error, loading} = useSelector(
    ({posts, loading}) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading['posts.LIST_POSTS'],
    }),
  );
  
  // loading 이 왜 언디로 뜰까용
  // console.log(loading, "post list container");

  /* {pathname, search} = useLocation()
  pathname : /@hyeoz
  seach : tag=tag&page=1 
  ** scroll 로 구현
  */
  const {search} = useLocation();
  // console.log(search, params);
  useEffect(() => {
    const {tag} = qs.parse(search, {
      ignoreQueryPrefix: true,
    });
    // console.log(tag, page, username);
    dispatch(listPosts({tag, username}))
  }, [dispatch, search, username]);

  return (
    <PostList loading={loading} error={error} posts={posts} />
    // <InfiniteScroll loading={loading} error={error} posts={posts} />
  );
};

export default PostListContainer;
