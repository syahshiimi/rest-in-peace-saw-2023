# hothouse

> cms: https://hothouse.admin.datocms.com/ [on faris@okok.services]
> 
> netlify : [on currency]
> 
> website: https://h0t.house/ [on currency]



## Development and build 

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

Site is written and built with Vue.JS 2 + Nuxt.js
For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

----
# Production set-up
1. Upload the source to a GitHub repo
2. Link a Netlify project to [1] 
3. In the Dato CMS, re-link the build-trigger hook with [2]
4. Update domain settings to repoint to [2] - `*this step is only necessary if netlify project is different from the original one in use`

 
 
 
----
