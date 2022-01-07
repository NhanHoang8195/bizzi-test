import React, {useState} from 'react';
import BzInput from 'src/components/bzInput';
import BzButton from 'src/components/bzButton';
import './styles.scss';
import {isEmpty, loginFormValidate} from 'src/ultilities';
import {authenticationRequest} from 'src/mockApi';
import { GoogleLogin } from 'react-google-login';
import {LOCALSTORAGE_KEYS} from 'src/constants';
import {mutations} from 'src/operations/mutations';
import {Navigate, useLocation} from 'react-router-dom';
import {GoogleUserProfile} from 'src/models/googleUserProfile';
import {useAuth} from 'src/hooks/authHook';

type LocationState = {
  from: {
    pathname: string,
  },
};

function Login() {
  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
  });
  const [isSubmiting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    authenticate: '',
  });
  let location = useLocation();
  const userInfo = useAuth();
  const state = location.state as LocationState || {};
  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: '',
    })
  }

  function handleLoginSuccess(userInfo: GoogleUserProfile) {
    if (userInfo.tokenId) {
      localStorage.setItem(LOCALSTORAGE_KEYS.TOKEN, userInfo.tokenId);
    }
    mutations.updateGoogleUserInfo(userInfo);
  }

  function onHandleSubmit() {
    let validateErrors = loginFormValidate(formInput);
    setErrors({
      ...errors,
      authenticate: '',
    })
    if (isEmpty(validateErrors)) { // form without error.
      setIsSubmitting(true);
      authenticationRequest(formInput).then(res => {
        handleLoginSuccess(res);
      }).catch(e => {
        setErrors({
          ...errors,
          authenticate: e.message || e,
        })
      }).finally (() => {
        setIsSubmitting(false);
      });
    } else {
      setErrors({
        ...errors,
        ...validateErrors,
      });
    }
  }

  function onSuccess(response: any) {
    handleLoginSuccess({
      tokenId: response.tokenId,
      ...response.profileObj,
    });
  }
  function onFailure(response: any) {
    setErrors({
      ...errors,
      authenticate: response.details,
    })
  }

  if (userInfo.tokenId) {
    return <Navigate to={state?.from?.pathname || "/dashboard"} replace={true} />
  }

  return (<div className={"bz-login-container container"}>
    <form>
      <h3 className={"text-center mb-4 base-color"}>WELCOME TO BIZZI!</h3>
      <BzInput label={"Email"} name={"email"} onChange={handleChangeInput} value={formInput.email} error={errors.email} required />
      <BzInput label={"Password"} name={"password"} onChange={handleChangeInput} value={formInput.password} error={errors.password} required type={"password"} />
      {errors.authenticate && <p className={"text-danger"}>{errors.authenticate}</p>}
      <BzButton content={"Submit"} onClick={onHandleSubmit} disabled={isSubmiting} classes={{wrapper: "d-block text-end mt-1 mb-1"}} />
      <div className={"text-end"}>
        <GoogleLogin
          clientId={`${process.env.REACT_APP_GOOGLE_AUTH}`}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </form>
  </div>);
}

export default Login;