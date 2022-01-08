# Bizzi Test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 1. How Run Project

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 2. Library dependencies
1. Apollo Grapql
2. React table
3. Bootstrap
4. Typescript
5. Scss
6. Using [GraphQLZero](https://graphqlzero.almansi.me/) for fake data

## 3. Features
1. Login/logout
1. Listing posts
2. Add new post
3. Delete a post
4. Update a post

## 4. NOTE
1. Login feature:  
- If use email/password, there is a fake calling api (delay 1s)
- Only email with `bizzi_test@bizzi.com` can login, password is free.
- All information about user getting from **Google authenticate** will be store in `Reactive Variable`.
- Token will be stored in `localStorage`

2. For Add/Delete/Update post
- Calling api but update directly on cache.

## Structure folder
**src/index.tsx**: entry point,  
**src/root.tsx**: contains routes,  
**src/containers**: contains views (there are `login` and `dashboard` view)  
**src/components**: contains common components  
**src/models**: contains interface, blusprint  
**src/styles**: contains global styles  
**src/mockApi**: contains fake api call  
**src/constants**: contains constants  
**src/ultilies**: contains common function
**src/operations**: contains cached, mutations, queries relate to `Apollo`


## Has not implemented
1. Unit test
2. Virtualized scroll for large data (because in this api only 100 records)



### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
