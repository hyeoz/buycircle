import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { palette } from "../../lib/styles/palette";

const buttonStyle = css`
  font-family: 'Patua One', cursive;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 18px;
  padding: 1px 3px;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.colors.yellow[300]};
  &:hover {
    background: ${palette.colors.yellow[400]};
  }

  ${props => props.usage && css`
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    width: 100%;
    font-size: 1.125rem;
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
