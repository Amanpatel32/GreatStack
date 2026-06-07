// import { defineConfig } from 'vite'
// import react, { reactCompilerPreset } from '@vitejs/plugin-react'
// import babel from '@rolldown/plugin-babel'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(), tailwindcss(),
//     babel({ presets: [reactCompilerPreset()] })
//   ],
// })


import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  // PASTE THIS SERVER BLOCK HERE:
  server: {
    proxy: {
      '/api': {
        target: 'https://great-stack-server.vercel.app/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})