# Vercel Deployment Reflection

**Team Members: Ella Wright** <!-- List the name(s) of who worked on this deployment -->

---

## 1. Deployment Process Overview

In order to deploy to Vercel, we first created a GitHub repository, which was forked from the original Dejankify repo. I went to Vercel, created a new project, and copy/pasted the link to our repo (because Vercel wasn't finding it with the search-repos function). After connecting Vercel to the repo, I added all of our enviornment variables from my .env file, including the Neon production database URL instead of local. I accepted the default domain, and watched Vercel build and deploy the app. I also then had to go in to my Google Cloud Console to add the redirect URLs for authentication.


---

## 2. Pros and Cons

- Pros
Deploying to Vercel was extremely simple and strightforward to set up. The only issues I encountered were unrelated to Vercel itself and were instead caused by random problems with certain aspects of the project or repo.

- Cons
The only con I experienced with Vercel was its inability to find Anica's repo, I believe because it was not under the FHU organization. Once a new repo was created under the FHU org, Vercel was able to connect and deploy it. I forgot to add my enviornment variables to Vercel, so that was a small bump in the road when I couldn't figure out why it wasn't working correctly. 
---

## 3. Challenges and Surprises

I encountered issues with port 3000 being taken by an old Docker container, but that was unrelated to Vercel. The biggest quirk was trying to figure out which kind of repo Vercel would accept without issues. I really appreciated Vercel's mostly-simple setup, but I do wish it had been a little clearer about adding environment variables. Making that part of the setup would have been helpful and would have saved me time trying to debug the situation. 