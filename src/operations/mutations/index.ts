import updateGoogleUserInfo from 'src/operations/mutations/updateGoogleUserInfo';
import {googleUserInfoVar} from 'src/operations/cached';

export const mutations = {
  updateGoogleUserInfo: updateGoogleUserInfo(googleUserInfoVar),
};
