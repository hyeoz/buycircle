import styled from "styled-components";
import Button from "../common/Button";

const WriteActionButtonsBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
  button + button { // button next to button
    margin-left: 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  font-family: 'Gowun Dodum', sans-serif;
  height: 2.125rem;
  & + & {
    margin-left: 0.5rem;
  }
`;

const WriteActionButtons = ({onCancel, onPublish, isEdit}) => {
  return (
    <WriteActionButtonsBlock>
      <StyledButton orange onClick={onPublish}>
        포스트 {isEdit ? '수정' : '등록'}
      </StyledButton>
      <StyledButton onClick={onCancel}>취소</StyledButton>
    </WriteActionButtonsBlock>
  );
};

export default WriteActionButtons;
