/** Short label + summary above section body (Education-style intros) */
export const sectionIntros = {
  about: {
    eyebrow: 'Profile',
    description:
      'Background and point of view — how I work at the intersection of marketing, media, and people.',
  },
  media: {
    eyebrow: 'Creative work',
    description:
      'Featured media projects — content, campaigns, and craft across channels and formats.',
  },
  consultancy: {
    eyebrow: 'Strategy & support',
    description:
      'Consultancy highlights — workshops, positioning, messaging, and practical marketing delivery.',
  },
  experience: {
    eyebrow: 'Career path',
    description:
      'Selected roles — marketing, sport programmes, hospitality, international placement, and on-the-ground delivery.',
  },
  contact: {
    eyebrow: 'Connect',
    description: 'Reach out by email or LinkedIn — open to the right opportunities and collaborations.',
  },
  education: {
    eyebrow: 'Academic path',
    description:
      'Media and communication first, then marketing — both at De Montfort, Leicester.',
  },
}

/** Hero portrait captions — typography matches About intro; edit copy independently if needed */
export const heroAside = {
  eyebrow: sectionIntros.about.eyebrow,
  description: sectionIntros.about.description,
}

export const aboutText =
  'Marketing and media specialist based in Leicester, UK, with a focus on clear storytelling, digital channels, and thoughtful strategy. Experience across content, campaigns, university programmes, and customer-facing delivery.'

export const contact = {
  email: 'wiktorialewandowska900@gmail.com',
  linkedin: 'https://www.linkedin.com/in/wiktoria-lewandowska-3819b72a0/',
}

export const cvUrl = '#'

export const education = [
  {
    step: '01',
    pageEyebrow: 'Laying the academic groundwork',
    eyebrow: 'Undergraduate',
    degree: 'BA Media and Communication',
    result: 'First Class (Distinction)',
    school: 'De Montfort University, Leicester',
    note: 'Foundation in media theory, storytelling, and digital channels.',
  },
  {
    step: '02',
    pageEyebrow: 'Levelling up in marketing & strategy',
    eyebrow: 'Postgraduate',
    degree: 'Master in Marketing',
    result: 'First Class (Distinction)',
    school: 'De Montfort University, Leicester',
    note: 'Strategy, research, and brand building at honours level.',
  },
]

export const mediaProjects = [
  {
    title: 'Beyond the Dump',
    description:
      'Short social-impact documentary filmed in Jakarta — co-produced, co-directed and co-edited as a two-person team. 2nd Runner-Up, PSA and PR Award, 5th LSPR SDGs Film Festival, 2023.',
    category: 'Documentary film',
    skills: [
      'Documentary storytelling',
      'Interview production',
      'On-location filming',
      'Video editing',
      'Social-impact communication',
    ],
    detailSectionId: 'media-beyond-the-dump',
  },
]

export const consultancyProjects = [
  {
    title: 'Peter Pizzeria',
    description:
      'An evidence-led consultancy project examining customer experience, social media performance and competitive positioning across three restaurant locations. I analysed 113 customer reviews and 20 social posts, then developed location-specific recommendations, a 12-month roadmap and a proposed KPI framework.',
    category: 'Customer Insight and Growth Strategy',
    skills: ['Marketing strategy', 'Consumer insights', 'Social media audit', 'Competitor analysis'],
    detailSectionId: 'consultancy-peter-pizzeria',
  },
  {
    title: 'BosleyMD',
    description:
      'A Distinction-level analysis of customer experience, acquisition, retention and development in the hair restoration market. I benchmarked BosleyMD against UK competitors, developed three SMART digital recommendations and was later selected to co-author a practitioner consultancy report for the brand.',
    category: 'Customer Strategy & Digital Engagement',
    skills: ['Consumer experience', 'Digital strategy', 'Competitor benchmarking', 'CRM', 'Personalisation'],
    detailSectionId: 'consultancy-bosleymd',
  },
]
