import styled from "styled-components";

const ResponsiveBlock = styled.div`
  width: 1080px;
  margin: 0 auto; // 가운데 정렬

  @media (max-width: 1080px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Responsive = ({children, ...rest}) => {
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
