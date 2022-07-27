

## Description

This is a simple web application that allows a user to submit their personal information to a cloud database.

This project was built using typescript.

## React

This project was bootstrapped with react (web framework) create-react-app. `npx create-react-app . --template typescript`

## Project Set-up

The dependencies required are all included in the `package.json` file. They will all be installed by running the `npm install` command.

To start the project run `npm start`.

## Check out the web app

click the link below

Open [Ifeanyi-student-app](https://ifeanyi-typescript-student.netlify.app/) to view it in the browser.

##  Issues

## The first issue

Correct type for `useLocation()` from react-router-dom


I ran into a type assertion issue when using `useLocation` hook from `react-router-dom`

<p>How do you specify the type of location.state in typescript? <br>
Trying to access location.state.x gives an error in typescript <br>
because location.state is of type {}.</p>

##### error

```javascript
const from = location?.state?.from?.pathname || "/";

// error
// Object is of type 'unknown'.ts(2571)
```

###### solution

```javascript
    type LocationState = {
        from: {
            pathname: string;
        };
    }

    const navigate = useNavigate();
    const location = useLocation();

    // this gets where the user came from 
    const from = (location?.state as LocationState)?.from?.pathname || "/";
```
[stackoverflow](https://stackoverflow.com/questions/61668623/react-typescript-correct-type-for-uselocation-from-react-router-dom)

## The second issue 
I did not know what type to add to the HTML form

###### solution

`React.FormEvent<HTMLFormElement>`


## The third issue 
I ran into the problem `Cannot find namespace 'UserContext'`

###### solution
Your file needs the `.tsx` extension instead of `.ts`

[stackoverflow](https://stackoverflow.com/questions/68626332/react-context-use-provider-with-context-like-contextname-provider)


## The fourth issue
I ran into a problem when I tried to install `"bootstrap"` version `5.1.3`

###### solution

#### To fix it temporarily

> Remove your `"node_modules"` folder <br>
> Remove your `"package-lock.json"` file <br>
> Add to your `"package.json"` file: `"overrides"`: `{ "autoprefixer": "10.4.5" }` <br>
> Finally, run: `npm i --save-exact`

[stackoverflow](https://stackoverflow.com/questions/72163411/react-bootstarp-warning-about-color-adjust)


## The fifth issue
I did not know how to set the headers on axios custom instance

###### error
```javascript
// Object is possibly undefined
```

###### solution

```javascript 
import { AxiosRequestConfig } from "axios";

// if the request header has not been set already, set the accessToken
    const requestIntercept = axiosPrivate.interceptors.request.use((config: AxiosRequestConfig) => {
        // check for undefined Typescript
        if (config.headers === undefined) {
            config.headers = {};
        }
        if (!config?.headers["Authorization"]) {
            config.headers["Authorization"] = `Bearer ${auth?.accessToken}`
        }
        return config
    }, (error) => {
        return Promise.reject(error)
    }
    )

```

[stackoverflow](https://stackoverflow.com/questions/70085215/how-to-fix-config-headers-authorization-object-is-possibly-undefined-when-usin)

## The sixth issue

###### error
``
 // axios Error typescript, annotation must be 'any' or 'unknown' if?
``

<p>When using try-catch block to catch an axios error, I got an error</p>

```javascript
// Catch clause variable type annotation must be 'any' or 'unknown' if specified.ts(1196)
```

<p>You cannot write a specific annotation for the catch clause variable in typescript, this is because in javascript a catch clause will catch any exception that is thrown, not just exceptions of a specified type.

In typescript, if you want to catch just a specific type of exception, you have to catch whatever is thrown, check if it is the type of exception you want to handle, and if not, throw it again.

**meaning**: check if the error that is thrown is an axios error first, before doing anything.

</p>

<p>I found four solutions</p>

###### solution 1

<p>Use AxiosError to cast error</p>

```javascript

import  { AxiosError } from 'axios';

try {
    // do some api fetch
    } catch (error) {
    const err = error as AxiosError
    // console.log(err.response?.data)
    if (!err?.response) {
        setErrMsg("No Server Response");
    } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
    } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
    } else {
        setErrMsg("Login Failed");
    }  
}
```

[stackoverflow](https://stackoverflow.com/questions/69264472/axios-error-typescript-annotation-must-be-any-or-unknown-if/)

###### solution 2

<p>Using any type</p>
<p>please note using any type is frowned upon</p>

```javascript

try {
    // do some api fetch
    } catch (err: any) {
    if (!err?.response) {
        setErrMsg("No Server Response");
    } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
    } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
    } else {
        setErrMsg("Login Failed");
    }  
}

```

[stackoverflow](https://stackoverflow.com/questions/69264472/axios-error-typescript-annotation-must-be-any-or-unknown-if)

###### solution 3

<p>check if the error is an axios error first, before doing anything</p>

```javascript
try {
    // do something
} catch (err) {
    // check if the error is an axios error
    if (axios.isAxiosError(err)) {
        // console.log(err.response?.data)
        if (!err?.response) {
            setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
            setErrMsg("Missing Username or Password");
        } else if (err.response?.status === 401) {
            setErrMsg("Unauthorized");
        } else {
            setErrMsg("Login Failed");
        } 
    } 
}
```

###### solution 4

<p>typecasting error as AxiosError and then checking if it is as an axios error </p>

```javascript 
import axios from "axios"

try {
    // do something
} catch (error){
    const err = error as AxiosError
    // check if the error is an axios error
    if (axios.isAxiosError(err)) {
        // console.log(err.response?.data)
        if (!err?.response) {
            setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
            setErrMsg("Missing Username or Password");
        } else if (err.response?.status === 401) {
            setErrMsg("Unauthorized");
        } else {
            setErrMsg("Login Failed");
        } 
    }     
}
```

[github](https://github.com/axios/axios/issues/3612#issuecomment-1046542497)


## The seventh issue

```javascript
// isAxiosError does not exist on type "AxiosCustomInstance"
```

###### solution

<p>the problem was that I am using a custom instance of axios, therefore isAxiosError does not exist on an axios custom instance</p>

```javascript
try {
    // do something
} catch (error){
    const err = error as AxiosError
    // check if the error is an axios error
    if (err.isAxiosError) {
        // console.log(err.response?.data)
        if (!err?.response) {
            setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
            setErrMsg("Missing Username or Password");
        } else if (err.response?.status === 401) {
            setErrMsg("Unauthorized");
        } else {
            setErrMsg("Login Failed");
        } 
    }     
}
```