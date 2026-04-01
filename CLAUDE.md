# LOTRO Crafting Calculator — Project Context

## What This App Is

An interactive single-page calculator for **Lord of the Rings Online** (LOTRO), an MMORPG. It helps players plan how many raw or refined materials they need to level up their crafting professions from any tier to any tier, covering both Proficiency and Mastery.

There is no equivalent tool that is up to date for this game. The closest was Nav's Crafting Calculator (lcc.navsplace.net), which is outdated and worked per-recipe rather than per-tier.

## Target Users

LOTRO players who want to gather materials efficiently before sitting down to craft. They want to know: "How much Copper Ore do I need to go from Apprentice to Journeyman Prospector?" or "How many leathers do I need to fully master Tailor from T1 through T16?"

---

## Domain Knowledge: LOTRO Crafting System

### Professions

There are **10 crafting professions** in LOTRO:

| Profession  | Type       | What it does                                     |
| ----------- | ---------- | ------------------------------------------------ |
| Prospector  | Gathering  | Mines ore → smelts into ingots                   |
| Forester    | Gathering  | Gathers wood → planks; processes hides → leather |
| Farmer      | Gathering  | Grows crops at farmland (vendor materials)       |
| Scholar     | Gathering  | Collects artifacts → scrolls, dyes, potions      |
| Cook        | Production | Makes food/drink buffs from farmed ingredients   |
| Jeweller    | Production | Crafts jewelry from ingots                       |
| Metalsmith  | Production | Forges heavy armour/shields from ingots          |
| Weaponsmith | Production | Forges bladed weapons from ingots                |
| Tailor      | Production | Crafts light/medium armour from leather          |
| Woodworker  | Production | Crafts bows, staves, instruments from planks     |

### Tiers

Each profession has **16 tiers** of progression:

| Tier | Name        | Proficiency XP | Mastery XP |
| ---- | ----------- | -------------- | ---------- |
| T1   | Apprentice  | 200            | 400        |
| T2   | Journeyman  | 280            | 560        |
| T3   | Expert      | 360            | 720        |
| T4   | Artisan     | 440            | 880        |
| T5   | Master      | 520            | 1,040      |
| T6   | Supreme     | 600            | 1,200      |
| T7   | Westfold    | 680            | 1,360      |
| T8   | Eastemnet   | 760            | 1,520      |
| T9   | Westemnet   | 840            | 1,680      |
| T10  | Anórien     | 840            | 1,680      |
| T11  | Doomfold    | 840            | 1,680      |
| T12  | Ironfold    | 840            | 1,680      |
| T13  | Minas Ithil | 630            | 1,260      |
| T14  | Gundabad    | 630            | 1,260      |
| T15  | Umbar       | 630            | 1,260      |
| T16  | Shagâni     | 630            | 1,260      |

Each tier has two milestones:

- **Proficiency** (bronze anvil): unlocks the next tier and enables critical success on current tier recipes.
- **Mastery** (gold anvil): must master all previous tiers before earning mastery XP on the current one. Unlocks the ability to earn mastery on the next tier.

XP is earned **only** from recipes of the current tier. You cannot earn T2 XP by crafting T1 recipes.

### Processing Recipes (Traitement)

