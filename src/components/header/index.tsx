import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import BzButton from 'src/components/bzButton';
import {initialUserProfile} from 'src/operations/cached';
import {mutations} from 'src/operations/mutations';
import './styles.scss'
import {LOCALSTORAGE_KEYS} from 'src/constants';

function Header(): React.ReactElement {
  const navigate = useNavigate();
  function onLogout() {
    localStorage.removeItem(LOCALSTORAGE_KEYS.TOKEN);
    mutations.updateGoogleUserInfo(initialUserProfile);
    navigate('/login');
  }

  return (<header className={"bizzi-header p-4"}>
    <div className={"d-flex align-items-center justify-content-between"}>
      <Link className='flex-row-align-center header-logo' to={'/'}>
        <img className='img-green-logo' src={"https://bizzi.vn/wp-content/themes/bizzi-v2/dist/images/bizzy-logo_91881f6c.png"} alt='gigacover-green-logo' />
      </Link>
      <div>
        <BzButton content={<><img src={"/images/signout.svg"} alt={"signout"} />SIGN OUT</>} onClick={onLogout} classes={{btn: "border"}} />
      </div>
    </div>
  </header>);
}

export default Header;
