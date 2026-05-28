import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ua";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.about": "About",
  "nav.services": "Services",
  "nav.work": "Work",
  "nav.clients": "Clients",
  "nav.faq": "FAQ",
  "nav.cta": "Let's talk",

  "hero.badge": "Available for Q1 2026 partnerships",
  "hero.title.1": "Building",
  "hero.title.2": "premium brands",
  "hero.title.3": "that scale beyond noise.",
  "hero.intro": "I'm Andrii Kurshatsov — strategist & product developer partnering with founders to launch digital products that feel inevitable.",
  "hero.cta.primary": "Start a project",
  "hero.cta.telegram": "Telegram",
  "hero.stats.projects": "Projects shipped",
  "hero.stats.years": "Years of craft",
  "hero.stats.industries": "Industries",
  "hero.currently": "Currently",
  "hero.currently.text": "Designing the next wave of consumer fintech",
  "hero.scroll": "Scroll",

  "about.kicker": "About",
  "about.title": "Nine years of obsession with the details that make products feel premium.",
  "about.body": "I work at the intersection of strategy, brand and product. My belief is simple — clarity converts. Every pixel, motion, and word has a job.",
  "about.skill.1": "Brand strategy",
  "about.skill.2": "Product design",
  "about.skill.3": "Design systems",
  "about.skill.4": "Motion & 3D",
  "about.tl.1.title": "Started independent practice",
  "about.tl.1.desc": "First studio retainer with a Berlin SaaS.",
  "about.tl.2.title": "Led design at Series-B fintech",
  "about.tl.2.desc": "Scaled product surface from 4 to 38 modules.",
  "about.tl.3.title": "Founded studio of 6",
  "about.tl.3.desc": "Partnered with founders across EU, UK, US.",
  "about.tl.4.title": "Strategic advisor",
  "about.tl.4.desc": "Helping 12+ teams ship category-defining work.",

  "services.kicker": "Services",
  "services.title": "Senior craft, applied to the problems that actually move the needle.",
  "services.cta": "Discuss scope",
  "services.1.title": "Brand Strategy",
  "services.1.desc": "Positioning, narrative and identity systems for founders ready to be unmistakable.",
  "services.1.price": "from €8k",
  "services.2.title": "Product Design",
  "services.2.desc": "End-to-end product surfaces — research, UX, UI and design systems that engineers love.",
  "services.2.price": "from €12k",
  "services.3.title": "Launch & Web",
  "services.3.desc": "Premium marketing sites with motion, copy, and conversion architecture built in.",
  "services.3.price": "from €6k",
  "services.4.title": "Growth Advisory",
  "services.4.desc": "Fractional design leadership for funded teams scaling 0 → 1 → 10.",
  "services.4.price": "monthly retainer",

  "work.kicker": "Selected Work",
  "work.title": "A few partners. Many quiet wins.",
  "work.archive": "Full archive",
  "work.1.desc": "Private wealth platform — brand, app, motion.",
  "work.2.desc": "AI workflow editor for ops teams.",
  "work.3.desc": "DTC headphones — full launch.",
  "work.4.desc": "Identity layer & marketing OS.",

  "stats.1": "Products shipped",
  "stats.2": "Client revenue influenced",
  "stats.3": "Years in practice",
  "stats.4": "Repeat partnerships",

  "tst.kicker": "Words from partners",
  "tst.title": "Quiet conviction. Loud results.",
  "tst.1": "Andrii reframed our entire positioning in three weeks. We closed our Series A with the deck he helped us build.",
  "tst.2": "The most strategic designer I've ever worked with. Ships at the bar of a top product studio, communicates like a founder.",
  "tst.3": "Our launch quarter beat plan by 220%. The brand world Andrii built carried the entire campaign.",

  "faq.kicker": "FAQ",
  "faq.title": "Common questions, honest answers.",
  "faq.1.q": "How do engagements typically start?",
  "faq.1.a": "We begin with a 30-minute fit call, then a paid discovery sprint (1–2 weeks) to align on scope, success metrics and timeline.",
  "faq.2.q": "Do you work solo or with a team?",
  "faq.2.a": "Both. Brand and strategy work I lead personally; larger product engagements bring in a vetted studio team of 2–6 senior craftspeople.",
  "faq.3.q": "What's your typical timeline?",
  "faq.3.a": "Brand sprints: 4–6 weeks. Product MVPs: 8–14 weeks. Ongoing retainers start at 3 months.",
  "faq.4.q": "Where are you based?",
  "faq.4.a": "Kyiv-based, working with founders across EU, UK and the Americas. Async-first with weekly syncs.",
  "faq.5.q": "Do you take equity?",
  "faq.5.a": "Selectively. For exceptional teams I'm open to a blended cash + equity arrangement.",

  "contact.kicker": "Contact",
  "contact.title": "Write to me",
  "contact.body": "I'll answer all your questions.",
  "contact.form.name": "Name",
  "contact.form.email": "Email",
  "contact.form.message": "Message",
  "contact.send": "Send",
  "contact.success.title": "Message received.",
  "contact.success.body": "I'll get back to you within 24 hours — usually faster.",
  "contact.socials": "Find me",
  "contact.quick": "Quick contact: Telegram or Instagram",

  "brief.kicker": "BRIEF",
  "brief.title": "Fill out the brief — I'll get back to you",
  "brief.service": "Service",
  "brief.svc.1": "AI songs for business",
  "brief.svc.2": "Video clips",
  "brief.svc.3": "Video ads",
  "brief.svc.4": "Websites for business",
  "brief.desc": "Description — what you want to get",
  "brief.desc.placeholder": "Tell about the task, brand, references, desired style and deadline…",
  "brief.name": "Name (optional)",
  "brief.channel": "Contact channel",
  "brief.channel.phone": "Phone",
  "brief.contact": "Contact",
  "brief.submit": "Send brief",
  "brief.sent": "Brief sent. I'll be in touch soon.",

  "footer.rights": "All rights reserved.",
};

