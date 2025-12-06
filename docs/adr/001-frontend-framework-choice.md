# ADR-001: Frontend Framework choice

**Status** Accepted

**Date** November 2024

**Last Review Date** December 2025

## Context

It's needed to choose the frontend library/framework that will not only cover functional and non-functional (at least most of them) requirements but also it should be in demand on the market (!).

The main goal is learning, practice AND getting bumps and bruises AND ONLY THEN the product development for the end user.

## Decision

The choice fell on Next.js (v14 at the moment of starting the project). In the beginning for everything (landing page, game room, admin panel). Later other options may be considered.

## Options Considered

1. Client Side React (TanStack) - Solid choice but I needed to learn something with SSR since SPA stack is already familiar to me + Next.js is more SEO friendly
2. Next.js - Selected
3. Non-React libraries (Angular, Vue) - less market demand
4. Monorepo approach with more granular selection of options above depending on the app part (landing, game, admin panel) - interesting for the learning/experiencing goals but overcomplicated for the beginning

## Consequences

### Positive

-   When the part of the app is primarily client side (the game room) Next.js is still good and doesn't add an additional overhead (in terms of performance or usage (i.e. DX))
-   Can be quite a good choice for the admin panel (not done yet) because it will be possible to leverage the full potential of RSC
-   It has good optimizations under the hood (images, fonts, package imports and tree shaking)
-   Because of the SSG and Partial Pre-rendering the app feels faster
-   You still can build SPA with additional advantages that Next.js offers
-   Good choice for SEO because of SSR
-   Meets the original set goals

### Negative

-   Slow cold dev builds without Turbopack. It takes several seconds to build a 300Kb page (maybe I'll find out how to mitigate it later)
-   Turbopack isn't stable for the game room page (investigation required)
-   There are annoying issues that you don't expect to happen. For example, after building a prod version locally it's needed to remove node_modules completely and re-install them to run "next dev" again
-   Due to the directory-based routing (app router) and supporting of the page router it's a bit challenging and _ugly_ to follow the Feature-Sliced Design (see [ADR-002: Frontend Architecture Choice](./002-frontend-architecture-choice.md))

## Notes

-   Consider using Turbopack again after upgrading to v16
-   Consider moving to monorepo approach when adding admin panel

## Related ADRs

-   [ADR-002: Frontend Architecture Choice](./002-frontend-architecture-choice.md)
