import {
  content,
  GITHUB_URL,
  localeLabel,
  localePath,
  locales,
  TELEGRAM_URL,
  type ChatLine,
  type Locale,
  type Project,
  type Service,
  type SiteContent,
} from "@/content/site";

interface SitePageProps {
  locale: Locale;
}

export function SitePage({ locale }: SitePageProps) {
  const t = content[locale];

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Header t={t} locale={locale} />
      <main id="main">
        <Hero t={t} />
        <Services t={t} />
        <Work t={t} />
        <Process t={t} />
      </main>
      <Contact t={t} />
    </>
  );
}

function Header({ t, locale }: { t: SiteContent; locale: Locale }) {
  return (
    <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 pt-5 sm:px-8 sm:pt-7">
      <a href={localePath[locale]} className="font-display text-lg font-semibold tracking-tight">
        {t.name}
      </a>
      <nav aria-label="Main" className="order-3 w-full sm:order-none sm:w-auto">
        <ul className="flex gap-5 overflow-x-auto text-[0.95rem] text-ink-soft">
          <li>
            <a className="hover:text-ink" href="#services">
              {t.nav.services}
            </a>
          </li>
          <li>
            <a className="hover:text-ink" href="#work">
              {t.nav.work}
            </a>
          </li>
          <li>
            <a className="hover:text-ink" href="#process">
              {t.nav.process}
            </a>
          </li>
        </ul>
      </nav>
      <LanguageSwitch current={locale} />
    </header>
  );
}

