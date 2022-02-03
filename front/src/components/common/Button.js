import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { palette } from "../../lib/styles/palette";

const buttonStyle = css`
  border: none;
  border-radius: 20%;
  font-weight: bold;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.colors.yellow[300]};
  &:hover {
    background: ${palette.colors.yellow[400]};
  }

  ${props => props.usage && css`
    background: ${palette.colors.orange[300]};
    &:hover {
      background: ${palette.colors.orange[400]};
    }
  `}

  &:disabled {
    background: ${palette.colors.gray[200]};
    color: ${palette.colors.gray[400]};
    cursor: not-allowed;
  }
`;

const StyledButton = styled.button`
  ${buttonStyle};
`;

const StyledLink = styled(Link)`
  ${buttonStyle};
`;

const Button = (props) => {
  return props.to ? (
    <StyledLink {...props} usage={props.usage ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  )
};

export default Button;
