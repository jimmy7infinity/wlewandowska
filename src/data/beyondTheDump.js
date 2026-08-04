const STILLS_A = Array.from({ length: 6 }, (_, index) => {
  const n = String(index + 1).padStart(2, '0')
  return {
    src: `/projects/beyond-the-dump/stills/set-a/${n}.jpg`,
    alt: `Beyond the Dump documentary still — on-location scene ${index + 1}`,
  }
})

const STILLS_B = Array.from({ length: 6 }, (_, index) => {
  const n = String(index + 1).padStart(2, '0')
  return {
    src: `/projects/beyond-the-dump/stills/set-b/${n}.jpg`,
    alt: `Beyond the Dump documentary still — interview and community scene ${index + 1}`,
  }
})

export const beyondTheDumpCaseStudy = {
  id: 'media-beyond-the-dump',
  eyebrow: 'Documentary film · Social impact · Festival award',
  title: 'Beyond the Dump',
  subtitle: 'Short social-impact documentary filmed in Jakarta, Indonesia',
  stillsSetA: STILLS_A,
  stillsSetB: STILLS_B,
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