const ua: Dict = {
  "nav.about": "Про мене",
  "nav.services": "Послуги",
  "nav.work": "Кейси",
  "nav.clients": "Клієнти",
  "nav.faq": "FAQ",
  "nav.cta": "Обговорити",

  "hero.badge": "Відкритий до партнерств у Q1 2026",
  "hero.title.1": "Створюю",
  "hero.title.2": "преміальні бренди,",
  "hero.title.3": "що зростають поза шумом.",
  "hero.intro": "Я — Андрій Куршацов, стратег і продуктовий розробник. Партнерюся із засновниками, щоб запускати цифрові продукти, які виглядають невідворотно.",
  "hero.cta.primary": "Розпочати проєкт",
  "hero.cta.telegram": "Телеграм",
  "hero.stats.projects": "Запущених продуктів",
  "hero.stats.years": "Років практики",
  "hero.stats.industries": "Індустрій",
  "hero.currently": "Зараз",
  "hero.currently.text": "Створюю нову хвилю споживчого фінтеху",
  "hero.scroll": "Гортайте",

  "about.kicker": "Про мене",
  "about.title": "Дев'ять років одержимості деталями, які роблять продукти преміальними.",
  "about.body": "Я працюю на перетині стратегії, бренду й продукту. Моя віра проста — ясність конвертує. Кожен піксель, рух і слово мають свою задачу.",
  "about.skill.1": "Бренд-стратегія",
  "about.skill.2": "Продуктовий дизайн",
  "about.skill.3": "Дизайн-системи",
  "about.skill.4": "Motion і 3D",
  "about.tl.1.title": "Старт самостійної практики",
  "about.tl.1.desc": "Перший постійний контракт із берлінським SaaS.",
  "about.tl.2.title": "Дизайн-лід у фінтеху Series-B",
  "about.tl.2.desc": "Масштабував продукт із 4 до 38 модулів.",
  "about.tl.3.title": "Заснував студію з 6 людей",
  "about.tl.3.desc": "Працюю з фаундерами ЄС, Великої Британії та США.",
  "about.tl.4.title": "Стратегічний радник",
  "about.tl.4.desc": "Допомагаю 12+ командам створювати знакові продукти.",

  "services.kicker": "Послуги",
  "services.title": "Зрілий ремесло, застосоване до задач, що реально рухають метрики.",
  "services.cta": "Обговорити обсяг",
  "services.1.title": "Бренд-стратегія",
  "services.1.desc": "Позиціювання, наратив та айдентика для фаундерів, готових бути впізнаваними.",
  "services.1.price": "від €8тис.",
  "services.2.title": "Продуктовий дизайн",
  "services.2.desc": "Повний цикл — дослідження, UX, UI і дизайн-системи, які люблять інженери.",
  "services.2.price": "від €12тис.",
  "services.3.title": "Лендинг і запуск",
  "services.3.desc": "Преміальні сайти з моушеном, копірайтом та архітектурою конверсії.",
  "services.3.price": "від €6тис.",
  "services.4.title": "Growth-консалтинг",
  "services.4.desc": "Фракційне лідерство дизайну для профінансованих команд 0 → 1 → 10.",
  "services.4.price": "місячний ретейнер",

  "work.kicker": "Вибрані роботи",
  "work.title": "Кілька партнерів. Багато тихих перемог.",
  "work.archive": "Повний архів",
  "work.1.desc": "Платформа приватного капіталу — бренд, застосунок, моушен.",
  "work.2.desc": "AI-редактор робочих процесів для ops-команд.",
  "work.3.desc": "DTC-навушники — повний запуск.",
  "work.4.desc": "Identity-протокол і маркетинг-OS.",

  "stats.1": "Запущених продуктів",
  "stats.2": "Виручки клієнтів",
  "stats.3": "Років практики",
  "stats.4": "Повторних партнерств",

  "tst.kicker": "Слова партнерів",
  "tst.title": "Тиха впевненість. Гучні результати.",
  "tst.1": "Андрій переосмислив наше позиціювання за три тижні. Ми закрили Series A з пітч-деком, який створили разом.",
  "tst.2": "Найбільш стратегічний дизайнер, з яким я працював. Якість топ-студії, комунікація фаундера.",
  "tst.3": "Квартал запуску перевищив план на 220%. Бренд-світ Андрія тримав усю кампанію.",

  "faq.kicker": "FAQ",
  "faq.title": "Поширені питання, чесні відповіді.",
  "faq.1.q": "Як зазвичай починається співпраця?",
  "faq.1.a": "Спершу 30-хвилинний дзвінок-знайомство, потім платний discovery-спринт (1–2 тижні) для узгодження обсягу, метрик і термінів.",
  "faq.2.q": "Працюєш сам чи з командою?",
  "faq.2.a": "І так, і так. Бренд і стратегію веду особисто; більші продуктові проєкти підсилюю студією з 2–6 сеньйорів.",
  "faq.3.q": "Які типові терміни?",
  "faq.3.a": "Бренд-спринти: 4–6 тижнів. Продуктові MVP: 8–14 тижнів. Ретейнери — від 3 місяців.",
  "faq.4.q": "Де ти базуєшся?",
  "faq.4.a": "Київ. Працюю з фаундерами ЄС, Великої Британії та Америки. Async-first з тижневими синками.",
  "faq.5.q": "Береш частку (equity)?",
  "faq.5.a": "Вибірково. Для виняткових команд відкритий до комбінації cash + equity.",

  "contact.kicker": "Зв'язатися",
  "contact.title": "Напишіть мені",
  "contact.body": "Відповім на всі ваші питання.",
  "contact.form.name": "Ім'я",
  "contact.form.email": "Email",
  "contact.form.message": "Повідомлення",
  "contact.send": "Надіслати",
  "contact.success.title": "Повідомлення отримано.",
  "contact.success.body": "Відповім протягом 24 годин — зазвичай швидше.",
  "contact.socials": "Знайди мене",
  "contact.quick": "Швидкий зв'язок: Telegram або Instagram",

  "brief.kicker": "БРИФ",
  "brief.title": "Заповніть бриф — і я зв'яжуся з вами",
  "brief.service": "Послуга",
  "brief.svc.1": "ШІ-пісні для бізнесу",
  "brief.svc.2": "Відеокліпи",
  "brief.svc.3": "Відеореклама",
  "brief.svc.4": "Сайти для бізнесу",
  "brief.desc": "Опис — що ви хочете отримати",
  "brief.desc.placeholder": "Розкажіть про задачу, бренд, референси, бажаний стиль і дедлайн…",
  "brief.name": "Ім'я (необов'язково)",
  "brief.channel": "Канал зв'язку",
  "brief.channel.phone": "Телефон",
  "brief.contact": "Контакт",
  "brief.submit": "Надіслати бриф",
  "brief.sent": "Бриф надіслано. Скоро зв'яжуся.",

  "footer.rights": "Усі права захищені.",
};

const dicts: Record<Lang, Dict> = { en, ua };

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (stored === "en" || stored === "ua") {
      setLangState(stored);
    } else if (typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("uk")) {
      setLangState("ua");
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang === "ua" ? "uk" : "en";
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (k: string) => dicts[lang][k] ?? dicts.en[k] ?? k;

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
