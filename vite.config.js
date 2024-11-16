import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Set to '0.0.0.0' to make it accessible on your local network
    // port: 3001,      // Change to your desired port number
  },
  base: '/chatwave/', // Replace <repository-name> with your GitHub repo name
})