function LanguageSwitch({ current }: { current: Locale }) {
  return (
    <ul className="flex rounded-full bg-paper-deep p-1 text-sm font-medium" aria-label="Language">
      {locales.map((code) => {
        const active = code === current;
        return (
          <li key={code}>
            <a
              href={localePath[code]}
              hrefLang={code}
              lang={code}
              aria-current={active ? "page" : undefined}
              title={localeLabel[code]}
              className={
                active
                  ? "block rounded-full bg-ink px-3 py-1 text-paper"
                  : "block rounded-full px-3 py-1 text-ink-soft hover:text-ink"
              }
            >
              {code.toUpperCase()}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function Hero({ t }: { t: SiteContent }) {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-14 sm:px-8 md:grid-cols-[1.25fr_1fr] md:gap-10 md:pb-28 md:pt-20">
      <div>
        <h1 className="font-display text-[2.6rem] font-bold leading-[1.02] tracking-[-0.03em] text-balance sm:text-6xl lg:text-[4.6rem]">
          {t.hero.title}
        </h1>
        <p className="mt-6 max-w-[34rem] text-lg text-ink-soft sm:text-xl">{t.hero.lead}</p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href={TELEGRAM_URL}
            className="inline-flex items-center gap-2.5 rounded-full bg-cobalt px-6 py-3.5 font-semibold text-white transition-colors hover:bg-cobalt-deep"
          >
            <TelegramIcon />
            {t.hero.cta}
          </a>
          <a href="#services" className="px-2 py-3 font-semibold text-cobalt underline-offset-4 hover:underline">
            {t.hero.secondary}
          </a>
        </div>
      </div>
      <PhoneChat t={t} />
    </section>
  );
}

function PhoneChat({ t }: { t: SiteContent }) {
  const lineDelay = (index: number): string => `${300 + index * 650}ms`;
  const buttonsDelay = lineDelay(t.chat.lines.length);

  return (
    <div className="relative mx-auto w-full max-w-[22rem]" aria-hidden="true">
      <div className="absolute -inset-x-3 -bottom-6 top-10 -z-10 rounded-[3rem] bg-turquoise/15 sm:-inset-x-6" />
      <div className="rounded-[2.6rem] bg-ink p-2.5 shadow-[0_30px_60px_-25px_rgba(16,32,74,0.55)]">
        <div className="overflow-hidden rounded-[2.1rem] bg-[#c9d8e8]">
          <div className="flex items-center gap-3 bg-white px-5 pb-3 pt-6">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-saffron font-display text-sm font-bold text-ink">
              B
            </span>
            <div className="leading-tight">
              <p className="font-semibold">{t.chat.botName}</p>
              <p className="text-sm text-ink-soft">{t.chat.status}</p>
            </div>
          </div>
          <div className="flex min-h-[21rem] flex-col justify-end gap-2.5 px-4 pb-5 pt-6">
            {t.chat.lines.map((line, index) => (
              <Bubble key={`${line.from}-${index}`} line={line} delay={lineDelay(index)} />
            ))}
            <div className="chat-line grid grid-cols-3 gap-2" style={{ animationDelay: buttonsDelay }}>
              {t.chat.buttons.map((label) => (
                <span
                  key={label}
                  className="rounded-xl bg-white/80 py-2 text-center text-[0.95rem] font-semibold text-cobalt"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ line, delay }: { line: ChatLine; delay: string }) {
  const isUser = line.from === "user";
  return (
    <p
      className={
        isUser
          ? "chat-line max-w-[80%] self-end rounded-2xl rounded-br-md bg-bubble-user px-3.5 py-2 text-[0.95rem]"
          : "chat-line max-w-[85%] self-start rounded-2xl rounded-bl-md bg-bubble-bot px-3.5 py-2 text-[0.95rem]"
      }
      style={{ animationDelay: delay }}
    >
      {line.text}
    </p>
  );
}

function Services({ t }: { t: SiteContent }) {
  return (
    <section id="services" className="scroll-mt-6 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-8 md:py-28">
        <h2 className="font-display text-3xl font-bold tracking-[-0.02em] sm:text-5xl">{t.services.title}</h2>
        <p className="mt-4 max-w-[38rem] text-ink-soft">{t.services.note}</p>
        <ul className="mt-12 divide-y divide-line border-y border-line">
          {t.services.items.map((service) => (
            <ServiceRow key={service.name} service={service} fromLabel={t.services.from} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServiceRow({ service, fromLabel }: { service: Service; fromLabel: string }) {
  return (
    <li className="py-7">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
        <h3 className="font-display text-xl font-semibold sm:text-2xl">{service.name}</h3>
        <span className="leader hidden h-3 flex-1 sm:block" />
        <p className="shrink-0 whitespace-nowrap font-display text-xl font-semibold text-cobalt sm:text-right sm:text-2xl">
          {fromLabel ? <span className="mr-1.5 font-sans text-base font-normal text-ink-soft">{fromLabel}</span> : null}
          {service.price}
        </p>
      </div>
      <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-8">
        <p className="max-w-[40rem] text-ink-soft">{service.includes}</p>
        <p className="shrink-0 text-sm font-medium text-turquoise sm:text-base">{service.time}</p>
      </div>
    </li>
  );
}

function Work({ t }: { t: SiteContent }) {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-6 px-4 py-20 sm:px-8 md:py-28">
      <h2 className="font-display text-3xl font-bold tracking-[-0.02em] sm:text-5xl">{t.work.title}</h2>
      <p className="mt-4 text-ink-soft">{t.work.lead}</p>
      <ul className="mt-12 grid gap-x-10 md:grid-cols-2">
        {t.work.items.map((project) => (
          <ProjectItem key={project.name} project={project} />
        ))}
      </ul>
    </section>
  );
}

function ProjectItem({ project }: { project: Project }) {
  return (
    <li className="border-t-2 border-ink py-7">
      <p className="text-sm font-medium text-turquoise">{project.kind}</p>
      <h3 className="mt-1.5 font-display text-xl font-semibold leading-snug">{project.name}</h3>
      <p className="mt-3 text-ink-soft">{project.summary}</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-soft">{project.stack.join(", ")}</p>
        {project.link ? (
          <a
            href={project.link.href}
            className="text-sm font-semibold text-cobalt underline underline-offset-4 hover:text-cobalt-deep"
          >
            {project.link.label}
          </a>
        ) : null}
      </div>
    </li>
  );
}

function Process({ t }: { t: SiteContent }) {
  return (
    <section id="process" className="scroll-mt-6 bg-paper-deep">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-8 md:py-28">
        <h2 className="font-display text-3xl font-bold tracking-[-0.02em] sm:text-5xl">{t.process.title}</h2>
        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {t.process.steps.map((step, index) => (
            <li key={step.title}>
              <span className="font-display text-5xl font-bold text-cobalt/25">{index + 1}</span>
              <h3 className="mt-2 font-display text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-ink-soft">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Contact({ t }: { t: SiteContent }) {
  return (
    <footer id="contact" className="bg-cobalt text-white">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-20 sm:px-8 md:pt-28">
        <h2 className="font-display text-4xl font-bold tracking-[-0.03em] sm:text-6xl">{t.contact.title}</h2>
        <p className="mt-4 max-w-[34rem] text-lg text-white/80">{t.contact.text}</p>
        <a
          href={TELEGRAM_URL}
          className="mt-9 inline-flex items-center gap-3 rounded-full bg-saffron px-7 py-4 font-display text-base font-semibold text-ink transition-colors hover:bg-white sm:text-lg"
        >
          <TelegramIcon />
          {t.contact.cta}
        </a>
        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-6 text-sm text-white/70">
          <p>{t.footer}</p>
          <a href={GITHUB_URL} className="underline underline-offset-4 hover:text-white">
            {t.contact.github}
          </a>
        </div>
      </div>
    </footer>
  );
}

function TelegramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor">
      <path d="M21.9 4.3c.3-1.3-.5-1.8-1.4-1.5L2.8 9.6c-1.2.5-1.2 1.2-.2 1.5l4.5 1.4 1.7 5.3c.2.6.1.8.7.8.5 0 .7-.2 1-.5l2.2-2.1 4.6 3.4c.8.5 1.4.2 1.6-.8l3-12.4ZM8.6 12.1l9.7-6.1c.5-.3.9-.1.5.2l-8.2 7.4-.3 3.5-1.7-5Z" />
    </svg>
  );
}
