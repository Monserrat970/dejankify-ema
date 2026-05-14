# Railway Deployment Reflection

**Service Used:** Railway
**Team Members:** Jazmin Monzon

---

## 1. Deployment Process Overview

To deploy Dejankify to Railway, I connected the GitHub repository and configured Railway to build the project from the existing Dockerfile. I also added a `railway.toml` file so the deployment process was written down as configuration instead of being handled only through the dashboard. The deployment depended on environment variables such as `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL`, `AUTH_TRUST_HOST`, Google OAuth credentials, and the Anthropic API key. Since the app uses Prisma, Railway also had to run `npx prisma db push` before starting the app so the database schema existed in production.

The successful deployment required debugging both the build container and the service configuration. First, Prisma needed to be able to generate during build without failing when a live database URL was unavailable. Then the runtime image had to include `prisma.config.ts`, because the pre-deploy Prisma command runs inside that deploy container. Finally, the app service itself needed a real `DATABASE_URL`; otherwise Prisma would fall back to a placeholder and fail to connect. Once those issues were fixed, Railway was able to deploy the project successfully.

## 2. Pros and Cons

Railway’s biggest strength is that it offers a middle ground between Vercel and a fully manual container host. It is easier than managing raw infrastructure, but still gives more control over Docker-based deployments, pre-deploy commands, and service configuration. It also fits well when an application has both a web service and a database dependency, because the platform is built around services rather than just frontend hosting.

The main drawback is that Railway is less automatic than Vercel, especially for students who are newer to deployment. It is easy to miss something important, such as forgetting to add environment variables to the app service itself, confusing the database service with the web service, or assuming an informational log line is the actual failure. In practice, Railway gives more flexibility, but it also demands a clearer understanding of how the deployment is structured.

## 3. Challenges and Surprises

The biggest challenge was Prisma. Several failures looked like generic deployment problems at first, but the real issue was that the database setup command was running without the correct runtime configuration. One failure happened because the deploy image did not include `prisma.config.ts`. Another happened because the app service did not have a real `DATABASE_URL`, so Prisma tried to connect to a placeholder localhost address instead. Those problems were not obvious until I carefully read the deployment logs.

One interesting surprise was how much the debugging process depended on distinguishing between real errors and harmless messages. For example, the npm “new major version available” message looked serious at first, but it was only a notice and not the reason the deploy failed. The actual errors were related to Prisma and missing environment variables. That experience made it clear that successful deployment is as much about reading logs carefully and understanding services as it is about writing code.
