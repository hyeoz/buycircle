import Responsive from "../components/common/Responsive";
// import {Helmet} from 'react-helmet-async';
import EditorContainer from "../container/write/EditorContainer";
import TagBoxContainer from '../container/write/TagBoxContainer';
import WriteActionButtonsContainer from "../container/write/WriteActionButtonsContainer";


const WritePage = () => {
  return (
    <Responsive>
      {/* <Helmet>
        <title>글 작성하기</title>
      </Helmet> */}
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer />
    </Responsive>
  );
};

export default WritePage;
