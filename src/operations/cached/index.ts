import {InMemoryCache, makeVar} from '@apollo/client';
import {GoogleUserProfile} from 'src/models/googleUserProfile';
import {initialUserProfile} from 'src/constants';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        user: {
          read () {
            return googleUserInfoVar();
          }
        },
        posts: {
          keyArgs: false,
          merge(exsiting, coming) {
            return {
              data: exsiting ? [...exsiting.data, ...coming.data]: [...coming.data],
              meta: {
                totalCount: coming.meta?.totalCount,
              }
            }
          }
        }
      }
    }
  }
});

export const googleUserInfoVar = makeVar<GoogleUserProfile>(initialUserProfile);
