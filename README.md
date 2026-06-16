This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Route selector prototype

Open [http://localhost:3000/button](http://localhost:3000/button) to view the Kathmandu bus route selector UI system prototype.

Developer documentation for the word-cloud mechanism and route-scoring model lives in [`docs/route-selector-ui-system.md`](docs/route-selector-ui-system.md).

## GitHub Pages deployment

The proposal site is configured for static export with `output: "export"` in `next.config.ts`. On GitHub Actions, the build uses the repository name as the `basePath`, so the published site can load its CSS and JavaScript from `/GPS-bus-tracking-system/`.

Every push to `main` runs `.github/workflows/deploy-pages.yml`. The workflow installs dependencies, runs `npm run build`, uploads the generated `out` directory, and deploys it to GitHub Pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
