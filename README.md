# vue-admin

## Local test
vim /util/request.js
```
//export const BASEURL = 'http://43.142.90.238:28080';
export const BASEURL = 'http://localhost:28080';
const service = axios.create({

    baseURL: 'http://localhost:28080',
    //baseURL: 'http://43.142.90.238:28080',
    // baseURL: 'https://mock.apifox.cn/m1/2428381-0-default/admin-api',

  timeout: 5000
});
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
