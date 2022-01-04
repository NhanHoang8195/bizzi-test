import {InMemoryCache, makeVar} from "@apollo/client";
import {GoogleUserProfile} from 'src/models/googleUserProfile';
import {LOCALSTORAGE_KEYS} from "../../constants";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        user: {
          read () {
            return {
              ...googleUserInfoVar(),
              tokenId: localStorage.getItem(LOCALSTORAGE_KEYS.TOKEN),
            };
          }
        },
      }
    }
  }
});

export const initialUserProfile: GoogleUserProfile = {
  email: "",
  familyName: "",
  givenName: "",
  googleId: "",
  imageUrl: "",
  name: "",
  tokenId: "",
}

export const googleUserInfoVar = makeVar<GoogleUserProfile>(initialUserProfile);
