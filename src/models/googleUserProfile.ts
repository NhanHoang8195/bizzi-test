export interface GoogleUserProfile {
  email: string,
  familyName: string,
  givenName: string,
  googleId: string,
  imageUrl: string,
  name: string,
  tokenId: string | null,
}


export interface Post {
  id: string,
  title: string,
  body: string,
}
export interface Posts {
  data: Array<Post>,
  meta: {
    totalCount: number,
  }
}