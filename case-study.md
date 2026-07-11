# Favdex — Case Study

**Stack:** React, Tailwind CSS, PokéAPI, localStorage  
**Live:** [favdex.vercel.app](https://favdex.vercel.app) &nbsp;|&nbsp; **Repo:** [github.com/Bijay-Codes/Favdex](https://github.com/Bijay-Codes/Favdex)

---

## Where It Started

The hardest part of this project wasn't the API, the state management, or the CSS overhauls I did twice yeah twice!. It was opening the editor and actually starting. Trying to perfect the structure and data before the project even exists wasted my efforts and time.

I had mentally planned everything. Wrote it all out. Thought that was enough but it wasn't. I sat staring at the editor until I figured out the only way to move was to just dump everything — logic, rendering, all of it — into one App.jsx and stop thinking about structure entirely. It was ugly. It worked. I started moving.

That decision to just ship the messy version first and clean it up later is probably the most useful thing I took out of this project.

---

## What I Built

A Pokédex where you can browse, filter by type, switch between normal and shiny sprites, and save Pokémon to your own Favdex by feeding them Pokémon berries. The data comes from PokéAPI with infinite scroll via IntersectionObserver — when you reach the last card, it fetches the next batch automatically.

It went through two complete CSS overhauls because the first version looked like a kid's toy and the second version I was still just slapping things on a whim. The third pass I actually sat down and read about design — proximity, visual hierarchy, F-pattern scanning, rule of thirds. That's when it started looking like something I actually wanted to ship.

---

## The Bug That Took Hours

This is the part worth talking about.

There was a bug in the search modal. If you typed a Pokémon name and pressed Enter, the modal would open and immediately close. Not always — only when the Pokémon was already cached in localStorage. If it wasn't cached and needed to be fetched, it worked fine because the fetch delay meant the timing was different.

That detail was the clue. The bug wasn't in my code specifically — it was a race condition between browser events and the HTML5 Dialog security protocol.

Here's what was actually happening:

When you press a key, the browser doesn't just fire one event. It fires `onKeyDown`, `onKeyUp`, and `onKeyPress` sequentially. I was only listening to `onKeyDown` to open the modal, but the browser kept firing the rest of the sequence regardless. The Dialog tag has a strict security rule — when it opens, it locks all background activity to prevent interaction with anything behind it. If it detects a background event running even for a millisecond after it opens, it closes itself immediately. My key event sequence was that background activity.

The reason it only happened with cached Pokémon: when data needed to be fetched, the async delay pushed the modal open *after* the key sequence had already finished. When the data was cached it was instant, so the modal opened right in the middle of the still-running key events. Race condition.

The fix was one line:

```js
event.preventDefault()
```

Stop the browser from running its default key event behavior. That's it. The modal stopped seeing background events and stayed open.

I'll be honest — I spent hours on this. I knew something was wrong but couldn't pin down what. I ended up taking help from AI to isolate it, which felt embarrassing at the time. Looking back, the debugging process itself — noticing that cached vs uncached behaved differently, using that as the clue, understanding browser event sequencing — that was the real learning. The fix being one line doesn't make the problem simple.

---

## Things I Actually Learned

**useEffect runs after paint.** Not during, not before. After. This caused so much confusion and so many rewrites early on that I lost count. Once I actually understood the execution order — script runs, DOM updates, browser paints, *then* useEffect — a lot of things clicked.

**forwardRef exists because React components aren't real DOM elements.** I needed to attach an IntersectionObserver to the last Pokémon card to trigger infinite scroll. Passing a ref as a prop doesn't work the way you'd expect because React can't tell which element inside a component you're pointing at. forwardRef lets you explicitly say "this specific element, not the component wrapper."

**Clamp is underrated.** `clamp(min, preferred, max)` does what three lines of media queries used to do for me. Smooth scaling, no breakpoints needed for text and spacing.

**Design laws aren't optional.** I thought good CSS was about knowing properties. It's actually about knowing why something looks wrong before you can fix it. Proximity, similarity, visual hierarchy — these aren't concepts you learn and forget. They're the reason a page either feels right or it doesn't and you can't explain why.
