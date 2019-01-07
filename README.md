# expressjs-field-validator
Helps to validate json field values in Expressjs.

## Installation  
  	$ git clone http://10.0.0.15/6d-UI/ui-components.git
    $ cd [your project dir]
	$ npm install

## Usage guide
### Adding new menu
1. Insert the details of new menu to be added inside array `MENU_DETAILS` in `src\util\Privilages.js`.
2. Install the component to be rendered in your new route:

    ```
    $ npm i my-page
    ```

3. Open file `src\components\home\sub\Routes.js`
4. Write a constant holding `Loadable` component for loading your component to be rendered:
```js
const AsyncMyPage = Loadable({
    loader: () => import('my-page'),
    loading: Loading
});
```
5. Write your route inside `Routes` component and pass the constant in render prop
```js
    <Route exact path="/mypage" render={ () => <AsyncMyPage
          {...properties}
          url_User={CONSTANTS.USER_MGMNT}
          url_SalesHierarchy={CONSTANTS.SALES_HIERARCHY}
          url_DocType_List={CONSTANTS.DOCTYPE.LIST_URL}
          url_ChannelPartners_SearchUrl={CONSTANTS.CHANNEL_PARTNERS.SEARCH_URL}
          menuPrivilages={MENU_PRIVILIAGES.USER_MGMNT}
        />
      }
      />
```
6. Urls and other constants can be written inside `src\util\Constants.js`
### Login and logout
configure the login and logout urls as `LOGIN_URL` and `LOGOUT_URL` respectively inside `src\util\Constants.js` file

## Configuring urls
All the urls are configured inside `src\util\Constants.js`. Apart from the existing urls, user can add there own component specfic urls. The following url constants are added by default.

| property | Description
|:---------------:|-------------|
| AUTH_KEY | Auth key to be send to the BL application
| LOGIN_URL | BL login url
| LOGOUT_URL | BL logout url
| CHANGE_PSWD_URL | BL change password url
| FORGET_PSWD_URL | BL forgot/reset password url
