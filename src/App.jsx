import { useState, useMemo } from "react";

const TIERS = [
  { id: 1, name: "Apprentice", prof: 200, mastery: 400 },
  { id: 2, name: "Journeyman", prof: 280, mastery: 560 },
  { id: 3, name: "Expert", prof: 360, mastery: 720 },
  { id: 4, name: "Artisan", prof: 440, mastery: 880 },
  { id: 5, name: "Master", prof: 520, mastery: 1040 },
  { id: 6, name: "Supreme", prof: 600, mastery: 1200 },
  { id: 7, name: "Westfold", prof: 680, mastery: 1360 },
  { id: 8, name: "Eastemnet", prof: 760, mastery: 1520 },
  { id: 9, name: "Westemnet", prof: 840, mastery: 1680 },
  { id: 10, name: "Anórien", prof: 840, mastery: 1680 },
  { id: 11, name: "Doomfold", prof: 840, mastery: 1680 },
  { id: 12, name: "Ironfold", prof: 840, mastery: 1680 },
  { id: 13, name: "Minas Ithil", prof: 630, mastery: 1260 },
  { id: 14, name: "Gundabad", prof: 630, mastery: 1260 },
  { id: 15, name: "Umbar", prof: 630, mastery: 1260 },
  { id: 16, name: "Shagâni", prof: 630, mastery: 1260 },
];

const makeTiers = (materials, processingAllTiers, processingT10Plus) => {
  const t = {};
  materials.forEach((m, i) => {
    t[i + 1] = { ...m, hasProcessing: processingAllTiers || (processingT10Plus && i + 1 >= 10) };
  });
  return t;
};

