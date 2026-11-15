import {
  content,
  GITHUB_URL,
  localeLabel,
  localePath,
  locales,
  TELEGRAM_URL,
  type ChatLine,
  type Locale,
  type Service,
  type SiteContent,
} from "@/content/site";
import { Cursor } from "./Cursor";
import { HeroScene } from "./HeroScene";
import { Mission } from "./Mission";
import { Scene } from "./Scene";
import { Stats } from "./Stats";
import { WorkArena } from "./WorkArena";

interface SitePageProps {
  locale: Locale;
}

export function SitePage({ locale }: SitePageProps) {
  const t = content[locale];

  return (
    <div className="grain">
      <Cursor />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[95] focus:bg-bg focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Header t={t} locale={locale} />
      <main id="main">
        <HeroScene
          eyebrow={t.hero.eyebrow}
          scroll={t.hero.scroll}
          title={t.hero.title}
          lead={t.hero.lead}
          cta={t.hero.cta}
          secondary={t.hero.secondary}
          telegramUrl={TELEGRAM_URL}
          chips={t.chips}
        />
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-8 md:py-24">
          <Stats items={t.stats} />
        </section>
        <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-8 md:pb-40">
          <Mission text={t.mission} />
        </section>
        <Scene
          src="/scenes/desk.webp"
          alt=""
          title={t.story.desk.title}
          text={t.story.desk.text}
        />
        <Services t={t} />
        <Scene
          src="/scenes/laptop.webp"
          alt=""
          title={t.story.live.title}
          text={t.story.live.text}
          align="right"
        />
        <Work t={t} />
        <Process t={t} />
        <Scene src="/scenes/portrait.webp" alt={t.name} title={t.contact.title} text={t.contact.text}>
          <a
            href={TELEGRAM_URL}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-saffron px-7 py-4 font-display text-base font-semibold text-bg transition-colors hover:bg-white sm:text-lg"
          >
            <TelegramIcon />
            {t.contact.cta}
          </a>
        </Scene>
      </main>
      <Contact t={t} />
    </div>
  );
}

function Header({ t, locale }: { t: SiteContent; locale: Locale }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-bg/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-3 sm:px-8">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight">
          {t.name}
        </a>
        <nav aria-label="Main" className="order-3 w-full sm:order-none sm:w-auto">
          <ul className="flex gap-5 overflow-x-auto text-[0.95rem] text-fg-soft">
            <li>
              <a className="hover:text-fg" href="#services">
                {t.nav.services}
              </a>
            </li>
            <li>
              <a className="hover:text-fg" href="#work">
                {t.nav.work}
              </a>
            </li>
            <li>
              <a className="hover:text-fg" href="#process">
                {t.nav.process}
              </a>
            </li>
            <li>
              <a className="hover:text-fg" href="#contact">
                {t.nav.contact}
              </a>
            </li>
          </ul>
        </nav>
        <LanguageSwitch current={locale} />
      </div>
    </header>
  );
}

