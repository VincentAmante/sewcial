# Sewcial

Sewcial is a project made by students studying in Bath Spa University - RAK.
This is the website for the conceptual business.

[Link to Website](https://www.sewcial.space/)

Technologies used:

- [TypeScript](https://www.typescriptlang.org/)
- [Nuxt 3](https://nuxt.com)
- Prisma ORM
- nuxt-auth
- tRPC 10
- Tailwind CSS
- SCSS (for old sewcial code support)

## Set Up

```bash
npm install
npx prisma generate
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Recommended Extensions (on top of the ones from sewcial)

- [Tailwind IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

- [Inline Fold (for hiding long Tailwind Classes)](https://marketplace.visualstudio.com/items?itemName=moalamri.inline-fold)
- [Alternative: Tailwind Fold (Much newer but better imo)](https://marketplace.visualstudio.com/items?itemName=stivo.tailwind-fold)
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
- [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)

## Conceptual Difference between Nuxt3 and Vue3

Nuxt is a framework that is built on Vue. The key difference is that Nuxt performs what is called 'Universal Rendering'. This renders content on a server-side environment, which allows the back-end functionality that Sewcial requires. This differs from Vue which runs as a Single-Page Application, where all the content is rendered on the user's browser. Nuxt bridges its serverside rendering with Vue's client-rendering by *also* running some javascript on the client browser after sending the generated HTML content. This concept (called Hydration) allows the same SinglePage experience while still allowing space for server-side code.

### 3D Scene Setup

Assets are defined in `public/Experience`, where models and textures can be found
The code for everything ThreeJS-related is found in `src/Experience`.
`Experience/World/World.ts` and `Experience/World/Room.ts` is an insight into how objects are added into the world.
`Experience/Utils/assets.ts` and `Experience/Utils/Resources.ts` will show you how the assets are loaded.

## Structural Difference between Nuxt3 and Vue3 (for Front End Devs migrating from old repo)

All your Vue code will run without crash in Nuxt3. A few differences persists though that may change how you work.

- Auto-imports: Common vue imports (such as ref, computed, etc.) and components no longer need to be manually imported. Simply use them in your file and they will automatically import.
- Project file structure has changed, path-wise though it seems to make no difference
- Pages are defined in `/pages`, their name and path inside the folder will define their path in the url. `/pages/test/icen.vue` translates to `/test/icen` in the url
- sub-folders in the pages directory with an `index.vue` file become visitable, `pages/events/index.vue` becomes visitable with the url `/events`
- HYDRATION: The concept of hydration may cause issues with your pages, hydration mismatches are the result of incorrect HTML hierarchies (such as `<li>` not placed under a `<ul>` tag). To fix you may either fix your HTML hierarchy or wrap the offending HTML inside a `<ClientOnly>` tag, where it will only render client-side like in Vue.
- Nuxt Layouts allow for re-usable page structures. For now, however, this is the new method of defining whether a page is a *'shop'* page. All other pages will follow a default layout.
  - To override, paste this code in the page's script tag:

  - ```js
        definePageMeta({
        layout: 'shop'
        })
        ```

- eslinting for universally formatted code, a lot of errors will exist that will go away on save
  - If some remain, not all erorrs crash the app, do fix if convenient
