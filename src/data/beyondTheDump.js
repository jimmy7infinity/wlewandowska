const GALLERY = [
  {
    src: '/projects/beyond-the-dump/gallery/01-jakarta-cityscape.jpg',
    alt: 'Jakarta cityscape with the Indonesian flag rising among skyscrapers and palm trees',
  },
  {
    src: '/projects/beyond-the-dump/gallery/02-people-walking.jpg',
    alt: 'People walking through the city — a transitional urban frame of everyday life in Jakarta',
  },
  {
    src: '/projects/beyond-the-dump/gallery/03-waste-in-water.jpg',
    alt: 'Waste floating in dark water — plastic bottles and debris on the surface',
  },
  {
    src: '/projects/beyond-the-dump/gallery/04-collecting-bottles.jpg',
    alt: 'Man collecting plastic bottles into a red bag outdoors',
  },
  {
    src: '/projects/beyond-the-dump/gallery/05-street-interview.jpg',
    alt: 'Street interview with a man, subtitled about throwing rubbish in the correct place',
  },
  {
    src: '/projects/beyond-the-dump/gallery/06-shop-interview.jpg',
    alt: 'Interview with a woman working in a shop, subtitled about plastic waste and purchasing',
  },
  {
    src: '/projects/beyond-the-dump/gallery/07-women-interview.jpg',
    alt: 'Women interviewed near the landfill, subtitled that this is where they find income and go to school',
  },
  {
    src: '/projects/beyond-the-dump/gallery/08-working-among-waste.jpg',
    alt: 'Person working among towering piles of waste at the landfill',
  },
  {
    src: '/projects/beyond-the-dump/gallery/09-landfill-wide.jpg',
    alt: 'Wide view of the landfill with trucks and a mountain of waste',
  },
  {
    src: '/projects/beyond-the-dump/gallery/10-juliana-volunteer.jpg',
    alt: 'Interview frame identifying Juliana as Volunteer at the landfill site',
  },
  {
    src: '/projects/beyond-the-dump/gallery/11-community-session.jpg',
    alt: 'Community educational session with children and a presenter using a puppet',
  },
  {
    src: '/projects/beyond-the-dump/gallery/12-closing-group.jpg',
    alt: 'Final group photograph with the Beyond the Dump title overlaid',
  },
]

export const beyondTheDumpCaseStudy = {
  id: 'media-beyond-the-dump',
  eyebrow: 'Documentary film · Social impact · Festival award',
  title: 'Beyond the Dump',
  subtitle: 'Short social-impact documentary filmed in Jakarta, Indonesia',
  stillsSetA: GALLERY.slice(0, 6),
  stillsSetB: GALLERY.slice(6, 12),
  award: {
    lines: ['2nd Runner-Up, PSA and PR Award', '5th LSPR SDGs Film Festival, 2023'],
    links: [
      {
        label: 'BeritaSatu — SDGs Film Festival coverage',
        href: 'https://www.beritasatu.com/lifestyle/1056706/gelar-sdgs-film-festival-lspr-institute-dukung-tujuan-berkelanjutan-2030',
      },
      {
        label: 'LSPR Institute — 5th SDGs Film Festival',
        href: 'https://www.lspr.ac.id/the-5th-lspr-sdgs-film-festival-komitmen-lspr-institute-mendukung-tercapainya-pemenuhan-tujuan-berkelanjutan-2030/',
      },
      {
        label: 'Watch Beyond the Dump on YouTube',
        href: 'https://www.youtube.com/watch?v=z5OhgosHIuA',
      },
    ],
  },
  summary:
    'Beyond the Dump is a short documentary created as a two-person production in Jakarta, Indonesia. I co-produced, co-directed and co-edited the film alongside one other filmmaker.',
  summaryContinued:
    'The film explores the experiences of people whose daily lives and livelihoods are connected to a landfill. Through interviews and on-location footage, it examines poverty, dignity, education and the social realities surrounding waste collection.',
  summaryClosing:
    'The documentary aimed to move beyond simplified representations of poverty by focusing on the individuals and human experiences behind the issue.',
  role: {
    heading: 'My role',
    credits: 'Co-producer · Co-director · Co-editor',
    body:
      'I contributed across concept development, on-location production and post-production. My responsibilities included helping to shape the documentary narrative, supporting the filming and interview process, and co-editing the final film.',
    bodyContinued:
      'The documentary was developed, filmed and edited by a two-person team within approximately one week. The compressed production schedule required efficient planning, adaptability and rapid creative decision-making, while maintaining a sensitive approach to the participants and subject matter.',
  },
  outcome: {
    heading: 'Project outcome',
    body:
      'Beyond the Dump received 2nd Runner-Up in the PSA and PR Award category at the 5th LSPR SDGs Film Festival in Jakarta in 2023.',
  },
  skills: [
    'Documentary storytelling',
    'Interview production',
    'On-location filming',
    'Video editing',
    'Social-impact communication',
  ],
}
