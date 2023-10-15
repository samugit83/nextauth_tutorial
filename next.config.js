/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
      },
    env: {
        NEXTAUTH_SECRET: '3/4FicegR52JliIbQ6OwLvRoIVIJPioz6kD6fbYMZKk='
    }
}
 
module.exports = nextConfig
