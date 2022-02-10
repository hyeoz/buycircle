import { useState } from "react";
import styled from "styled-components";
import { palette } from "../../lib/styles/palette";
import AskRemoveModal from './AskRemoveModal';

const PostActionButtonsBlock = styled.div`
  display: fixed;
  justify-content: flex-end;
  margin-top: 180px;
  margin-right: 200px;
  display: block;
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: ${palette.colors.gray[600]};
  font-weight: bold;
  border: none;
  outline: none;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    background: ${palette.colors.gray[100]};
    color: ${palette.colors.orange[700]};
  }
  & + & {
    margin-left: 0.25rem;
  }
`;

const PostActionButtons = ({onEdit, onRemove}) => {
  const [modal, setModal] = useState(false);
  const onRemoveClick = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = () => {
    setModal(false);
    onRemove();
  };

  return (
    <div>
      <PostActionButtonsBlock>
        <ActionButton onClick={onEdit}>수정</ActionButton>
        <ActionButton onClick={onRemoveClick}>삭제</ActionButton>
      </PostActionButtonsBlock>
      <AskRemoveModal visible={modal} onConfirm={onConfirm} onCancel={onCancel} />
    </div>
  );
};

export default PostActionButtons;
