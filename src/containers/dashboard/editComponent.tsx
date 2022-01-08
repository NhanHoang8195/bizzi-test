import React, {useState} from 'react';
import BzButton from 'src/components/bzButton';
import BzInput from 'src/components/bzInput';
import {Post} from 'src/models/googleUserProfile';


type EditComponentProps = {
  original: Post,
  onSave: (data: Post) => void,
};

function EditComponent(props: EditComponentProps) {
  const {original, onSave} = props;
  const [isEdit, setIsEdit] = useState(false);
  const [edittingContent, setEdittingContent] = useState(original.body);
  function onChange() {
    if (isEdit) { // user click save btn.
      onSave({
        ...original,
        body: edittingContent,
      });
    } else {

    }
    setIsEdit(!isEdit);
  }
  function onChangeContent(e: React.ChangeEvent<HTMLInputElement>) {
    setEdittingContent(e.target.value);
  }
  return <div className={"edit-com"}>
    {isEdit ? <BzInput label={""} value={edittingContent} onChange={onChangeContent} name={""} /> : <span>{edittingContent}</span>}
    <BzButton content={isEdit ? "Save" : "Edit"} onClick={onChange} classes={{btn: "btn-primary"}} />
  </div>;
}

export default EditComponent;