function LanguageSwitch({ current }: { current: Locale }) {
  return (
    <ul className="flex rounded-full bg-white/8 p-1 text-sm font-medium" aria-label="Language">
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
                  ? "block rounded-full bg-saffron px-3 py-1 text-bg"
                  : "block rounded-full px-3 py-1 text-fg-soft hover:text-fg"
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

function PhoneChat({ t }: { t: SiteContent }) {
  const lineDelay = (index: number): string => `${300 + index * 650}ms`;
  const buttonsDelay = lineDelay(t.chat.lines.length);

  return (
    <div className="relative mx-auto w-full max-w-[20rem]" aria-hidden="true">
      <div className="absolute -inset-x-3 -bottom-6 top-10 -z-10 rounded-[3rem] bg-turquoise/15 blur-2xl" />
      <div className="rounded-[2.6rem] bg-[#1b2a57] p-2.5 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.8)]">
        <div className="overflow-hidden rounded-[2.1rem] bg-[#c9d8e8] text-[#10204a]">
          <div className="flex items-center gap-3 bg-white px-5 pb-3 pt-6">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-saffron font-display text-sm font-bold">
              B
            </span>
            <div className="leading-tight">
              <p className="font-semibold">{t.chat.botName}</p>
              <p className="text-sm text-[#4a5878]">{t.chat.status}</p>
            </div>
          </div>
          <div className="flex min-h-[19rem] flex-col justify-end gap-2.5 px-4 pb-5 pt-6">
            {t.chat.lines.map((line, index) => (
              <Bubble key={`${line.from}-${index}`} line={line} delay={lineDelay(index)} />
            ))}
            <div className="chat-line grid grid-cols-3 gap-2" style={{ animationDelay: buttonsDelay }}>
              {t.chat.buttons.map((label) => (
                <span
                  key={label}
                  className="rounded-xl bg-white/80 py-2 text-center text-[0.95rem] font-semibold text-cobalt-deep"
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
          ? "chat-line max-w-[80%] self-end rounded-2xl rounded-br-md bg-[#d8f2ee] px-3.5 py-2 text-[0.95rem]"
          : "chat-line max-w-[85%] self-start rounded-2xl rounded-bl-md bg-white px-3.5 py-2 text-[0.95rem]"
      }
      style={{ animationDelay: delay }}
    >
      {line.text}
    </p>
  );
}

function Services({ t }: { t: SiteContent }) {
  return (
    <section id="services" className="scroll-mt-16 bg-bg-2">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-8 md:py-28 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-[-0.02em] sm:text-5xl">{t.services.title}</h2>
          <p className="mt-4 max-w-[38rem] text-fg-soft">{t.services.note}</p>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {t.services.items.map((service) => (
              <ServiceRow key={service.name} service={service} fromLabel={t.services.from} />
            ))}
          </ul>
        </div>
        <div className="lg:sticky lg:top-24">
          <PhoneChat t={t} />
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ service, fromLabel }: { service: Service; fromLabel: string }) {
  return (
    <li className="py-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
        <h3 className="font-display text-lg font-semibold sm:text-xl">{service.name}</h3>
        <span className="leader hidden h-3 flex-1 sm:block" />
        <p className="shrink-0 font-display text-lg font-semibold whitespace-nowrap text-saffron sm:text-right sm:text-xl">
          {fromLabel ? <span className="mr-1.5 font-sans text-base font-normal text-fg-soft">{fromLabel}</span> : null}
          {service.price}
        </p>
      </div>
      <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-8">
        <p className="max-w-[40rem] text-fg-soft">{service.includes}</p>
        <p className="shrink-0 text-sm font-medium text-turquoise sm:text-base">{service.time}</p>
      </div>
    </li>
  );
}

function Work({ t }: { t: SiteContent }) {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20 sm:px-8 md:py-28">
      <h2 className="font-display text-3xl font-bold tracking-[-0.02em] sm:text-5xl">{t.work.title}</h2>
      <p className="mt-4 text-fg-soft">{t.work.lead}</p>
      <WorkArena
        items={t.work.items}
        labels={{ hint: t.work.hint, demo: t.work.demo, code: t.work.code, close: t.work.close }}
      />
    </section>
  );
}

function Process({ t }: { t: SiteContent }) {
  return (
    <section id="process" className="scroll-mt-16 bg-bg-2">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-8 md:py-28">
        <h2 className="font-display text-3xl font-bold tracking-[-0.02em] sm:text-5xl">{t.process.title}</h2>
        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {t.process.steps.map((step, index) => (
            <li key={step.title} className="border-t border-line pt-5">
              <span className="font-display text-5xl font-bold text-cobalt/60">{index + 1}</span>
              <h3 className="mt-2 font-display text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-fg-soft">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Contact({ t }: { t: SiteContent }) {
  return (
    <footer id="contact" className="border-t border-white/10 bg-bg">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-fg-soft sm:px-8">
        <p>{t.footer}</p>
        <div className="flex gap-6">
          <a href={TELEGRAM_URL} className="underline underline-offset-4 hover:text-fg">
            Telegram
          </a>
          <a href={GITHUB_URL} className="underline underline-offset-4 hover:text-fg">
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
