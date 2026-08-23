import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
 allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev']
 history: {
  type: 'memory',
  limit: 100,
  ttl: 3600,
 },
 experimental: {
  appDir: true,

}

export default nextConfig;
