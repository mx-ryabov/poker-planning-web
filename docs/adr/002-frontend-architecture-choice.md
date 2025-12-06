# ADR-002: Frontend Architecture choice

**Status** Accepted

**Date** November 2024

**Last Review Date** December 2025

## Context

One of the main goals of starting this project is learning and self development. Especially when it comes to architecture choice. I.e. the priority should be given to something new and NOT NECESSARY suitable to the project size, team size or any other constraints that we should consider when selecting such things. The most important, it should be potentially useful for the learning goals.

## Decision

Feature-Sliced Design. It's quite popular in russian-speaking IT and offers an interesting and potentially useful set of heuristics to help monitor and manage codebase complexity (especially when it comes to large projects).

## Options Considered

1. Component-based approach (together with [LIFT](https://v17.angular.io/guide/styleguide#lift)) - the most popular and can be a good fit especially for small-mid size projects. Fits well on App Router.
2. Atomic design - controversial ()
3. Feature-Sliced Design
4. Adapted Clean Architecture
