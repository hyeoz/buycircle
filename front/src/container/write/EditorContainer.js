import { useEffect, useCallback } from "react";
import Editor from "../../components/write/Editor";
import { useSelector, useDispatch } from "react-redux";
import { changeField, initialize } from "../../modules/write";

const EditorContainer = () => {
  const dispatch = useDispatch();
  const {method, name, price, body} = useSelector(({write}) => ({
    method: write.method,
    name: write.name,
    price: write.price,
    body: write.body,
  }));
  // console.log(body);
  const onChangeField = useCallback((payload) => dispatch(changeField(payload)), [dispatch],);
  // 언마운트될 때 초기화
  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return <Editor onChangeField={onChangeField} method={method} name={name} price={price} body={body} />;
}

export default EditorContainer;