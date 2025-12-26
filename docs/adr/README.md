# Architecture Decision Records

These records describe all decisions (functional and non-functional) that were made on this project.
It mostly needed for me in the future when I ask myself why I did something and also maybe it will be useful for UI (but I'm not sure).

## When to write an ADR

Use an ADR for any decision that:

-   Is hard to change later (architecture, core libraries, data model, deployment model)
-   Has meaningful trade-offs (performance vs. simplicity, cost vs. reliability)
-   Needs to be remembered 6–24 months from now

If you can explain the decision in a single Slack message and nobody will care in 3 months, you probably don’t need an ADR.

## Template

### ADR-001: Title (what was done?)

**Status:** (Proposed / Accepted / Rejected / Superseded / Maintenance)

**Date:** 2025-12-04

#### Context

When describing the context answer these questions:

-   What problem am I solving?
-   What constraints do I have? (time, knowledge/experience, tech stack)
-   What's already in place?

Tips:

-   Avoid generic fluff like “I want the best solution.”
-   Mention measurable constraints if possible OR (in case of this project it makes sense) mention your subjective/objective opinion on why you need it for your own experience.

#### Decision

_It's clear_

#### Options Considered

_It's clear_

For each option, note:

-   Very short description
-   Pros / Cons
-   Anything disqualifying (e.g., doesn’t support needed feature)

#### Consequences

##### Positive

_It's clear_

##### Negative

_It's clear_

#### Notes / References

_Add any useful refs_
