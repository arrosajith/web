// src/data/posts.js
export const posts = [
  {
    id: 1,
    slug: "cannes-films-oscar-race",
    title: "Which Cannes Films Will Factor Into the Oscar Race",
    category: "Lifestyle",
    author: "Sora Blogging Tips",
    date: "2023-04-23",
    image: "/front.jpg",
    excerpt:
      "Festival buzz meets awards momentum. We look at the films building early heat—and what it really takes to go the distance.",
    content: [
      "Cannes sets the tone for movie conversation all year. Some entries fizzle, others build steam. The jump from Croisette to Oscar night is a marathon, not a sprint.",
      "For distributors, timing is everything—how a fall rollout shapes the narrative matters as much as reviews. Meanwhile, the Academy's calendar keeps shifting the playing field.",
      "Below we break down the categories most likely to feel the ripple effects, from Best Picture to International Feature."
    ],
  },
  {
    id: 2,
    slug: "simple-cooking-recipe-review",
    title: "Delicious Simple Cooking Recipe Review",
    category: "Food",
    author: "Sora Blogging Tips",
    date: "2016-03-18",
    image: "/slider-image-1.jpg",
    excerpt:
      "We tested a minimalist pantry supper that promises speed without sacrificing flavor. Here’s what worked—and what to tweak.",
    content: [
      "The base is gentle heat, aromatics, and starch. Resist the urge to rush this step; the payoff is deeper sweetness.",
      "We found a squeeze of lemon at the end lifted everything. If you have herbs, save them for the very last toss.",
    ],
  },
  {
    id: 3,
    slug: "ratings-reviews-new-movies-tv",
    title: "Ratings and Reviews for New Movies and TV Shows",
    category: "Entertainment",
    author: "Sora Blogging Tips",
    date: "2016-03-17",
    image: "/ff.jpg",
    excerpt:
      "From sleeper hits to divisive pilots, we round up the buzziest releases and where critics landed.",
    content: [
      "Hype cycles are shorter, but word-of-mouth still rules. Our take? Follow the creators, not the algorithms.",
    ],
  },
  {
    id: 4,
    slug: "ev-autoreview-future",
    title: "Autoreview: VW Electrical Car in Future",
    category: "Design",
    author: "John Doe",
    date: "2016-03-17",
    image: "/pp.jpg",
    excerpt:
      "Volkswagen’s concept sketches show a geometric interior and playful light language. Here’s how it drives the brand forward.",
    content: [
      "The surfacing blends crisp creases with friendly radii. Expect this aesthetic to migrate into the mainstream lineup.",
    ],
  },
  {
    id: 5,
    slug: "iphone-x-flex-display",
    title: "iPhone X with Flexible Display Review",
    category: "Tech",
    author: "John Doe",
    date: "2016-03-17",
    image: "/tt.jpg",
    excerpt:
      "A bend without the creak: we stress-tested the hinge and lived to text about it.",
    content: [
      "Durability depends on hinge geometry and film stack. Apple’s choice here minimizes shear at the fold line.",
    ],
  },
  {
    id: 6,
    slug: "high-yield-stock-3-reasons",
    title: "3 Reasons I Just Bought This High-Yield Stock",
    category: "Investing",
    author: "John Doe",
    date: "2016-03-17",
    image: "/oo.jpg",
    excerpt:
      "Yield looks tempting—but the real story is cash coverage, reinvestment discipline, and management incentives.",
    content: [
      "Dividend safety is a function of cash flows, not vibes. Start with free cash conversion through a cycle.",
    ],
  },
  {
    id: 7,
    slug: "no-sugar-oatmeal-cookies",
    title: "No Sugar Oatmeal Cookies",
    category: "Food",
    author: "Jane Smith",
    date: "2017-12-10",
    image: "/front1.png",
    excerpt:
      "Crisp edges, chewy middle—no refined sugar required. Here’s the pantry-friendly formula.",
    content: [
      "We lean on bananas and dates for sweetness and binding. Toast your oats; it’s a game changer.",
    ],
  },
  {
    id: 8,
    slug: "10-facts-about-caffeine",
    title: "10 Interesting Facts About Caffeine",
    category: "Health",
    author: "Jane Smith",
    date: "2017-12-15",
    image: "/cc.jpg",
    excerpt:
      "The molecule that powers mornings has a surprising history and a nuanced effect on performance.",
    content: [
      "Caffeine blocks adenosine receptors, which reduces perceived fatigue—until it doesn’t.",
    ],
  },
  {
    id: 9,
    slug: "standard-format-post",
    title: "Just a Standard Format Post",
    category: "Notes",
    author: "Jane Smith",
    date: "2017-12-15",
    image: "/zz.jpg",
    excerpt:
      "A quick note on process, momentum, and making time for small experiments.",
    content: [
      "A consistent cadence beats sporadic brilliance. Guard your sacred hour.",
    ],
  },
];

export const uniqueCategories = ["All", ...Array.from(new Set(posts.map(p => p.category)))];
