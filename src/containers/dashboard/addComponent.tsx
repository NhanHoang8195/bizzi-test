import React, {ChangeEvent, useState} from 'react';
import BzInput from 'src/components/bzInput';
import BzButton from 'src/components/bzButton';

type AddComponent = {
  onSubmit: (data: any) => void,
  isSubmitting?: boolean,
  errorMessage?: object|null,
  successMessage?: object|null,
}

function AddComponent(props: AddComponent) {
  const { onSubmit, isSubmitting, errorMessage, successMessage } = props;

  const [post, setPost] = useState({
    title: '',
    body: '',
  });

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  }

  return (<div className={"add-com mb-4"}>
    <BzInput value={post.title} name={"title"} label={"Title"} onChange={onChange} classes={{wrapper: "w-50"}} />
    <BzInput value={post.body} name={"body"} label={"Body"} onChange={onChange} classes={{wrapper: "w-50"}} />
    {errorMessage && <p className={"text-danger"}>Sorry! Add new post failed</p>}
    {successMessage && <p className={"text-success"}>Add new post successfully!</p>}
    <BzButton disabled={isSubmitting} content={"ADD"} onClick={() => onSubmit(post)} classes={{wrapper: "text-end w-50 d-block", btn: "btn-success"}} />
  </div>);
}

export default AddComponent;
