/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
      },
    env: {
        NEXTAUTH_SECRET: '3/4FicegR52JliIbQ6OwLvRoIVIJPioz6kD6fbYMZKk=',
        GOOGLE_CLIENT_ID: 'your client id',
        GOOGLE_CLIENT_SECRET: 'your client secret',
        AWS_ACCESS_KEY_ID: 'your aws access key id',
        AWS_SECRET_ACCESS_KEY: 'your aws secret access key',
    }
}
 
module.exports = nextConfig
