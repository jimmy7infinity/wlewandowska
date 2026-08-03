import { motion } from 'framer-motion'
import { peterPizzeriaCaseStudy as study } from '../data/peterPizzeria'
import { easeOut, fadeUpItem, inViewOnce, introTextItem, staggerContainer, staggerList } from '../lib/motion'
import SpotlightCard from './SpotlightCard'

function DownloadLink({ label, href, description }) {
  return (
    <motion.a
      variants={fadeUpItem}
      href={href}
      download
      className="group flex flex-col rounded-2xl border border-brand-text/12 bg-brand-surface px-6 py-5 text-left shadow-[0_12px_36px_-20px_rgba(26,20,38,0.12)] transition-[border-color,box-shadow] duration-300 hover:border-brand-accent-fg/35 hover:shadow-[0_20px_50px_-22px_rgba(37,29,57,0.16)]"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease: easeOut }}
    >
      <span className="font-display text-base font-medium text-brand-text md:text-lg">{label}</span>
      <span className="mt-1 text-xs font-light text-brand-text/68">{description}</span>
      <span className="mt-3 text-xs font-normal text-brand-accent-fg/90 group-hover:text-brand-accent-fg">
        Download
      </span>
    </motion.a>
  )
}

export function PeterPizzeriaCaseStudy() {
  return (
    <section
      id={study.id}
      className="relative snap-start snap-always scroll-mt-0 px-6 py-20 md:py-[120px]"
    >
      <motion.div
        className="mx-auto w-full max-w-[1100px]"
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
        variants={staggerContainer}
      >
        <motion.header variants={fadeUpItem} className="max-w-[700px]">
          <p className="text-xs font-light uppercase tracking-[0.35em] text-brand-text/62">{study.eyebrow}</p>
          <h2 className="font-display mt-4 text-[32px] font-medium tracking-tight text-brand-text md:text-[40px]">
            {study.title}
          </h2>
          <p className="mt-3 text-sm font-light text-brand-text/72 md:text-base">{study.subtitle}</p>
          <p className="mt-6 text-sm font-normal leading-[1.55] text-brand-text/92 md:text-base">{study.summary}</p>
        </motion.header>

        <motion.ul
          variants={staggerList}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 md:mt-12"
        >
          {study.stats.map((stat) => (
            <motion.li key={stat.label} variants={fadeUpItem}>
              <SpotlightCard
                className="rounded-2xl border border-brand-text/12 bg-brand-surface px-5 py-6 text-center shadow-[0_12px_36px_-20px_rgba(26,20,38,0.1)]"
                spotlightColor="rgba(178, 207, 192, 0.38)"
              >
                <p className="font-display text-3xl font-medium text-brand-text md:text-4xl">{stat.value}</p>
                <p className="mt-2 text-xs font-normal leading-snug text-brand-text/78">{stat.label}</p>
              </SpotlightCard>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div variants={staggerList} className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
          {study.highlights.map((item) => (
            <motion.article key={item.title} variants={fadeUpItem} className="min-w-0">
              <h3 className="font-display text-lg font-medium text-brand-text">{item.title}</h3>
              <p className="mt-3 text-sm font-normal leading-[1.55] text-brand-text/88">{item.body}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.ul variants={introTextItem} className="mt-10 flex flex-wrap gap-2 md:mt-12">
          {study.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-brand-text/12 bg-brand-bg-muted/55 px-3 py-1 text-xs font-normal text-brand-text/88"
            >
              {skill}
            </li>
          ))}
        </motion.ul>

        <motion.div variants={fadeUpItem} className="mt-16 md:mt-20">
          <h3 className="font-display text-center text-xl font-medium text-brand-text md:text-2xl">Evidence at a glance</h3>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            {study.infographics.map((img) => (
              <figure key={img.src} className="min-w-0">
                <div className="overflow-hidden rounded-2xl border border-brand-text/10 bg-brand-surface shadow-[0_14px_44px_-26px_rgba(26,20,38,0.12)]">
                  <img src={img.src} alt={img.alt} className="h-auto w-full" loading="lazy" decoding="async" />
                </div>
                <figcaption className="mt-3 text-center text-xs font-light text-brand-text/68">{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUpItem} className="mt-14 md:mt-16">
          <h3 className="font-display text-center text-xl font-medium text-brand-text md:text-2xl">Downloads</h3>
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {study.downloads.map((file) => (
              <DownloadLink key={file.href} {...file} />
            ))}
          </div>
        </motion.div>

        <motion.aside
          variants={fadeUpItem}
          className="mx-auto mt-10 max-w-[720px] space-y-4 rounded-2xl border border-brand-accent-fg/22 bg-brand-bg-muted/45 px-6 py-5 text-center md:mt-12"
        >
          <p className="text-xs font-normal leading-[1.55] text-brand-text/82">{study.kpiDisclaimer}</p>
          <p className="text-xs font-light leading-[1.55] text-brand-text/68">{study.projectDisclaimer}</p>
        </motion.aside>
      </motion.div>
    </section>
  )
}
