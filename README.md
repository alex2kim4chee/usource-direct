# USource Direct

## Run Locally

**Prerequisites:** Node.js 22+

1. Install dependencies: `npm install`
2. Run the app: `npm run dev`
3. Build for production: `npm run build`

## GitHub Pages Deploy

This repository is configured to deploy to GitHub Pages automatically on every push to `main`.

Required repository settings:

1. GitHub repository branch: `main`
2. Pages source: `GitHub Actions`
3. Custom domain: `usourcedirect.com`

The custom domain is also stored in `public/CNAME`, so Vite copies it into `dist/CNAME` during the GitHub Actions build.

## Cloudflare DNS

For the Cloudflare zone `48260ce49d93de543531e13af9c08591`, point the apex domain to GitHub Pages:

```txt
Type: CNAME
Name: @
Target: alex2kim4chee.github.io
Proxy status: DNS only
```

If Cloudflare does not allow apex CNAME in your plan/settings, use GitHub Pages apex A/AAAA records from GitHub's current documentation.
