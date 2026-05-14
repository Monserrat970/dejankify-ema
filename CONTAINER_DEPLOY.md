# Containerized Deployment to Railway

This repo is set up to deploy as a Dockerized Next.js app on Railway.

You have two database options:

- `Railway PostgreSQL`: simplest if you want everything on Railway
- `Neon PostgreSQL`: fine if your class specifically wants an external cloud Postgres provider

For this project, Railway Postgres is the easiest path.

## Architecture

- `Railway Web Service`: runs the Next.js app from the repo `Dockerfile`
- `Railway PostgreSQL` or `Neon`: stores Auth, audit sessions, analyses, and chat history
- `Prisma`: connects the app to Postgres and applies the schema
- `Google OAuth`: handles sign-in
- `Anthropic` and `PageSpeed`: power AI analysis and performance checks

## Files Used

- [Dockerfile](./Dockerfile): production container image
- [railway.toml](./railway.toml): Railway deployment settings
- [prisma/schema.prisma](./prisma/schema.prisma): database schema
- [prisma.config.ts](./prisma.config.ts): Prisma datasource config

## 1. Create a Railway Project

1. Sign in to Railway.
2. Create a new project.
3. Add a new service from your GitHub repo, or plan to deploy with the CLI.

Railway supports Dockerfile-based deploys and will use the repo `Dockerfile` when present.

## 2. Add PostgreSQL

### Option A: Railway PostgreSQL

This is the easiest option.

1. In your Railway project, click `New`.
2. Add `PostgreSQL`.
3. Railway will provision a database service and expose connection variables, including `DATABASE_URL`.

### Option B: Neon PostgreSQL

If you already created a Neon database:

1. Copy the direct connection string for Prisma CLI work.
2. Copy the pooled connection string for app runtime if you want pooling.
3. Add those values to Railway variables manually.

## 3. Set Environment Variables

Set these in your Railway web service:

- `AUTH_SECRET`
- `AUTH_URL`
- `AUTH_TRUST_HOST=true`
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`
- `ANTHROPIC_API_KEY`
- `PAGESPEED_API_KEY` (optional)
- `DAILY_ANALYSIS_LIMIT=15`
- `DAILY_COST_LIMIT_CENTS=200`

If you use Neon instead of Railway Postgres, also set:

- `DATABASE_URL`

Generate `AUTH_SECRET` with:

```bash
npx auth secret
```

For `AUTH_URL`, use your Railway public domain, for example:

```text
https://your-app-name.up.railway.app
```

## 4. Configure Google OAuth

In Google Cloud Console, add this redirect URI:

```text
https://your-app-name.up.railway.app/api/auth/callback/google
```

If you later attach a custom domain, add that callback too.

## 5. Deploy the App

### Option A: GitHub-connected deploy

1. Connect the repo to Railway.
2. Select the web service.
3. Railway will build from the `Dockerfile`.
4. On every push, Railway can auto-deploy.

### Option B: CLI deploy

```bash
npm install -g @railway/cli
railway login
railway up
```

Railway’s docs specify `railway up` for deploying your own code. `railway deploy` is for templates like PostgreSQL.

## 6. Run Prisma on Deploy

This repo includes a `preDeployCommand` in [railway.toml](./railway.toml):

```bash
npx prisma db push
```

Railway runs pre-deploy commands between build and deploy. This is the step that creates or updates the database schema before the new app version goes live.

## 7. Verify the Deployment

After deploy, check:

1. The Railway deployment becomes healthy
2. The homepage loads
3. Google sign-in works
4. Creating an audit session works
5. Analysis completes
6. Chat works

You can also inspect logs in Railway if anything fails.

## Notes

- Railway healthchecks expect an HTTP `200`. This repo uses `/` as the healthcheck path in [railway.toml](./railway.toml).
- Railway injects the `PORT` variable automatically; the app container is already configured to listen on it.
- If you use Neon, Prisma CLI commands are usually more reliable with a direct connection string rather than the pooled `-pooler` host.

## Useful Railway Docs

- Config as code: https://docs.railway.com/reference/config-as-code
- Dockerfile deploys: https://docs.railway.com/reference/dockerfiles
- Pre-deploy commands: https://docs.railway.com/guides/pre-deploy-command
- PostgreSQL: https://docs.railway.com/guides/postgresql
- Deploying with CLI: https://docs.railway.com/cli/deploying
