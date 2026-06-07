import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bilder aus der lokalen Media-Library erlauben
  images: {
    remotePatterns: [],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