const PROFESSIONS = {
  Prospector: {
    type: "gathering", icon: "⛏️", desc: "Mines ore and smelts ingots", processingType: "gathering",
    tiers: makeTiers([
      { material: "Copper Ore", refined: "Copper Ingot", matPerCraft: 2, xpPerCraft: 8, locations: "Ered Luin, Shire, Bree-land" },
      { material: "Barrow-iron Ore", refined: "Barrow-iron Ingot", matPerCraft: 2, xpPerCraft: 8, locations: "Bree-land, Lone-lands, North Downs" },
      { material: "Rich Iron Ore", refined: "Rich Iron Ingot", matPerCraft: 2, xpPerCraft: 8, locations: "Lone-lands, North Downs, Evendim, Trollshaws" },
      { material: "Dwarf-iron Ore", refined: "Dwarf-iron Ingot", matPerCraft: 2, xpPerCraft: 8, locations: "Trollshaws, Misty Mountains, Angmar" },
      { material: "Ancient Iron Ore", refined: "Ancient Iron Ingot", matPerCraft: 2, xpPerCraft: 8, locations: "Misty Mountains, Angmar, Forochel, Eregion" },
      { material: "Khazâd Skarn", refined: "Khazâd-copper Ingot", matPerCraft: 2, xpPerCraft: 8, locations: "Eregion, Moria, Lothlórien, Mirkwood" },
      { material: "Calenard Skarn", refined: "Calenard Ingot", matPerCraft: 2, xpPerCraft: 6, locations: "Dunland, Great River" },
      { material: "Riddermark Skarn", refined: "Riddermark Ingot", matPerCraft: 2, xpPerCraft: 6, locations: "East Rohan, Wildermore" },
      { material: "Eorlingas Skarn", refined: "Eorlingas Ingot", matPerCraft: 2, xpPerCraft: 6, locations: "West Rohan, West Gondor" },
      { material: "Anórien Skarn", refined: "Anórien Ingot", matPerCraft: 2, xpPerCraft: 8, locations: "East Gondor, Old Anórien, Ithilien" },
      { material: "Doomfold Skarn", refined: "Doomfold Ingot", matPerCraft: 2, xpPerCraft: 6, locations: "Gorgoroth, Eryn Lasgalen" },
      { material: "Ironfold Skarn", refined: "Ironfold Ingot", matPerCraft: 2, xpPerCraft: 6, locations: "Iron Hills, Ered Mithrin, Vales of Anduin" },
      { material: "Minas Ithil Skarn", refined: "Minas Ithil Ingot", matPerCraft: 2, xpPerCraft: 6, locations: "Minas Morgul, Langflood, Elderslade" },
      { material: "Gundabad Skarn", refined: "Gundabad Ingot", matPerCraft: 2, xpPerCraft: 6, locations: "Gundabad" },
      { material: "Umbar Ore", refined: "Umbar Ingot", matPerCraft: 2, xpPerCraft: 6, locations: "Cape of Umbar, Shield Isles" },
      { material: "Shagâni Ore", refined: "Shagâni Ingot", matPerCraft: 2, xpPerCraft: 6, locations: "Ettenmoors, Mûr Ghala" },
    ], false, true),
  },
  Forester: {
    type: "gathering", icon: "🪓", desc: "Gathers wood and processes hides", processingType: "gathering",
    tiers: makeTiers([
      { material: "Rowan Wood", refined: "Rowan Plank", matPerCraft: 2, xpPerCraft: 8, locations: "Ered Luin, Shire, Bree-land" },
      { material: "Ash Wood", refined: "Ash Plank", matPerCraft: 2, xpPerCraft: 8, locations: "Bree-land, Lone-lands, North Downs" },
      { material: "Yew Wood", refined: "Yew Plank", matPerCraft: 2, xpPerCraft: 8, locations: "Lone-lands, North Downs, Evendim, Trollshaws" },
      { material: "Lebethron Wood", refined: "Lebethron Plank", matPerCraft: 2, xpPerCraft: 8, locations: "Trollshaws, Misty Mountains, Angmar" },
      { material: "Ilex Wood", refined: "Ilex Plank", matPerCraft: 2, xpPerCraft: 8, locations: "Misty Mountains, Angmar, Forochel, Eregion" },
      { material: "Mallorn Wood", refined: "Mallorn Plank", matPerCraft: 2, xpPerCraft: 8, locations: "Moria, Lothlórien, Mirkwood" },
      { material: "Birch Wood", refined: "Birch Plank", matPerCraft: 2, xpPerCraft: 6, locations: "Dunland, Great River" },
      { material: "Oak Wood", refined: "Oak Plank", matPerCraft: 2, xpPerCraft: 6, locations: "East Rohan, Wildermore" },
      { material: "Walnut Wood", refined: "Walnut Plank", matPerCraft: 2, xpPerCraft: 6, locations: "West Rohan, West Gondor" },
      { material: "Anórien Wood", refined: "Anórien Plank", matPerCraft: 2, xpPerCraft: 8, locations: "East Gondor, Old Anórien" },
      { material: "Doomfold Wood", refined: "Doomfold Plank", matPerCraft: 2, xpPerCraft: 6, locations: "Gorgoroth, Eryn Lasgalen" },
      { material: "Ironfold Wood", refined: "Ironfold Plank", matPerCraft: 2, xpPerCraft: 6, locations: "Iron Hills, Ered Mithrin" },
      { material: "Black Ash Wood", refined: "Black Ash Plank", matPerCraft: 2, xpPerCraft: 6, locations: "Mordor Besieged, Langflood" },
      { material: "Gundabad Wood", refined: "Gundabad Plank", matPerCraft: 2, xpPerCraft: 6, locations: "Gundabad" },
      { material: "Umbar Wood", refined: "Umbar Plank", matPerCraft: 2, xpPerCraft: 6, locations: "Cape of Umbar, Shield Isles" },
      { material: "Teak Wood", refined: "Teak Plank", matPerCraft: 2, xpPerCraft: 6, locations: "Ettenmoors, Mûr Ghala" },
    ], false, true),
  },
  Farmer: {
    type: "gathering", icon: "🌾", desc: "Grows crops for Cooks and Scholars", processingType: "none",
    tiers: makeTiers(Array.from({ length: 16 }, (_, i) => {
      const names = ["Apprentice","Journeyman","Expert","Artisan","Master","Supreme","Westfold","Eastemnet","Westemnet","Anórien","Doomfold","Ironfold","Minas Ithil","Gundabad","Umbar","Shagâni"];
      return { material: `${names[i]} Crop Seed + Water + Fertilizer`, refined: `${names[i]} Field`, matPerCraft: 1, xpPerCraft: 6, locations: "Any Farmland", note: "Each field = 1 seed + 1 water + 1 fertilizer from vendor. Harvest crops for bonus XP." };
    }), false, false),
  },
  Scholar: {
    type: "gathering", icon: "📜", desc: "Researches lore, makes scrolls and dyes", processingType: "none",
    tiers: makeTiers([
      { material: "Faded Scrap of Text", refined: "Worn Tablet Fragment", matPerCraft: 2, xpPerCraft: 6, locations: "Ered Luin, Shire, Bree-land" },
      { material: "Tattered Khuzdul Parchment", refined: "Faded Sindarin Passage", matPerCraft: 2, xpPerCraft: 6, locations: "Bree-land, Lone-lands, North Downs" },
      { material: "Long-lost Second Age Text", refined: "Undeciphered Moon-letter", matPerCraft: 2, xpPerCraft: 6, locations: "Lone-lands, North Downs, Evendim" },
      { material: "Torn Scholar's Journal", refined: "Rune-carved Tablet", matPerCraft: 2, xpPerCraft: 6, locations: "Trollshaws, Misty Mountains, Angmar" },
      { material: "Battered Arnorian Tome", refined: "Ornate Scroll", matPerCraft: 2, xpPerCraft: 6, locations: "Misty Mountains, Angmar, Forochel" },
      { material: "Khuzdul Tablet", refined: "Moria Relic", matPerCraft: 2, xpPerCraft: 6, locations: "Eregion, Moria, Lothlórien" },
      { material: "Westfold Artifact", refined: "Westfold Device", matPerCraft: 2, xpPerCraft: 6, locations: "Dunland, Great River" },
      { material: "Eastemnet Artifact", refined: "Eastemnet Device", matPerCraft: 2, xpPerCraft: 6, locations: "East Rohan, Wildermore" },
      { material: "Westemnet Artifact", refined: "Westemnet Device", matPerCraft: 2, xpPerCraft: 6, locations: "West Rohan, West Gondor" },
      { material: "Anórien Artifact", refined: "Anórien Device", matPerCraft: 2, xpPerCraft: 6, locations: "East Gondor, Old Anórien" },
      { material: "Doomfold Artifact", refined: "Doomfold Device", matPerCraft: 2, xpPerCraft: 6, locations: "Gorgoroth, Eryn Lasgalen" },
      { material: "Ironfold Artifact", refined: "Ironfold Device", matPerCraft: 2, xpPerCraft: 6, locations: "Iron Hills, Ered Mithrin" },
      { material: "Ithil Artifact", refined: "Ithil Device", matPerCraft: 2, xpPerCraft: 6, locations: "Minas Morgul, Langflood" },
      { material: "Gundabad Artifact", refined: "Gundabad Device", matPerCraft: 2, xpPerCraft: 6, locations: "Gundabad" },
      { material: "Umbar Artifact", refined: "Umbar Device", matPerCraft: 2, xpPerCraft: 6, locations: "Cape of Umbar" },
      { material: "Desert Artifact", refined: "Shagâni Device", matPerCraft: 2, xpPerCraft: 6, locations: "Ettenmoors, Mûr Ghala" },
    ], false, false),
  },
  Cook: {
    type: "production", icon: "🍖", desc: "Prepares food and drink buffs", processingType: "none",
    tiers: makeTiers(Array.from({ length: 16 }, (_, i) => {
      const names = ["Apprentice","Journeyman","Expert","Artisan","Master","Supreme","Westfold","Eastemnet","Westemnet","Anórien","Doomfold","Ironfold","Minas Ithil","Gundabad","Umbar","Shagâni"];
      return { material: "Ingredients (vendor + farmed)", refined: `${names[i]} Food`, matPerCraft: 1, xpPerCraft: 6, locations: "Vendor + Farmer crops", note: "Recipes vary: buy vendor ingredients + use farmed crops" };
    }), false, false),
  },
  Jeweller: {
    type: "production", icon: "💎", desc: "Crafts rings, earrings, necklaces, bracelets", processingType: "production",
    tiers: makeTiers([
      { material: "Copper Ingot", refined: "Copper Ingot", matPerCraft: 1, xpPerCraft: 6, locations: "From Prospector (T1)" },
      { material: "Barrow-iron Ingot", refined: "Barrow-iron Ingot", matPerCraft: 1, xpPerCraft: 6, locations: "From Prospector (T2)" },
      { material: "Rich Iron Ingot", refined: "Rich Iron Ingot", matPerCraft: 1, xpPerCraft: 6, locations: "From Prospector (T3)" },
      { material: "Dwarf-iron Ingot", refined: "Dwarf-iron Ingot", matPerCraft: 1, xpPerCraft: 6, locations: "From Prospector (T4)" },
      { material: "Ancient Iron Ingot", refined: "Ancient Iron Ingot", matPerCraft: 1, xpPerCraft: 6, locations: "From Prospector (T5)" },
      { material: "Khazâd Ingot", refined: "Khazâd Ingot", matPerCraft: 1, xpPerCraft: 6, locations: "From Prospector (T6)" },
      { material: "Calenard Ingot", refined: "Calenard Ingot", matPerCraft: 1, xpPerCraft: 6, locations: "From Prospector (T7)" },
      { material: "Riddermark Ingot", refined: "Riddermark Ingot", matPerCraft: 1, xpPerCraft: 6, locations: "From Prospector (T8)" },
      { material: "Eorlingas Ingot", refined: "Eorlingas Ingot", matPerCraft: 1, xpPerCraft: 6, locations: "From Prospector (T9)" },
      { material: "Anórien Ingot", refined: "Anórien Ingot", matPerCraft: 1, xpPerCraft: 8, locations: "From Prospector (T10)" },
      { material: "Doomfold Ingot", refined: "Doomfold Ingot", matPerCraft: 1, xpPerCraft: 6, locations: "From Prospector (T11)" },
      { material: "Ironfold Ingot", refined: "Ironfold Ingot", matPerCraft: 1, xpPerCraft: 6, locations: "From Prospector (T12)" },
      { material: "Minas Ithil Ingot", refined: "Minas Ithil Ingot", matPerCraft: 1, xpPerCraft: 6, locations: "From Prospector (T13)" },
      { material: "Gundabad Ingot", refined: "Gundabad Ingot", matPerCraft: 1, xpPerCraft: 6, locations: "From Prospector (T14)" },
      { material: "Umbar Ingot", refined: "Umbar Ingot", matPerCraft: 1, xpPerCraft: 6, locations: "From Prospector (T15)" },
      { material: "Shagâni Ingot", refined: "Shagâni Ingot", matPerCraft: 1, xpPerCraft: 6, locations: "From Prospector (T16)" },
    ], true, false),
  },
  Metalsmith: {
    type: "production", icon: "🛡️", desc: "Forges heavy armour and shields", processingType: "production",
    tiers: makeTiers([
      { material: "Copper Ingot", refined: "Copper Ingot", matPerCraft: 2, xpPerCraft: 4, locations: "From Prospector (T1)", note: "Components: 2 ingots = 4 XP. Processing: 1 ingot = 16 XP" },
      { material: "Barrow-iron Ingot", refined: "Barrow-iron Ingot", matPerCraft: 2, xpPerCraft: 4, locations: "From Prospector (T2)" },
      { material: "Rich Iron Ingot", refined: "Rich Iron Ingot", matPerCraft: 2, xpPerCraft: 4, locations: "From Prospector (T3)" },
      { material: "Dwarf-iron Ingot", refined: "Dwarf-iron Ingot", matPerCraft: 2, xpPerCraft: 4, locations: "From Prospector (T4)" },
      { material: "Ancient Iron Ingot", refined: "Ancient Iron Ingot", matPerCraft: 2, xpPerCraft: 4, locations: "From Prospector (T5)" },
      { material: "Khazâd Ingot", refined: "Khazâd Ingot", matPerCraft: 2, xpPerCraft: 4, locations: "From Prospector (T6)" },
      { material: "Calenard Ingot", refined: "Calenard Ingot", matPerCraft: 2, xpPerCraft: 4, locations: "From Prospector (T7)" },
      { material: "Riddermark Ingot", refined: "Riddermark Ingot", matPerCraft: 2, xpPerCraft: 4, locations: "From Prospector (T8)" },
      { material: "Eorlingas Ingot", refined: "Eorlingas Ingot", matPerCraft: 2, xpPerCraft: 4, locations: "From Prospector (T9)" },
      { material: "Anórien Ingot", refined: "Anórien Ingot", matPerCraft: 2, xpPerCraft: 8, locations: "From Prospector (T10)" },
      { material: "Doomfold Ingot", refined: "Doomfold Ingot", matPerCraft: 2, xpPerCraft: 8, locations: "From Prospector (T11)" },
      { material: "Ironfold Ingot", refined: "Ironfold Ingot", matPerCraft: 2, xpPerCraft: 8, locations: "From Prospector (T12)" },
      { material: "Minas Ithil Ingot", refined: "Minas Ithil Ingot", matPerCraft: 2, xpPerCraft: 8, locations: "From Prospector (T13)" },
      { material: "Gundabad Ingot", refined: "Gundabad Ingot", matPerCraft: 2, xpPerCraft: 8, locations: "From Prospector (T14)" },
      { material: "Umbar Ingot", refined: "Umbar Ingot", matPerCraft: 2, xpPerCraft: 8, locations: "From Prospector (T15)" },
      { material: "Shagâni Ingot", refined: "Shagâni Ingot", matPerCraft: 2, xpPerCraft: 8, locations: "From Prospector (T16)" },
    ], true, false),
  },
  Weaponsmith: {
    type: "production", icon: "⚔️", desc: "Forges bladed weapons", processingType: "production",
    tiers: makeTiers([
      { material: "Copper Ingot", refined: "Copper Ingot", matPerCraft: 2, xpPerCraft: 4, locations: "From Prospector (T1)" },
      { material: "Barrow-iron Ingot", refined: "Barrow-iron Ingot", matPerCraft: 2, xpPerCraft: 4, locations: "From Prospector (T2)" },
      { material: "Rich Iron Ingot", refined: "Rich Iron Ingot", matPerCraft: 2, xpPerCraft: 4, locations: "From Prospector (T3)" },
      { material: "Dwarf-iron Ingot", refined: "Dwarf-iron Ingot", matPerCraft: 2, xpPerCraft: 4, locations: "From Prospector (T4)" },
      { material: "Ancient Iron Ingot", refined: "Ancient Iron Ingot", matPerCraft: 2, xpPerCraft: 4, locations: "From Prospector (T5)" },
      { material: "Khazâd Ingot", refined: "Khazâd Ingot", matPerCraft: 2, xpPerCraft: 4, locations: "From Prospector (T6)" },
      { material: "Calenard Ingot", refined: "Calenard Ingot", matPerCraft: 2, xpPerCraft: 4, locations: "From Prospector (T7)" },
      { material: "Riddermark Ingot", refined: "Riddermark Ingot", matPerCraft: 2, xpPerCraft: 4, locations: "From Prospector (T8)" },
      { material: "Eorlingas Ingot", refined: "Eorlingas Ingot", matPerCraft: 2, xpPerCraft: 4, locations: "From Prospector (T9)" },
      { material: "Anórien Ingot", refined: "Anórien Ingot", matPerCraft: 2, xpPerCraft: 8, locations: "From Prospector (T10)" },
      { material: "Doomfold Ingot", refined: "Doomfold Ingot", matPerCraft: 2, xpPerCraft: 8, locations: "From Prospector (T11)" },
      { material: "Ironfold Ingot", refined: "Ironfold Ingot", matPerCraft: 2, xpPerCraft: 8, locations: "From Prospector (T12)" },
      { material: "Minas Ithil Ingot", refined: "Minas Ithil Ingot", matPerCraft: 2, xpPerCraft: 8, locations: "From Prospector (T13)" },
      { material: "Gundabad Ingot", refined: "Gundabad Ingot", matPerCraft: 2, xpPerCraft: 8, locations: "From Prospector (T14)" },
      { material: "Umbar Ingot", refined: "Umbar Ingot", matPerCraft: 2, xpPerCraft: 8, locations: "From Prospector (T15)" },
      { material: "Shagâni Ingot", refined: "Shagâni Ingot", matPerCraft: 2, xpPerCraft: 8, locations: "From Prospector (T16)" },
    ], true, false),
  },
  Tailor: {
    type: "production", icon: "🧵", desc: "Crafts light and medium armour, cloaks", processingType: "production",
    tiers: makeTiers([
      { material: "Brushed Light Hide (leather)", refined: "Light Leather", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T1)", note: "Hides from mobs → Forester processes into leather" },
      { material: "Brushed Medium Hide (leather)", refined: "Medium Leather", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T2)" },
      { material: "Brushed Sturdy Hide (leather)", refined: "Sturdy Leather", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T3)" },
      { material: "Brushed Pristine Hide (leather)", refined: "Pristine Leather", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T4)" },
      { material: "Brushed Exceptional Hide (leather)", refined: "Exceptional Leather", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T5)" },
      { material: "Brushed Extraordinary Hide (leather)", refined: "Extraordinary Leather", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T6)" },
      { material: "Calenard Leather", refined: "Calenard Leather", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T7)" },
      { material: "Riddermark Leather", refined: "Riddermark Leather", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T8)" },
      { material: "Eorlingas Leather", refined: "Eorlingas Leather", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T9)" },
      { material: "Anórien Leather", refined: "Anórien Leather", matPerCraft: 1, xpPerCraft: 8, locations: "From Forester (T10)" },
      { material: "Doomfold Leather", refined: "Doomfold Leather", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T11)" },
      { material: "Ironfold Leather", refined: "Ironfold Leather", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T12)" },
      { material: "Ithil Leather", refined: "Ithil Leather", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T13)" },
      { material: "Gundabad Leather", refined: "Gundabad Leather", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T14)" },
      { material: "Umbar Leather", refined: "Umbar Leather", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T15)" },
      { material: "Shagâni Leather", refined: "Shagâni Leather", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T16)" },
    ], true, false),
  },
  Woodworker: {
    type: "production", icon: "🏹", desc: "Crafts bows, staves, spears, instruments", processingType: "production",
    tiers: makeTiers([
      { material: "Rowan Plank", refined: "Rowan Plank", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T1)" },
      { material: "Ash Plank", refined: "Ash Plank", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T2)" },
      { material: "Yew Plank", refined: "Yew Plank", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T3)" },
      { material: "Lebethron Plank", refined: "Lebethron Plank", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T4)" },
      { material: "Ilex Plank", refined: "Ilex Plank", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T5)" },
      { material: "Mallorn Plank", refined: "Mallorn Plank", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T6)" },
      { material: "Birch Plank", refined: "Birch Plank", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T7)" },
      { material: "Oak Plank", refined: "Oak Plank", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T8)" },
      { material: "Walnut Plank", refined: "Walnut Plank", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T9)" },
      { material: "Anórien Plank", refined: "Anórien Plank", matPerCraft: 1, xpPerCraft: 8, locations: "From Forester (T10)" },
      { material: "Doomfold Plank", refined: "Doomfold Plank", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T11)" },
      { material: "Ironfold Plank", refined: "Ironfold Plank", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T12)" },
      { material: "Black Ash Plank", refined: "Black Ash Plank", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T13)" },
      { material: "Gundabad Plank", refined: "Gundabad Plank", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T14)" },
      { material: "Umbar Plank", refined: "Umbar Plank", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T15)" },
      { material: "Teak Plank", refined: "Teak Plank", matPerCraft: 1, xpPerCraft: 6, locations: "From Forester (T16)" },
    ], true, false),
  },
};

