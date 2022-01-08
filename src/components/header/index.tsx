import React from 'react';
import {Link} from 'react-router-dom';
import BzButton from 'src/components/bzButton';
import {mutations} from 'src/operations/mutations';
import './styles.scss'
import {LOCALSTORAGE_KEYS, initialUserProfile} from 'src/constants';
import {useAuth} from 'src/hooks/authHook';

function Header(): React.ReactElement {
  const userInfo = useAuth();
  function onLogout() {
    localStorage.removeItem(LOCALSTORAGE_KEYS.TOKEN);
    mutations.updateGoogleUserInfo({
      ...initialUserProfile,
      tokenId: null,
    });
  }

  return (<header className={"bizzi-header p-4"}>
    <div className={"d-flex align-items-center justify-content-between"}>
      <Link className='flex-row-align-center header-logo' to={'/'}>
        <img className='img-green-logo' src={"https://bizzi.vn/wp-content/themes/bizzi-v2/dist/images/bizzy-logo_91881f6c.png"} alt='gigacover-green-logo' />
      </Link>
      <div className={"d-flex align-items-center"}>
        <h4 className={"mb-0 mr-1 p-1"}>{userInfo.name}</h4>
        <BzButton content={<><img src={"/images/signout.svg"} alt={"signout"} />SIGN OUT</>} onClick={onLogout} classes={{wrapper: "h-100", btn: "border"}} />
      </div>
    </div>
  </header>);
}

export default Header;
