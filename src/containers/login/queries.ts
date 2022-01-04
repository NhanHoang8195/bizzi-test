import {gql} from '@apollo/client';

export const LOGIN_REQUEST = gql`
query LoginRequest($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
    }
}
`

export const GET_POST = gql`
query GetPost($id: ID!){
    post(id: $id) {
         id
          title
          body
    }
}
`