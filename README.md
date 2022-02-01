# Late-Stage

Welcome to the public code repository of Late-Stage, an advocacy platform with a bias for action to denounce dark-patterns and institutions built for the systemic extraction of money from the working class.

![Late-Stage login page](.github/LoginPage.png)

# I'm here to audit the platform
First and foremost, thank you!

## I'm technical. Tell me what I need to know.
- Staging environment: https://staging.late-stage.com
- Please fork the repository and make pull requests against the `staging` branch; your changes should be visible in the sandbox when merged to `staging` and the GitHub Action has run
- Please incorporate at least one test that would fail without your code contribution
- See "Contributing Code" below

## I'm not technical. I don't know what GitHub even is.
We're happy you're here, but let's get you to the right place:

**I'd like to review new campaigns / features.**

We have a staging sandbox environment for auditors to test new features before they go live: it's https://staging.late-stage.com.

*Please note that the staging environment might not always be up or completely stable; a sandbox will routinely be created if a pre-release audit is announced on the subreddit.*

***Most importantly, please note that the sandbox does not mirror the live site proper, so anything you do in the sandbox will almost certainly be destroyed.***

# Contributing Code

## `pnpm`
You'll need to install the `pnpm` binary (https://pnpm.io/installation) in order for lockfiles and Turborepo to work correctly. `npm` scripts were written on a Mac, so if any scripts need to be refactored for use on Windows, don't hesitate to pull-request.

## The Monorepo
- The codebase is a JavaScript (TypeScript) monorepo facilitated by Turborepo, as opposed to `docker-compose`, `lerna`, or similar tools for orchestrating multiple services and managing dependencies. You're welcome to create
a `docker-compose` config for local development, but it's not being used in production.
- The web client is a server-rendered SvelteKit application. In production, it runs as a service with `@sveltejs/adapter-node`. SvelteKit endpoints are to be used exclusively as a proxy to the API; client side requests direct to the API will be (politely) rejected.
- The API is a Fastify / Mercurius GraphQL API. Prisma manages database migrations and creates a strictly-typed database client. It's tightly integrated with `type-graphql` which manages the API layer. One thing to note is that this integration *can* allow you to surface network-layer CRUD operations against database models for free, if configured in the schema. So, if you don't need any business or authorization logic around CRUD for a certain table, `type-graphql` has likely codegen'd all the CRUD you need out of the box.
  
## Local HTTPS is required
The site uses `__Host-`prefixed `HTTPOnly` cookies for authentication between two separate services; for browsers that implement cookie prefixing, this ensures the domain authenticity of the cookie (see https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies). Naturally, this introduces complexities in development environment setup you might not be used to seeing:
  - The repo sets up a reverse proxy for you in the root `Caddyfile`. `caddy` is a web server along the lines of NGINX or Apache that uses TLS by default and, upon startup, will automatically install a local certificate on your machine
  - Use https://caddyserver.com/docs/install to install the `caddy` binary that is appropriate for your machine
  - Add the line `127.0.0.1 ls.localhost` in `/etc/hosts`.
  - Start all services with `pnpm dev` from the root of the repo
  - Go to `https://ls.localhost` (short for late-stage.localhost) in your browser. Using `pnpm dev` from the root of the repo will start the `caddy` service in the background, and it'll start the `client` and `api` services in development mode. The web server will now proxy requests to the appropriate service and allow cookies between the services to be set as if they were running on the same domain.

## Create a local PostgreSQL database
- Install Postgres; on Mac, I recommend the Postgres menu bar app, which allows you to very easily start and stop the Postgres service
- Use `psql` to `CREATE DATABASE late_stage;`

## Configure local environment variables
- A `.env` file must exist at the root of both services (`api` and `client`). An `.env.example` has been provided for each to indicate how those variables should be set.

## I need to make database schema changes
- Make any changes to the Prisma schema file
- From the /apps/api directory, run `pnpm migrate:dev -- <the name of my migration>`
- Prisma will automatically migrate your local database to reflect the new changes *as faithfully as it can*. 
- If it can't fulfill your schema changes without data loss, it'll offer the options of completely resetting the database (no), or modifying the migration(s) it created to fill in any missing data.

## Testing
Stay tuned for client-side tests and E2E tests! Getting set up here is a bit of a challenge with the newness of Svelte and my flat-out refusal to use Facebook tech.

Server-side integration tests are quite extensive. You can run `pnpm test` to run the entire suite, or `FILE=<your path here> pnpm test:file` to isolate test files. Either way, the API process is spawned with `NODE_ENV=test` concurrently with the test suite. This integration test mechanism provides assurance in the fact that tests are run against the actual app (with several test environment limitations), as opposed to against stubbed Fastify instances.

When you're testing with this methodology, you're likely to write assertions against query or mutation responses, or ensuring the presence, absence, or mutation of certain database artifacts. You likely won't have luck in making unit test sorts of assertions, like whether certain functions were called with certain arguments, because the test suite and app are running on separate processes.

You're welcome to start incorporating unit tests, but it's likely to require some additional groundwork to get stubbing and mocking set up extensibly.

## A note on conscientious dependency management
This is a platform that is very much against the various institutions for extracting wealth from the working class, and I believe such dark patterns exist within the open source contributions of large tech companies. When large tech companies popularize the open-source technologies they create, they create anticompetitive skills monopolies. Facebook has created an army of React developers perfectly equipped for their recruitment needs; additionally, thousands of companies depend on Meta to continuously maintain foundational software for their businesses to run.

The reality of Node.js' ecosystem being an utterly massive tree of dependencies and the reality that big tech pioneers software development practices forces Late-Stage to draw a line somewhere: we can't write code down to the metal to skirt around utilizing code written by big tech, because, quite frankly, I don't know how, and we'd never get anything done. Currently, the line in the sand applies to direct dependencies and runnable code: SvelteKit instead of React, `uvu` instead of `jest`, Digital Ocean instead of AWS. Sure, GraphQL was a spec written by Facebook, but it's a treasured alternative to REST, it's merely a spec, and the libraries we're installing to implement that spec aren't Meta-maintained.