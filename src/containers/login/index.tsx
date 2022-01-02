import React, {useState} from 'react';
import BzInput from 'components/bzInput';
import BzButton from 'components/bzButton';
import './styles.scss';

function Login() {
  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
  });
  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    })
  }

  return (<div className={"bz-login-container container"}>
    <form>
      <h3 className={"text-center mb-4 base-color"}>WELCOME TO BIZZI!</h3>
      <BzInput label={"Email"} name={"email"} onChange={handleChangeInput} value={formInput.email} required />
      <BzInput label={"Password"} name={"password"} onChange={handleChangeInput} value={formInput.password} required />
      <BzButton text={"Submit"} onClick={() => {}} classes={{wrapper: "text-end mt-1"}} />
    </form>
  </div>);
}

export default Login;