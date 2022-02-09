import qs from "qs";
// import { useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";

const PaginationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;
const PageNumber = styled.div``;

const buildLink = ({username, tag, page}) => {
  const query = qs.stringify({tag, page});
  return username ? `/@${username}?${query}` : `/?${query}`;
};

const Pagination = ({page, lastPage, username, tag}) => {
  // const [fetch, setFetch] = useState(false);
  // // 스크롤 감지 핸들러
  // const handleScroll = () => {
  //   const scrollHeight = document.documentElement.scrollHeight; // 페이지 총 높이
  //   const scrollTop = document.documentElement.scrollTop; // 스크롤되어서 보이지않는 높이
  //   const clientHeight = document.documentElement.clientHeight; // 사용자에게 보이는 높이

  //   if (scrollTop + clientHeight >= scrollHeight && fetch === false)
  // }

  return (
    <PaginationBlock>
      <Button disabled={page === 1} to={page === 1 ? undefined : buildLink({username, tag, page: page - 1})}>이전</Button>
      <PageNumber>{page}</PageNumber>
      <Button disabled={page === lastPage} to={page === lastPage ? undefined : buildLink({username, tag, page: page + 1})}>다음</Button>
    </PaginationBlock>
  );
};

export default Pagination;
