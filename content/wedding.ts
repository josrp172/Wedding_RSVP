/**
 * ─────────────────────────────────────────────────────────────
 *  Everything on the site lives here. Edit this file and the
 *  whole website updates — no need to touch the components.
 *
 *  The couple's story comes from Rheena's interview. Anything marked
 *  TODO is still a placeholder (exact wedding day, venues, schedule,
 *  entourage, travel) — swap it in once it's confirmed.
 * ─────────────────────────────────────────────────────────────
 */

export const wedding = {
  couple: {
    partnerOne: "Alvin",
    partnerTwo: "Rheena",
    monogram: ["A", "R"] as const,
    /** A nod to the friend request she ignored at first. */
    hashtag: "#RheenaAcceptedAlvin",
  },

  /**
   * TODO: exact day — the couple is planning for October 2027.
   * ISO strings WITH timezone offset (Philippines is +08:00).
   */
  date: {
    ceremonyStart: "2027-10-16T15:00:00+08:00",
    receptionEnd: "2027-10-16T23:30:00+08:00",
    display: "Saturday, the sixteenth of October",
    year: "two thousand twenty-seven",
    short: "10 · 16 · 2027",
    /** TODO: venue city — matches the sample venues below until the real church is added. */
    city: "Tagaytay, Philippines",
    timezone: "Asia/Manila",
  },

  rsvp: {
    deadline: "August 31, 2027",
    /** Max people per RSVP, including the guest filling in the form. */
    maxPartySize: 2,
  },

  /** Opening letter shown right after the hero. */
  letter: {
    greeting: "To the people we love most,",
    paragraphs: [
      "Every chapter of our story has your fingerprints on it — from the hallways of RTU to the streets of Taguig, from road trips to Aurora to a question asked in Hong Kong.",
      "You watched us grow up together, and our families welcomed us as their own. So when we imagined the day we promise each other forever before God, we couldn’t picture it without you.",
      "Come as you are. Rheena has planned every minute (yes, there’s an itinerary) — but the only thing on your schedule is to celebrate with us.",
    ],
    signOff: "With all our love,",
  },

  story: {
    intro:
      "A crush on the way to school, a friend request left on “seen” — and nine years of never once letting go.",
    milestones: [
      {
        year: "RTU",
        date: "College days",
        title: "The girl on the way to school",
        icon: "bus",
        photo: "https://images.unsplash.com/photo-1742578754019-d9c352bae2d0",
        body: "Alvin and Rheena were neighbours in Taguig and both studied engineering at RTU — different courses, same building. Alvin kept seeing Rheena on her way to school, and somewhere between those commutes he quietly fell for her, long before he ever said hello.",
      },
      {
        year: "Request",
        date: "Facebook",
        title: "Friend request: pending",
        icon: "chat",
        photo: "https://images.unsplash.com/photo-1625463006115-09f08489f591",
        body: "Alvin finally worked up the courage and sent Rheena a friend request. She ignored it. It took a real, face-to-face conversation before she finally pressed “Confirm” — and that one click opened the door to everything.",
      },
      {
        year: "2017",
        date: "The beginning of us",
        title: "From chats to “us”",
        icon: "heart",
        photo: "https://images.unsplash.com/photo-1687283457351-15e6f3c0b146",
        body: "One chat turned into another, and another, until they became a couple. Both families welcomed the relationship from the start — and with personalities this alike, they just fit.",
      },
      {
        year: "Always",
        date: "Sundo at hatid",
        title: "The one who always shows up",
        icon: "car",
        photo: "https://images.unsplash.com/photo-1566899478234-cd963727a2ff",
        body: "Nine years, and not a single breakup. Alvin has been Rheena’s constant: the daily sundo at hatid, the name on her emergency contact, the steady presence just a few streets away. Rheena has the strong personality; Alvin has the patience — and it works.",
      },
      {
        year: "Aurora",
        date: "Our adventures",
        title: "Roads we’ve taken",
        icon: "wave",
        photo: "https://images.unsplash.com/photo-1722635465474-299d1d797a0a",
        body: "Over the years they’ve explored new places together — including the waves of Aurora — sometimes with Rheena’s sister Cass along for the ride. Every trip, of course, came with one of Rheena’s famously detailed itineraries.",
      },
      {
        year: "2026",
        date: "September · Hong Kong",
        title: "The question in Hong Kong",
        icon: "ring",
        photo: "https://images.unsplash.com/photo-1678110721308-a08ed05a7938",
        body: "Far from the streets where it all began, Alvin asked Rheena to spend forever with him — in Hong Kong, in September 2026. After nine years of showing up for her, he asked the one question that mattered most. She said yes.",
      },
      {
        year: "2027",
        date: "October",
        title: "Forever, before God",
        icon: "church",
        photo: "https://images.unsplash.com/photo-1643697706170-d2a1892155d1",
        body: "This October, surrounded by both of our families and everyone who has cheered us on, we’ll make our promise in a Catholic church wedding. Rheena has the itinerary ready. All that’s left is you.",
      },
    ],
    numbers: [
      { value: 9, suffix: "", label: "years together" },
      { value: 0, suffix: "", label: "breakups — not even one" },
      { value: 1, suffix: "", label: "proposal in Hong Kong" },
      { value: 1, suffix: "", label: "very detailed wedding itinerary" },
    ],
  },

  /**
   * SAMPLE prenup footage — free stock clips from mixkit.co (Mixkit License).
   * Replace with your own prenup videos before going live: drop .mp4 files into
   * /public/videos and use paths like "/videos/hero.mp4", or paste Vercel Blob URLs.
   * Tip: export at 720p / ~2–4 MB per clip so it loads fast on mobile data.
   */
  media: {
    /** Sample soundtrack ("Beautiful Dream", mixkit.co). Starts softly when the envelope is opened. */
    music: "https://assets.mixkit.co/music/493/493.mp3",
    heroPoster: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74",
    letterPhoto: "https://images.unsplash.com/photo-1561240055-102e7eaa2961",
    hero: "https://assets.mixkit.co/videos/40596/40596-720.mp4",
    film: {
      title: "Our Prenup Film",
      subtitle: "Our prenup shoot is coming in early 2027 — until then, here’s a little preview.",
      credit: "Sample footage · Prenup film coming 2027",
      chapters: [
        { title: "The Garden", src: "https://assets.mixkit.co/videos/40584/40584-720.mp4" },
        { title: "The Promise", src: "https://assets.mixkit.co/videos/5223/5223-720.mp4" },
        { title: "Just Us", src: "https://assets.mixkit.co/videos/40590/40590-720.mp4" },
        { title: "Golden Hour", src: "https://assets.mixkit.co/videos/4829/4829-720.mp4" },
      ],
    },
    moments: [
      { caption: "The yes from Hong Kong", src: "https://assets.mixkit.co/videos/5218/5218-720.mp4" },
      { caption: "Still the girl from the commute", src: "https://assets.mixkit.co/videos/40586/40586-720.mp4" },
      { caption: "Still the boy who waited", src: "https://assets.mixkit.co/videos/40587/40587-720.mp4" },
      { caption: "Sundo at hatid, forever", src: "https://assets.mixkit.co/videos/40601/40601-720.mp4" },
      { caption: "Forever starts here", src: "https://assets.mixkit.co/videos/40593/40593-720.mp4" },
      { caption: "Almost married", src: "https://assets.mixkit.co/videos/40599/40599-720.mp4" },
    ],
  },

  /**
   * SAMPLE prenup photos — free Unsplash photos (Unsplash License).
   * Replace with your own: put files in /public/photos and use "/photos/01.jpg".
   */
  gallery: [
    { src: "https://images.unsplash.com/photo-1561240055-102e7eaa2961", caption: "Golden hour" },
    { src: "https://images.unsplash.com/photo-1540076156429-35ffe82b7870", caption: "Forehead kisses" },
    { src: "https://images.unsplash.com/photo-1627964464837-6328f5931576", caption: "Laughing at nothing" },
    { src: "https://images.unsplash.com/photo-1591969851586-adbbd4accf81", caption: "Into the light" },
    { src: "https://images.unsplash.com/photo-1559435578-231f6137aac5", caption: "He still carries me" },
    { src: "https://images.unsplash.com/photo-1567051181435-c9c9647c9cd4", caption: "Home is a hug" },
    { src: "https://images.unsplash.com/photo-1549062572-b4280938a25f", caption: "Almost" },
    { src: "https://images.unsplash.com/photo-1522033467113-b8db23657b96", caption: "Always beside you" },
    { src: "https://images.unsplash.com/photo-1555689070-b25ef81cc3ea", caption: "Wherever you go" },
    { src: "https://images.unsplash.com/photo-1529519195486-16945f0fb37f", caption: "Hold on" },
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552", caption: "A preview of forever" },
    { src: "https://images.unsplash.com/photo-1659090278376-9abe0a8f791a", caption: "Dress rehearsal" },
  ],

  /** The big scroll-to-reveal line between the letter and the story. */
  manifesto:
    "He noticed her on the way to school. She ignored his friend request. Nine years later, he’s still the one who brings her home.",

  /** Shown on the wishes wall until real guest notes arrive. */
  sampleWishes: [
    { name: "Tita Lorna", message: "I watched you two grow up together. Mahal na mahal namin kayo!" },
    { name: "Bianca", message: "Maid of honour reporting for duty. Bringing tissues for everyone." },
    { name: "Paolo", message: "Bro, she finally accepted the friend request. Proud of you." },
    { name: "Lola Cion", message: "Have patience, laugh often, and always eat dinner together." },
    { name: "Carlo", message: "Saving my best dance moves for the reception. You’ve been warned." },
    { name: "Ninang Carmen", message: "May your home be full of love, laughter and good food." },
    { name: "Mika", message: "Nine years and still kilig. See you on the dance floor!" },
    { name: "Tito Ramon", message: "Alvin — nine years of sundo at hatid. Keep showing up, forever." },
  ],

  /** TODO: the couple already has a church — replace these SAMPLE venues with the real ones. */
  venues: [
    {
      kind: "The Ceremony",
      time: "3:00 in the afternoon",
      name: "Caleruega Church",
      address: "Batulao, Nasugbu, Batangas",
      note: "Our Catholic church ceremony. Please be seated by 2:40 PM — Rheena has planned this to the minute.",
      mapsQuery: "Caleruega Church Nasugbu Batangas",
      photo: "https://images.unsplash.com/photo-1590566859269-7f933083a746",
    },
    {
      kind: "The Reception",
      time: "6:00 in the evening",
      name: "Hillcreek Gardens",
      address: "Tagaytay City, Cavite",
      note: "Dinner, dancing and string lights under the open sky. About 25 minutes from the church.",
      mapsQuery: "Hillcreek Gardens Tagaytay",
      photo: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74",
    },
  ],

  schedule: [
    { time: "2:30 PM", title: "Guests arrive", detail: "Find your seat, take a breath, enjoy the view." },
    { time: "3:00 PM", title: "The ceremony", detail: "An unplugged moment — phones away, hearts open." },
    { time: "4:15 PM", title: "Family portraits", detail: "Stay close; we want you in the pictures." },
    { time: "5:00 PM", title: "Cocktail hour", detail: "Drinks, canapés and golden-hour light at the garden." },
    { time: "6:00 PM", title: "Reception doors open", detail: "Grand entrance of the entourage and the newlyweds." },
    { time: "6:45 PM", title: "Dinner is served", detail: "Filipino-Spanish feast, family style." },
    { time: "8:00 PM", title: "First dance & toasts", detail: "Tissues recommended. We warned you." },
    { time: "9:00 PM", title: "The dance floor opens", detail: "Your song requests, on repeat." },
    { time: "11:00 PM", title: "Sparkler send-off", detail: "One last glow before we say goodnight." },
  ],

  dressCode: {
    title: "Garden Formal",
    description:
      "Think soft colours, flowing fabrics and comfortable shoes for grass. Evenings in Tagaytay get cool — bring a shawl or light jacket.",
    gentlemen: "Barong Tagalog, or a suit in a light or earthy tone. Tie optional.",
    ladies: "Long or midi dresses, or elegant jumpsuits in the palette below.",
    avoid: "Kindly avoid white, ivory and cream — those belong to the bride.",
    palette: [
      { name: "Blush", hex: "#E8B4BC" },
      { name: "Dusty Rose", hex: "#C98B96" },
      { name: "Mauve", hex: "#A47A92" },
      { name: "Champagne", hex: "#DDC3A0" },
      { name: "Sage", hex: "#9CAF88" },
      { name: "Dusty Blue", hex: "#94A9C0" },
    ],
  },

  entourage: {
    parents: [
      { role: "Parents of the Bride", names: ["Mr. Ramon Santos", "Mrs. Elena Santos"] },
      { role: "Parents of the Groom", names: ["Mr. Antonio Reyes", "Mrs. Lourdes Reyes"] },
    ],
    principalSponsors: [
      ["Mr. Eduardo Villanueva", "Mrs. Carmen Villanueva"],
      ["Mr. Roberto Cruz", "Mrs. Teresa Cruz"],
      ["Mr. Manuel Garcia", "Mrs. Rosario Garcia"],
      ["Dr. Fernando Lim", "Dr. Patricia Lim"],
      ["Atty. Jose Mendoza", "Mrs. Isabel Mendoza"],
      ["Mr. Ricardo Bautista", "Mrs. Angela Bautista"],
    ],
    honor: [
      { role: "Best Man", names: ["Paolo Reyes"] },
      { role: "Maid of Honor", names: ["Bianca Santos"] },
    ],
    secondarySponsors: [
      { role: "Candle", names: ["Marco Dela Cruz", "Andrea Lopez"] },
      { role: "Veil", names: ["Joaquin Ramos", "Sofia Navarro"] },
      { role: "Cord", names: ["Luis Fernandez", "Camille Torres"] },
    ],
    party: [
      { role: "Groomsmen", names: ["Carlo Mendoza", "Rafael Tan", "Enzo Aquino", "Daniel Ocampo"] },
      { role: "Bridesmaids", names: ["Patricia Gomez", "Nicole Herrera", "Julia Castillo", "Mika Rivera"] },
      { role: "Bearers", names: ["Ring · Lucas", "Coin · Mateo", "Bible · Gabriel"] },
      { role: "Flower Girls", names: ["Ava", "Sophia", "Mia"] },
    ],
  },

  travel: {
    intro:
      "Tagaytay is about 1.5 to 2 hours from Metro Manila, depending on traffic. We recommend leaving early and making a day of it.",
    tips: [
      {
        title: "Getting there",
        body: "Take SLEX or CAVITEX → CALAX, then exit at Silang (Aguinaldo) or Sta. Rosa. Waze and Google Maps both work well.",
      },
      {
        title: "Shuttle service",
        body: "A complimentary shuttle leaves SM Mall of Asia (Entrance 2) at 12:00 NN sharp, and returns from the reception at 11:30 PM.",
      },
      {
        title: "Parking",
        body: "Free parking is available at both the church and the reception venue.",
      },
      {
        title: "The weather",
        body: "May afternoons are warm but evenings in the highlands can drop to 20°C. A light layer will be your best friend.",
      },
    ],
    stays: [
      { name: "Taal Vista Hotel", note: "Classic, with the iconic volcano view.", distance: "15 min to reception" },
      { name: "Escala Tagaytay", note: "Boutique and quiet, perfect for families.", distance: "10 min to reception" },
      { name: "Anya Resort", note: "For those who want to turn it into a weekend.", distance: "12 min to reception" },
    ],
  },

  gifts: {
    lead: "Your presence is the greatest gift we could ask for.",
    body: "Truly. But if you wish to bless us further, a contribution toward our first home together would be treasured. A gift box will be available at the reception, and you’re welcome to ask our coordinator for e-wallet details.",
    tradition:
      "We’ll also honour the money dance — pin a wish (and maybe a bill) on us during the reception.",
  },

  faq: [
    {
      q: "Is it a church wedding?",
      a: "Yes — we’ll be married in a Catholic ceremony, followed by the reception. Please arrive early so you can find your seat before we begin.",
    },
    {
      q: "Can I bring a plus-one?",
      a: "We’ve lovingly kept our celebration intimate, so we can only accommodate the guests named on your invitation. Your RSVP form shows how many seats we’ve reserved for you.",
    },
    {
      q: "Are children welcome?",
      a: "We adore your little ones, but our celebration is adults-only — with the exception of the children in our entourage. We hope this gives you a well-deserved night off!",
    },
    {
      q: "What does “unplugged ceremony” mean?",
      a: "We’d love for you to be fully present with us during the ceremony, so please keep phones and cameras tucked away. Our photographers will capture everything — and we’ll share it all with you. Snap away at the reception!",
    },
    {
      q: "What time should I arrive?",
      a: "Please arrive by 2:30 PM so you can find parking and be seated by 2:40 PM. The ceremony starts promptly at 3:00 PM.",
    },
    {
      q: "What if it rains?",
      a: "Both venues have covered areas, so the celebration goes on rain or shine. (Rheena has a backup plan. Of course she does.)",
    },
    {
      q: "I have a dietary restriction. Can you accommodate it?",
      a: "Of course. Just let us know in your RSVP and we’ll make sure the kitchen takes care of you.",
    },
    {
      q: "How do I share photos from the day?",
      a: "Post them with our hashtag so we can relive every moment through your eyes.",
    },
  ],

  footer: {
    closing: "We can’t wait to celebrate with you.",
    contact: "Questions? Message our coordinator, Ate Joy — 0917 000 0000",
  },

  /** Keep the site out of search engines (recommended for privacy). */
  allowIndexing: false,
} as const;

export type Wedding = typeof wedding;
export type MilestoneIcon = (typeof wedding.story.milestones)[number]["icon"];

export const coupleNames = `${wedding.couple.partnerOne} & ${wedding.couple.partnerTwo}`;
