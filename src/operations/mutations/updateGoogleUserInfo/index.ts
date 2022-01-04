import {ReactiveVar} from '@apollo/client';
import {GoogleUserProfile} from 'src/models/googleUserProfile';

export default function updateGoogleUserInfo(updateUserVar: ReactiveVar<GoogleUserProfile>) {
  return (userInfo: GoogleUserProfile) => {
    updateUserVar(userInfo);
  }
}