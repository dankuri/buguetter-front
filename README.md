# buguetter-front

this is frontend for 🥖 **buguetter** 🥖  
a twitter clone from @samaxe13 & @GrozaMorey

frontend is [TS](https://www.typescriptlang.org/) + [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)  
backend is [Flask](https://flask.palletsprojects.com/) + [Strawberry(GraphQL)](https://strawberry.rocks/) + [Postgresql](https://www.postgresql.org/)

[//]: # 'insert deployed link ^ in buguetter name'

---

roadmap:

-   [x] auth
-   [ ] profiles
-   [ ] followers
-   [ ] posts
    -   [ ] comments
    -   [x] reactions
    -   [ ] hashtags
-   [ ] feed

---

for local server:

-   if your api url is different, add file `.env.local` in project's root folder with `VITE_API_URL=<your backend url>`

-   launch development mode:

```bash
yarn
yarn dev
```

-   build and launch production mode:

```bash
yarn
yarn build
npx serve dist
```