const XP_PER_CYCLE = 16;

function calcProductionProcessing(xpNeeded) {
  const consumed = Math.ceil(xpNeeded / XP_PER_CYCLE);
  return { rawMats: consumed, crafts: consumed * 2, method: "processing",
    note: `Processing: 2 refined → 4 shavings (8 XP) → 1 refined back (8 XP). ${consumed} cycle(s), consuming ${consumed} refined material(s) for ${consumed * 16} XP.` };
}

function calcGatheringProcessing(xpNeeded, xpPerSmelt) {
  let lo = 2, hi = Math.max(4, Math.ceil(xpNeeded / 3) * 2 + 2);
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    const ingots = Math.floor(mid / 2);
    const smeltXP = ingots * xpPerSmelt;
    const maxCycles = Math.max(0, ingots - 1);
    if (smeltXP + maxCycles * XP_PER_CYCLE >= xpNeeded) hi = mid; else lo = mid + 1;
  }
  const ore = lo % 2 === 1 ? lo + 1 : lo;
  const ingots = ore / 2;
  const smeltXP = ingots * xpPerSmelt;
  const remaining = Math.max(0, xpNeeded - smeltXP);
  const cycles = Math.min(ingots - 1, Math.ceil(remaining / XP_PER_CYCLE));
  return { rawMats: ore, crafts: ingots + cycles * 2, method: "processing",
    note: `Smelt ${ore} ore → ${ingots} ingots (${smeltXP} XP), then process ${cycles}× (${cycles * 16} XP). ${ingots - cycles} ingot(s) left.` };
}

