This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Deployed App:
1. [https://occupass.hadziqrazin.com](https://occupass.hadziqrazin.com)
2. [https://occupass-hadziq.netlify.app](https://occupass-hadziq.netlify.app)

### Project Structure Overview:
1. `src/actions`: Server side fetch
2. `src/app`: App routes and pages
3. `src/components/general`: Components to be used by multiple modules/services
4. `src/components/modules`: Main client side page for a service
5. `src/components/specific`: Components for a specific service
6. `src/components/ui`: Components from shadcn

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
