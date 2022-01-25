// import { readFileSync } from 'fs'
// import { resolve, dirname } from 'path'
// import { fileURLToPath } from 'url'

import adapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter({ out: 'build' }),

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    vite: {
      // strictPort: true,
      server: {
        // https: {
        //   cert: readFileSync(resolve(__dirname, '../server.crt')),
        //   key: readFileSync(resolve(__dirname, '../server.key')),
        // },
        // host: '0.0.0.0',
        // strictPort: true,
        // port: 3000,
        hmr: {
          port: 3000,
          protocol: 'ws',
        },
        // proxy: {
        //   'https://ls.localhost': {
        //     target: 'http://localhost:3001',
        //     changeOrigin: true,
        //   },
        // },
      },
    },
  },
}

export default config
