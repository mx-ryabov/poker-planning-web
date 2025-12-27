# ADR-002: Frontend Architecture Design choice

**Status** Maintenance

**Date** December 2025

**Last Review Date** December 2025

## Context

Before starting this project, I had several goals, but one of the main ones was to try as many new technologies, approaches, and architectures as possible (not only on the frontend but also on the backend). Later, through practice, I would learn from my mistakes and, most importantly, draw my own conclusions—invaluable experience that I could experience firsthand, not just read about in articles. Choosing this path, I realized that at some point, I would need to abandon my previous decisions in favor of something more suitable and meaningful.

## What I tried: FSD

When choosing an architectural approach for the frontend project, I initially had little choice (let's be honest, there are no many of them). I was already familiar with classic modular architecture, but I was interested in trying out FSD (Feature-Sliced Design). Beyond the hype surrounding this architectural methodology, I was drawn to their ideas for reducing coupling and increasing cohesion by introducing the following rules and concepts:

-   Separating domain entities and features into separate layers;
-   Introducing restrictions related to cross-imports at the layer level;
-   Introducing a public API that would prohibit (accidental) imports into modules that shouldn't use them.

The ideas themselves sound quite interesting on paper. Furthermore, these rules can be controlled at the linter level (which they did), making it easier to avoid accidentally breaking them.
So, without much hesitation, I decided to give it a try. And here's what I ultimately came up with:

1. In practice, this methodology isn't as well implemented as it sounds in theory.
   For example, compared to the Clean Architecture on backend (an implementation I'm not particularly proud of, but that's not the point), I had a lot of questions about FSD, like "Where should I put this code, and what's the best way to organize this feature?". Despite the relatively short set of rules, they don't provide a clear understanding of what should be done and how. Fortunately, FSD has good documentation, with good examples, and, more importantly, an active community that generates a large number of YouTube videos, both from major conferences and from ordinary tech bloggers. Unfortunately, this led to other problems, which are discussed in the points below.

2. (Partial) abandonment of one's own rules to address other methodology issues.
   For example, first we say "we prohibit cross-imports at the layer level," then we say "let's allow them, but only at the entity level." On the one hand, compromises in development are usually normal, and it's simply one of the stages of product development (or methodology, in this case). But on the other hand, what should seemingly be strict and clear (like a clean architecture on the backend) ultimately becomes fuzzy and contradictory. The example above is not the only exception. Then I encountered the fact that by distributing entities and features across layers, I can't use them in just one (!) page, which ultimately reduces everything to a classic modular architecture. It turns out that I was trying to follow one methodology, but relying on its new rules, I followed another. And although I rather like the idea of ​​co-location, what should I do when I have another page with these co-located entities and features? Refactor? If you're writing code alone, remembering everything you've done, and you don't have deadlines, this might work, but not in other cases.

3. If we have a rule that entities and features can only contain reusable code, aren't these layers an additional complexity that the FSD should address? And let's not forget about widgets layer, which are a composite of entities and features. Ultimately, all three layers look like a slightly more structured "common" folder. This is a very rough assumption, but in abstract terms, it looks something like this.

To summarize. Perhaps this structure works well for some specific projects with specific domains, but it seems to me (at least for now, and I might change my mind) that the FSD is a particular type of modular architecture with additional rules (or rather, ideas), some of which are well suited to most projects. But not all.

## What We Learned

From the FSD experiment, we're keeping:

-   Public API pattern (barrel files) for module boundaries within pages
-   Restriction of cross-imports within pages
-   Slices within pages and "models" (ex. entities)
-   Segments within pages, but they will be re-worked
-   Shared layer but we allow direct imports for UI-kit
-   Other "ideas" from articles and their docs that are not rules but mostly good practices of the complexity management

We're abandoning:

-   Rigid layer hierarchy (entities/features/widgets)

## Decision

Ultimately, I came to the conclusion that there's no need to adhere to any specific methodology, but rather to start from basic architectural principles such as:

-   SOLID
-   Low Coupling and High Cohesion from GRASP
-   KISS, DRY, YAGNI, but with certain caveats. For example, don't create abstractions ahead of time (WET code from Dan Abramov).
    Besides this I want to follow:
-   A standard modular architecture with co-located modules
-   For UI-kit I split a specific component on state (local component's state without touching DOM at all), behvaior (everything about interactivity, i.e. where I need to interact with DOM) and UI where it's needed.

## Migration Plan

Since initially I tried to follow FSD, I've created \_src folder with entities, pages and shared directories inside. Now I want to move to the custom modular approach, but still applying some principles from FSD. For this I need the following:

1. Move all the \_src/pages to the App Router directories.
2. Put shared directory to the root.
3. Move entities to the shared directory. Consider renaming it to "models".
4. Re-structure and standartize the individual page directory.

## Notes

-   This document will evolve as migration progresses