Introduced in **Update 12 (Helm's Deep, Nov 2013)**. This is the most XP-efficient way to level production professions.

**Mechanic:**

1. Take 2 refined materials (ingots/planks/leather) → cut into 4 shavings → earn **8 XP**
2. Take 4 shavings → reassemble into 1 refined material → earn **8 XP**
3. **Net result**: 1 refined material consumed, 16 XP gained per cycle

**Availability:**

- **Jeweller, Metalsmith, Tailor, Weaponsmith, Woodworker**: processing on **ALL tiers** (T1–T16)
- **Prospector, Forester**: processing on **T10+ only**
- **Cook, Farmer, Scholar**: **no processing recipes**

This is a critical optimization. For example, a Metalsmith crafting components earns 4 XP per 2 ingots (= 2 XP/ingot). Processing earns 16 XP per 1 ingot consumed — an **8× improvement** in XP per material.

### Material Chains

Gathering professions feed production professions:

- **Prospector** (ore) → ingots → used by **Jeweller**, **Metalsmith**, **Weaponsmith**
- **Forester** (wood → planks, hides → leather) → used by **Woodworker** (planks), **Tailor** (leather)
- **Farmer** (crops) → used by **Cook**, partially by **Scholar** (dyes)

---

## Architecture & Design Decisions

### Single-File React App

The entire app is one `.jsx` file. This was intentional — the app was originally built as a Claude artifact (rendered inline in Claude.ai). To run locally, drop it into a Vite React project as `src/App.jsx`.

### Data is Hardcoded

All tier XP thresholds, material names, XP-per-craft values, and location data are embedded directly in the source. There is no external API or database. This is appropriate because:

- LOTRO crafting data changes very rarely (new tiers only with major expansions, roughly once per year)
- The LOTRO Wiki (lotro-wiki.com) is the canonical source but has no API
- Keeping data inline makes the app fully self-contained and offline-capable

### Calculation Methods

The app supports three calculation paths:

1. **Standard crafting**: `materials = ceil(xpNeeded / xpPerCraft) * matPerCraft`
2. **Production processing**: `materials = ceil(xpNeeded / 16)` — each cycle consumes 1 refined material for 16 XP
3. **Gathering processing** (T10+ Prospector/Forester): more complex — must smelt ore into ingots first (earning smelt XP), then process ingots. Uses a binary search to find minimum ore needed.

### UI Theme

Dark "parchment" aesthetic inspired by the LOTRO game UI — dark brown backgrounds, gold (#c9a84c) accents, serif fonts. Uses only inline styles (no CSS framework) since it was designed as a single-file artifact.

---

## Data Sources & Accuracy

- **XP thresholds per tier**: from LOTRO-Wiki's Prospector Mastery page and Farmer Mastery page (confirmed consistent across all professions)
- **XP per craft**: from Myndariel's crafting guides (myndariel.blogspot.com) and LOTRO-Wiki recipe indexes
- **Processing mechanic**: confirmed from multiple sources — Lotro Adventures blog (Update 12 changelog), Supergirl of Lorien blog, Michaleo's crafting guide
- **Tier names and locations**: from LOTRO-Wiki Crafting Tier page

### Known Limitations / Areas for Improvement

- **Cook and Farmer XP values are approximate.** These professions have highly variable recipes (planting a field = 6 XP, but harvesting and processing crops gives bonus XP too). The app uses 6 XP as a baseline.
- **Scholar materials are simplified.** Scholar artifact names vary widely; the app uses generic names.
- **No per-recipe breakdown.** The app calculates the minimum materials for the cheapest/most efficient path. It doesn't list every recipe and let users pick which ones to craft.
- **No critical success accounting.** Crits produce extra materials (especially for gathering professions), which would reduce actual materials needed. This is RNG-dependent and not modeled.
- **The Umbar tier (T15) can be started without completing previous tiers** (a special rule introduced with the Corsairs of Umbar expansion). The app doesn't enforce tier ordering — users simply select whichever tiers they want.

---

## Potential Enhancements

- **Multi-profession planning**: "I'm a Prospector + Metalsmith — how much ore total do I need for both?"
- **Critical success modeling**: add a crit % slider to reduce estimated materials
- **CXP boost items**: account for XP boost earrings (+25%) or store consumables (+100%)
- **Export/share**: generate a shareable URL or text summary of the plan
- **Localization**: the game has French, German, and English clients — material names differ
- **Per-recipe mode**: let users pick specific recipes instead of assuming the cheapest one
- **Persistent state**: save progress to localStorage so users can track across sessions