function calcStandard(xpNeeded, matPerCraft, xpPerCraft) {
  const crafts = Math.ceil(xpNeeded / xpPerCraft);
  return { rawMats: crafts * matPerCraft, crafts, method: "standard" };
}

function Bar({ value, max, color, label }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#b8a67e", marginBottom: 3 }}>
        <span>{label}</span><span>{value} / {max} XP</span>
      </div>
      <div style={{ height: 10, background: "#1a1611", borderRadius: 5, overflow: "hidden", border: "1px solid #3d3426" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}dd)`, borderRadius: 5, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

export default function App() {
  const [prof, setProf] = useState("Prospector");
  const [selTiers, setSelTiers] = useState([1]);
  const [xp, setXP] = useState({});
  const [useProc, setUseProc] = useState(true);
  const [showProg, setShowProg] = useState(false);

  const pd = PROFESSIONS[prof];
  const hasProc = pd.processingType !== "none";

  const toggle = id => setSelTiers(p => p.includes(id) ? p.filter(t => t !== id) : [...p, id].sort((a, b) => a - b));
  const selAll = () => setSelTiers(selTiers.length === TIERS.length ? [1] : TIERS.map(t => t.id));

  const res = useMemo(() => {
    let totMats = 0, totCrafts = 0; const rows = [];
    for (const tier of TIERS) {
      if (!selTiers.includes(tier.id)) continue;
      const td = pd.tiers[tier.id]; if (!td) continue;
      const pDone = xp[`${tier.id}-p`] || 0, mDone = xp[`${tier.id}-m`] || 0;
      const pNeed = Math.max(0, tier.prof - pDone), mNeed = Math.max(0, tier.mastery - mDone), total = pNeed + mNeed;
      if (total === 0) { rows.push({ tier, td, pNeed: 0, mNeed: 0, mats: 0, crafts: 0, skip: true }); continue; }
      const canProc = useProc && td.hasProcessing;
      let r = canProc && pd.processingType === "production" ? calcProductionProcessing(total)
            : canProc && pd.processingType === "gathering" ? calcGatheringProcessing(total, td.xpPerCraft)
            : calcStandard(total, td.matPerCraft, td.xpPerCraft);
      const std = calcStandard(total, td.matPerCraft, td.xpPerCraft);
      totMats += r.rawMats; totCrafts += r.crafts;
      rows.push({ tier, td, pNeed, mNeed, pDone, mDone, mats: r.rawMats, crafts: r.crafts, note: r.note, method: r.method, stdMats: std.rawMats });
    }
    return { totMats, totCrafts, rows };
  }, [prof, selTiers, xp, useProc, pd]);

  const S = {
    wrap: { minHeight: "100vh", background: "#0d0b08", color: "#d4c5a0", fontFamily: "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif", padding: "20px 12px" },
    hdr: { textAlign: "center", marginBottom: 28, borderBottom: "2px solid #3d3426", paddingBottom: 16 },
    sec: { background: "#15120d", border: "1px solid #2e2618", borderRadius: 8, padding: 16, marginBottom: 16 },
    secT: { fontSize: 14, fontWeight: 700, color: "#c9a84c", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1, borderBottom: "1px solid #2e2618", paddingBottom: 8 },
    pBtn: a => ({ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 12px", margin: 3, background: a ? "#2a2010" : "transparent", border: `1px solid ${a ? "#c9a84c" : "#2e2618"}`, borderRadius: 6, color: a ? "#c9a84c" : "#8a7b5b", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }),
    tBtn: a => ({ display: "inline-block", padding: "5px 10px", margin: 2, background: a ? "#2a2010" : "transparent", border: `1px solid ${a ? "#c9a84c" : "#2e2618"}`, borderRadius: 4, color: a ? "#c9a84c" : "#6a5f4b", cursor: "pointer", fontSize: 11, fontFamily: "inherit", minWidth: 80, textAlign: "center" }),
    inp: { background: "#0d0b08", border: "1px solid #3d3426", borderRadius: 4, color: "#d4c5a0", padding: "5px 8px", width: 70, fontSize: 13, fontFamily: "inherit", textAlign: "right" },
    card: { background: "#1a1611", border: "1px solid #2e2618", borderRadius: 6, padding: 14, marginBottom: 10 },
    tot: { background: "linear-gradient(135deg,#1f1a10,#2a2010)", border: "2px solid #c9a84c", borderRadius: 8, padding: 20, textAlign: "center", marginTop: 16 },
    tag: { display: "inline-block", background: "#2a2010", border: "1px solid #3d3426", borderRadius: 3, padding: "2px 8px", fontSize: 10, color: "#b8a67e", marginRight: 4, marginBottom: 4 },
    sav: { display: "inline-block", background: "#1a2a1a", border: "1px solid #3a5a3a", borderRadius: 3, padding: "2px 8px", fontSize: 10, color: "#6aaa6a", marginLeft: 6 },
    smBtn: { background: "transparent", border: "1px solid #3d3426", borderRadius: 4, color: "#8a7b5b", padding: "4px 10px", fontSize: 10, cursor: "pointer", fontFamily: "inherit" },
  };

  return (
    <div style={S.wrap}>
      <div style={S.hdr}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#c9a84c", letterSpacing: 1, margin: 0, textShadow: "0 2px 8px #00000088" }}>LOTRO Crafting Calculator</h1>
        <div style={{ fontSize: 12, color: "#8a7b5b", marginTop: 4, letterSpacing: 2, textTransform: "uppercase" }}>Materials needed per profession & tier</div>
      </div>

      <div style={S.sec}>
        <div style={S.secT}>Choose Profession</div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {Object.entries(PROFESSIONS).map(([n, d]) => (
            <button key={n} style={S.pBtn(prof === n)} onClick={() => { setProf(n); setXP({}); }}>
              <span style={{ fontSize: 16 }}>{d.icon}</span><span>{n}</span>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: "#8a7b5b" }}>
          {pd.icon} {pd.desc} — <span style={{ color: pd.type === "gathering" ? "#6aaa6a" : "#aa8a6a" }}>{pd.type}</span>
          {pd.processingType !== "none" && <span style={{ color: "#6aaa6a", marginLeft: 8 }}>⟳ has processing</span>}
        </div>
      </div>

      <div style={S.sec}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={S.secT}>Select Tiers</div>
          <button onClick={selAll} style={S.smBtn}>{selTiers.length === TIERS.length ? "Deselect All" : "Select All"}</button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {TIERS.map(t => <button key={t.id} style={S.tBtn(selTiers.includes(t.id))} onClick={() => toggle(t.id)}>T{t.id} {t.name}</button>)}
        </div>
      </div>

      {hasProc && (
        <div style={S.sec}>
          <label style={{ display: "flex", alignItems: "flex-start", gap: 8, cursor: "pointer", fontSize: 13 }}>
            <input type="checkbox" checked={useProc} onChange={e => setUseProc(e.target.checked)} style={{ accentColor: "#c9a84c", marginTop: 3 }} />
            <div>
              <div style={{ fontWeight: 600, color: "#c9a84c" }}>Use Processing Recipes (Traitement)</div>
              <div style={{ fontSize: 11, color: "#8a7b5b", marginTop: 2 }}>
                {pd.processingType === "production"
                  ? "Available on ALL tiers. 2 refined → 4 shavings (8 XP) → reassemble 1 refined (8 XP). Net: 1 material consumed = 16 XP. Much more efficient than crafting items!"
                  : "T10+ only. Process refined materials into shavings and back to maximize XP per raw resource."}
              </div>
            </div>
          </label>
        </div>
      )}

      <div style={S.sec}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={S.secT}>Current Progress (optional)</div>
          <button onClick={() => setShowProg(!showProg)} style={S.smBtn}>{showProg ? "Collapse" : "Set Progress"}</button>
        </div>
        {showProg && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 8, marginTop: 8 }}>
            {TIERS.filter(t => selTiers.includes(t.id)).map(t => (
              <div key={t.id} style={{ background: "#0d0b08", border: "1px solid #2e2618", borderRadius: 6, padding: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#c9a84c", marginBottom: 6 }}>T{t.id} {t.name}</div>
                {[["p", "Prof XP", "#b87333", t.prof], ["m", "Mastery XP", "#c9a84c", t.mastery]].map(([k, lbl, col, max]) => (
                  <div key={k} style={{ display: "flex", alignItems: "center", fontSize: 11, marginTop: k === "m" ? 4 : 0 }}>
                    <span style={{ color: col, width: 72, display: "inline-block" }}>{lbl}:</span>
                    <input type="number" min={0} max={max} value={xp[`${t.id}-${k}`] || ""}
                      onChange={e => setXP(p => ({ ...p, [`${t.id}-${k}`]: Math.min(max, Math.max(0, parseInt(e.target.value) || 0)) }))}
                      placeholder="0" style={S.inp} />
                    <span style={{ color: "#6a5f4b", marginLeft: 4 }}>/{max}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={S.sec}>
        <div style={S.secT}>Material Requirements</div>
        {res.rows.map(r => {
          const saved = r.method === "processing" && r.stdMats > r.mats;
          return (
            <div key={r.tier.id} style={S.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <span style={{ fontWeight: 700, color: "#c9a84c", fontSize: 14 }}>T{r.tier.id} — {r.tier.name}</span>
                  {r.method === "processing" && <span style={{ fontSize: 9, color: "#6aaa6a", marginLeft: 8, textTransform: "uppercase", letterSpacing: 1 }}>⟳ processing</span>}
                  <div style={{ fontSize: 11, color: "#6a5f4b", marginTop: 2 }}>{pd.processingType === "production" ? r.td.refined : r.td.material}</div>
                </div>
                {r.skip ? <span style={{ fontSize: 11, color: "#6aaa6a", fontStyle: "italic" }}>Completed ✓</span> : (
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#e8d5a3" }}>{r.mats.toLocaleString()}</div>
                    <div style={{ fontSize: 10, color: "#8a7b5b" }}>{pd.processingType === "production" ? "refined materials" : "raw materials"}</div>
                    {saved && <div style={S.sav}>saves {(r.stdMats - r.mats).toLocaleString()} vs crafting items</div>}
                  </div>
                )}
              </div>
              {!r.skip && (<>
                <Bar value={r.pDone || 0} max={r.tier.prof} color="#b87333" label={`Proficiency (${r.pNeed} XP remaining)`} />
                <Bar value={r.mDone || 0} max={r.tier.mastery} color="#c9a84c" label={`Mastery (${r.mNeed} XP remaining)`} />
                <div style={{ display: "flex", flexWrap: "wrap", marginTop: 8 }}>
                  <span style={S.tag}>{r.crafts} crafts</span>
                  {r.method === "processing" ? <span style={S.tag}>16 XP/cycle</span> : <><span style={S.tag}>{r.td.xpPerCraft} XP/craft</span><span style={S.tag}>{r.td.matPerCraft} mat/craft</span></>}
                </div>
                {r.note && <div style={{ fontSize: 10, color: "#6aaa6a", marginTop: 6, fontStyle: "italic", lineHeight: 1.5 }}>{r.note}</div>}
                <div style={{ fontSize: 10, color: "#6a5f4b", marginTop: 4 }}>Locations: {r.td.locations}</div>
                {r.td.note && <div style={{ fontSize: 10, color: "#8a7b5b", marginTop: 2, fontStyle: "italic" }}>{r.td.note}</div>}
              </>)}
            </div>
          );
        })}

        {res.rows.length > 0 && (
          <div style={S.tot}>
            <div style={{ fontSize: 11, color: "#8a7b5b", textTransform: "uppercase", letterSpacing: 2, marginBottom: 6 }}>Grand Total — {prof}</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#c9a84c", lineHeight: 1 }}>{res.totMats.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: "#b8a67e", marginTop: 4 }}>{pd.processingType === "production" ? "refined materials needed" : "raw materials needed"}</div>
            <div style={{ fontSize: 13, color: "#8a7b5b", marginTop: 8 }}>
              {res.totCrafts.toLocaleString()} total crafts across {res.rows.filter(r => !r.skip).length} tier{res.rows.filter(r => !r.skip).length !== 1 ? "s" : ""}
            </div>
          </div>
        )}
      </div>

      <div style={{ fontSize: 10, color: "#4a4232", textAlign: "center", marginTop: 20, lineHeight: 1.6, padding: "0 10px" }}>
        Processing (Traitement): Jeweller, Metalsmith, Tailor, Weaponsmith & Woodworker — all tiers.
        Prospector & Forester — T10+ only.
        <br/>Mechanic: 2 refined → 4 shavings (8 XP) → 4 shavings → 1 refined (8 XP). Net: 1 consumed, 16 XP gained.
        <br/>Data from LOTRO-Wiki & community guides. Actual recipes may vary slightly.
      </div>
    </div>
  );
}
