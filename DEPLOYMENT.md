# Clayz Kiln

Pottery portfolio with bundled product photos and the original carousel animation.

Run `npm install && npm run build` to rebuild the frontend. Run `npm start` to serve the checked-in production build on `PORT` (default 10000).

The read-only catalog route reads public prices from the existing studio database. The Studio sign-in link opens the original secure editor; saved prices appear here on refresh. No credentials or database writes are accepted by this public server.

Render: Node runtime, free compute, build command `node --check server.mjs`, start command `node server.mjs`.
