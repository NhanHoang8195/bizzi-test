import {InMemoryCache, makeVar, ApolloCache} from '@apollo/client';
import {GoogleUserProfile, Posts, Post} from 'src/models/googleUserProfile';
import {initialUserProfile, ROOT_QUERY} from 'src/constants';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        user: {
          read () {
            return googleUserInfoVar();
          }
        },
        post: {
          read(cached, {readField, args}) {
            let posts: Posts = readField('posts') || {
              data: [],
              meta: {
                totalCount: 0,
              }
            };
            return posts.data.find((p: Post) => p.id === args?.id);
          }
        },
        posts: {
          keyArgs: false,
          merge(exsiting, coming, {args}) {
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

export function handleDeletePost(cache: ApolloCache<any>, id: string | number) {
  const normallizeId = cache.identify({__typename: 'Post', id});
  cache.evict({
    id: normallizeId,
  });
  cache.gc();
  cache.modify({
    id: ROOT_QUERY,
    fields: {
      posts({data, meta}: Posts): Posts | null {
        return {
          data: data.filter(item => item.id !== id),
          meta: {
            totalCount: meta.totalCount - 1,
          }
        }
      },
      post(): Post | null {
        return null;
      }
    }
  });
}

export function handleCreatePost(cache: ApolloCache<any>, newPost: Post) {
  cache.modify({
    id: ROOT_QUERY,
    fields: {
      posts({data, meta}: Posts): Posts | null {
        return {
          data: [...data, newPost],
          meta: {
            totalCount: meta.totalCount + 1,
          }
        }
      },
      post(cached): Post | null {
        return newPost;
      }
    }
  });
}

export function handleUpdatePost(cache: ApolloCache<any>, newPost: Post) {
  cache.modify({
    id: ROOT_QUERY,
    fields: {
      posts({data, meta}: Posts): Posts | null {
        return {
          data: [...data, newPost],
          meta: {
            totalCount: meta.totalCount + 1,
          }
        }
      },
      post(cached): Post | null {
        return newPost;
      }
    }
  });
}

export const googleUserInfoVar = makeVar<GoogleUserProfile>(initialUserProfile);
