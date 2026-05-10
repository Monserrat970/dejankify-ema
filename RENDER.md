# Wildcard Deployment Reflection

> **Note:** Rename this file to match the service you used (e.g., `RENDER.md`, `RAILWAY.md`, `NETLIFY.md`, `HEROKU.md`).

**Service Used: Render** <!-- e.g., Render, Railway, Netlify, Heroku, Coolify, etc. -->  
**Team Members: Monserrat Monzon, Ella Wright, Anica Riley** <!-- List the name(s) of who worked on this deployment -->

---

## 1. Deployment Process Overview

Describe the steps you took to deploy the Dejankify app to your chosen platform. Why did your
team choose this service? Walk through the deployment process end-to-end — how did you
configure the project, connect your repository or push your image, handle environment
variables, and verify the app was running correctly?

<!-- Write 1–2 paragraphs here -->
I looked over a couple of the services that were mentioned as quality ones. Fly charged money,
so I didn't want to do that one. Render had options for deployment by containerization or github repo.
At first, I tried to do it by container, but then switched to repo for the sake of time.
I had to get the env file from another member for the secrets, since that doesn't get pushed with the repo.
As of now, the project runs, but when you try to sign in, it puts up an error page. I'm going to fix
it though.

---

## 2. Pros and Cons

Based on your hands-on experience, what are the strengths and limitations of this platform?
How does it compare to Vercel and your containerized deployment? Consider factors like ease
of use, flexibility, documentation quality, free tier generosity, and whether you would
recommend it to another developer.

<!-- Write 1–2 paragraphs here. You may use a list to organize pros/cons if helpful. -->
Being able to deploy by container or repo is a nice feature. I didn't run up on anything that I felt limited by.
Because of the repo deployment, it's not much different from vercel's deployment. The documentation was understandable.
Since I was not paying for it, I don't know how the price compares to other services. The services don't
seem to different, so I would probably recommend the cheaper one.

---

## 3. Challenges and Surprises

What did you find unexpectedly difficult, confusing, or interesting about deploying to Render?
This could be something that didn't work as expected, a configuration quirk you had to work
around, something that impressed you, or something you wish you had known going in.

<!-- Write 1–2 paragraphs here -->
They had a paywall even though I was using the free tier. They made me input my card data, which I don't like doing.
Other than that, it was an easy service to use.

