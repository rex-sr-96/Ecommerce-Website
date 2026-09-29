# Ecommerce Web Project

This repository contains three applications:

- `BackEnd`: Express API and PostgreSQL integration
- `FrontEnd`: customer storefront built with React and Vite
- `AdminEnd`: admin interface built with React and Vite

## Local setup

Install dependencies in each application directory with `npm ci`.

Copy `BackEnd/.env.example` to `BackEnd/.env` and set valid database, JWT,
Razorpay, and (when creating an admin account) admin password values. Copy
`FrontEnd/.env.example` to `FrontEnd/.env`; update the API URL if needed. Do not
commit `.env` files.

Run each application from its directory:

```sh
# BackEnd
npm run start-dev

# FrontEnd
npm run dev

# AdminEnd
npm run dev
```

The API defaults to port 5000. Vite prints the URL for each frontend when it
starts. The `BackEnd` package currently has no test suite configured.