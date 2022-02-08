import { useEffect, useRef } from "react";
import styled from "styled-components";
import { palette } from "../../lib/styles/palette";
import Responsive from "../common/Responsive";
import Quill from 'quill';
// import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';

const EditorBlock = styled(Responsive)`
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const MethodInput = styled.input`
  font-family: 'Gowun Dodum', sans-serif;
  font-size: 1rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: 1px solid ${palette.colors.gray[400]};
  margin-bottom: 2rem;
  margin-right: 2rem;
`;

const NameInput = styled(MethodInput)``;

const PriceInput = styled(MethodInput)``;

// 이미지는 quill 에디터에서 처리

const QuillWrapper = styled.div`
  border-top: 1px solid ${palette.colors.gray[400]};

  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor .ql-blank:before {
    left: 0px;
  }
`;

const Editor = ({method, name, price, body, onChangeField}) => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'snow',
      placeholder: '내용을 작성하세요.',
      modules: {
        toolbar: [
          [{header: '1'}, {header: '2'}],
          ['bold', 'italic', 'underline', 'strike'],
          [{list: 'ordered'}, {list: 'bullet'}],
          ['blockquote', 'code-block', 'link', 'image'],
        ],
      },
    });

    // quill 자체 이벤트 핸들러
    const quill = quillInstance.current;
    quill.on('text-change', (delta, onDelta, source) => {
      if (source === 'user') {
        onChangeField({key: 'body', value: quill.root.innerHTML});
      }
    });
  }, [onChangeField])

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = body;
    // console.log(quillInstance.current.root);
  }, [body]);

  const onChangeMethod = (e) => {
    onChangeField({key: 'method', value: e.target.value});
  };

  const onChangeName = (e) => {
    onChangeField({key: 'name', value: e.target.value});
  };

  const onChangePrice = (e) => {
    onChangeField({key: 'price', value: e.target.value});
  };

  return (
    <EditorBlock>
      <MethodInput placeholder="결제방법을 입력하세요." onChange={onChangeMethod} value={method}  />
      <NameInput placeholder="이름을 입력하세요." onChange={onChangeName} value={name} />
      <PriceInput placeholder="가격을 입력하세요." onChange={onChangePrice} value={price} />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorBlock>
  );
};

export default Editor;
