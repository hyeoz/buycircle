import { Link } from "react-router-dom";
import styled,{css} from "styled-components";
import { palette } from "../../lib/styles/palette";

const TagsBlock = styled.div`
  margin-top: 0.5rem;
  .tag {
    display: inline-block;
    color: ${palette.colors.orange[600]};
    text-decoration: none;
    margin-right: 0.5rem;
    &:hover {
      color: ${palette.colors.orange[700]}
    }
  }
  /* 가운데 정렬 파라미터 */
  ${(props) => props.center &&
  css`
    text-align: center;
  `}
`;

const Tags = ({tags, center}) => {
  return (
    <TagsBlock center={center}>
      {tags.map((tag) => (
        <Link className="tag" to={`/?tag=${tag}`} key={tag}>
          #{tag}
        </Link>
      ))}
    </TagsBlock>
  );
};

export default Tags;
