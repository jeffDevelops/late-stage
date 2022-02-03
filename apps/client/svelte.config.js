import adapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'
import { config as dotenv } from 'dotenv'

dotenv()

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter({
      out: 'build',
      env: {
        host: 'localhost',
        port: 'PORT',
        origin: process.env['VITE_SVELTEKIT_HOST'],
      },
    }),

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    vite: {
      server: {
        hmr: {
          port: 3000,
          protocol: 'ws',
        },
      },
    },
  },
}

export default config
