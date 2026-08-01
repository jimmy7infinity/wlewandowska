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
    result: 'First Class (Destination)',
    school: 'De Montfort University, Leicester',
    note: 'Foundation in media theory, storytelling, and digital channels.',
  },
  {
    step: '02',
    pageEyebrow: 'Levelling up in marketing & strategy',
    eyebrow: 'Postgraduate',
    degree: 'Master in Marketing',
    result: 'First Class (Destination)',
    school: 'De Montfort University, Leicester',
    note: 'Strategy, research, and brand building at honours level.',
  },
]

export const mediaProjects = [
  {
    title: 'Campaign narrative',
    description:
      'Omnichannel launch narrative: tone of voice, channel plan, and asset rollout for a lifestyle brand — from first message to sustained engagement.',
    category: 'Media',
    skills: ['Content strategy', 'Social', 'Editorial'],
  },
  {
    title: 'Brand film series',
    description:
      'Short-form documentary-style films spotlighting founders and product craft — story-led scripts, shoot coordination, and distribution across social.',
    category: 'Media',
    skills: ['Production', 'Storyboarding', 'Distribution'],
  },
]

export const consultancyProjects = [
  {
    title: 'Go-to-market workshop',
    description:
      'Facilitated positioning sprint with leadership — competitive framing, audience clarity, and distilled messaging pillars the team can ship with.',
    category: 'Consultancy',
    skills: ['Workshops', 'Positioning', 'Messaging'],
  },
  {
    title: 'Retention playbook',
    description:
      'Lifecycle audit and experiment backlog to improve repeat engagement — CRM touchpoints, simple analytics views, and testable next steps.',
    category: 'Consultancy',
    skills: ['CRM', 'Analytics', 'Experiment design'],
  },
]
