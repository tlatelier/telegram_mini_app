import { useMemo, useState } from "react";
import { Button } from "../../shared/ui/button/Button";
import { FAQ } from "../../shared/ui/faq/FAQ.tsx";
import { LeadForm } from "../../features/lead-form/LeadForm.tsx";
import { CaseOverlay } from "../../widgets/case-overlay/CaseOverlay";
import "./private-trips.less";

const cls = "privateTrips";

type ChipValue = string;

type CaseDay = {
  title: string;
  description?: string;
  photo?: string;
};

type CaseCard = {
  id: string;
  title: string;
  meta: string;
  img: string;
  highlights: string[];
  days: CaseDay[];
};

const DURATION: ChipValue[] = ["3–5 дней", "6–9 дней", "10–14 дней"];
const GROUP: ChipValue[] = ["Соло", "Пара", "Семья", "Компания"];
const RATE: ChipValue[] = ["Спокойный", "Сбалансированный", "Активный"];
const INTERESTS: ChipValue[] = [
  "Гастрономия",
  "Природа",
  "Архитектура",
  "Арт",
  "Вино",
  "Концерты",
];
const BUDGET: ChipValue[] = ["до 3000$", "3000-7000$", "более 7000$"];
const CASES: CaseCard[] = [
  {
    id: "c1",
    title: "Тоскана на двоих",
    meta: "7 дней · 3 города · от 1800$",
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format",
    highlights: ["Винодельни", "Медленные города", "Бутик‑отели"],
    days: [
      {
        title: "Флоренция",
        description: "Прогулка по центру, галерея Уффици, авторский ужин.",
        photo:
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format",
      },
      {
        title: "Кьянти",
        description: "Винодельни, дегустации, пасторальные деревни.",
        photo:
          "https://images.unsplash.com/photo-1514894780887-121968d00567?q=80&w=1600&auto=format",
      },
      {
        title: "Сиена",
        description: "Средневековый центр, смотровые, бутик‑отели.",
        photo:
          "https://images.unsplash.com/photo-1469982472965-c7e77fdeb88b?q=80&w=1600&auto=format",
      },
    ],
  },
  {
    id: "c2",
    title: "Япония: от Киото до океана",
    meta: "9 дней · 4 города · от 3200$",
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1600&auto=format",
    highlights: ["Чайные церемонии", "Рёканы", "Природные бани"],
    days: [
      {
        title: "Киото",
        description: "Храмы, сады, чайная церемония, квартал Гион.",
        photo:
          "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1600&auto=format",
      },
      {
        title: "Хаконе",
        description: "Рёканы, онсены, вид на Фудзи, музей Чиёдо.",
        photo:
          "https://images.unsplash.com/photo-1520715392586-0f0d662e3c51?q=80&w=1600&auto=format",
      },
      {
        title: "Камакура",
        description: "Океан, серф, Большой Будда, свежие морепродукты.",
        photo:
          "https://images.unsplash.com/photo-1531263892380-6b6f1b4a9f9c?q=80&w=1600&auto=format",
      },
    ],
  },
  {
    id: "c3",
    title: "Камчатка эксплор",
    meta: "6 дней · 2 локации · от 2500$",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format",
    highlights: ["Вертолётные туры", "Медведи и гейзеры", "Тёплые источники"],
    days: [
      {
        title: "Петропавловск‑Камчатский",
        description: "Знакомство, морская прогулка, крабы.",
        photo:
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format",
      },
      {
        title: "Долина гейзеров",
        description: "Вертолёт, гейзеры, медведи, тёплые источники.",
        photo:
          "https://images.unsplash.com/photo-1520975682060-b1cfe1293a94?q=80&w=1600&auto=format",
      },
    ],
  },
];

const BENEFITS: { title: string; text: string; icon: string }[] = [
  {
    title: "Проверенные партнёры и гиды",
    text: "Надёжные эксперты и лучшие маршруты",
    icon: "🧭",
  },
  {
    title: "Продуманная логистика",
    text: "От трансферов до отелей — всё чётко и без лишних забот",
    icon: "✈️",
  },
  {
    title: "Менеджер 24/7 (опция)",
    text: "Поддержка в любое время, если это нужно",
    icon: "📞",
  },
  {
    title: "Персонализация",
    text: "Каждая поездка — под ваш стиль, интересы и темп",
    icon: "🎯",
  },
  {
    title: "Ответственность за результат",
    text: "Мы гарантируем качество на каждом этапе",
    icon: "✔️",
  },
  {
    title: "Работаем по всему миру",
    text: "От Парижа до Патагонии, от Кейптауна до Токио",
    icon: "🌍",
  },
];

const STEPS: { num: number; title: string; text: string }[] = [
  {
    num: 1,
    title: "Брифинг",
    text: "Обсудим ваши пожелания к поездке — в формате звонка или переписки",
  },
  {
    num: 2,
    title: "Согласование условий",
    text: "Зафиксируем детали сотрудничества, подпишем договор",
  },
  {
    num: 3,
    title: "Черновой маршрут",
    text: "Подготавливаем предварительный вариант путешествия и при необходимости вносим уточнения",
  },
  {
    num: 4,
    title: "Финализация",
    text: "Утверждаем окончательный маршрут и все детали путешествия",
  },
  {
    num: 5,
    title: "Сопровождение (опция)",
    text: "Мы остаёмся на связи во время поездки, чтобы помочь с любыми вопросами",
  },
];

const INSPIRATION: string[] = [
  "images/private/inspiration/private-trip-inspiration-1.webp",
  "images/private/inspiration/private-trip-inspiration-2.webp",
  "images/private/inspiration/private-trip-inspiration-3.webp",
  "images/private/inspiration/private-trip-inspiration-4.webp",
  "images/private/inspiration/private-trip-inspiration-5.webp",
  "images/private/inspiration/private-trip-inspiration-6.webp",
];

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Сколько времени занимает разработка маршрута?",
    a: "Для короткой поездки (2–3 дня) — до 72 часов. Для путешествий на 7–14 дней срок зависит от сложности и деталей запроса: в среднем от 7 до 10 дней.",
  },
  {
    q: "Можно ли менять маршрут в процессе поездки?",
    a: "Да, мы всегда стараемся адаптировать маршрут, если появляется возможность договориться с местными партнёрами. Наша цель — чтобы вам было максимально комфортно.",
  },
  {
    q: "Как происходит оплата услуг?",
    a: "Мы заключаем официальный договор: 50% оплачиваются при старте работы над маршрутом, оставшиеся 50% — после получения полностью готового маршрута.",
  },
  {
    q: "Работаете ли вы с особыми запросами?",
    a: "Да! Мы любим нестандартные идеи и готовы взяться за проект любой сложности. Если вдруг что-то окажется невозможным — мы честно скажем об этом и предложим альтернативу.",
  },
  {
    q: "Осуществляете ли вы визовую поддержку?",
    a: "Да, у нас есть проверенные партнёры по визовым вопросам. Мы поможем с подготовкой документов и подскажем, как пройти процесс максимально легко.",
  },
  {
    q: "Возможно ли взять ребёнка в поездку? От какого возраста?",
    a: "Зависит от маршрута и логистики. В целом мы рекомендуем брать детей от 8 лет и всегда под присмотром родителей. Мы подскажем, какие направления и активности будут наиболее комфортными для семьи.",
  },
  {
    q: "Почему стоит поехать именно с вами?",
    a: "Искренне любим то, что делаем, и вкладываем душу в каждый маршрут. У нас более 20 лет опыта в организации путешествий и мероприятий. Создаём маршруты, которые не просто показывают страну, а делают ваше путешествие уникальным и запоминающимся.",
  }
];

const PrivateTripsPage = () => {
  const [duration, setDuration] = useState<ChipValue | null>(null);
  const [group, setGroup] = useState<ChipValue | null>(null);
  const [rate, setRate] = useState<ChipValue | null>(null);
  const [interests, setInterests] = useState<ChipValue[]>([]);
  const [budget, setBudget] = useState<ChipValue | null>(null);

  const toggleInterest = (value: ChipValue) => {
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const summary = useMemo(() => {
    return [duration, group, rate, interests.join(", "), budget]
      .filter(Boolean)
      .join(" · ");
  }, [duration, group, rate, interests, budget]);

  const scrollToForm = () => {
    document
      .getElementById("lead-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPrefs = () => {
    document.getElementById("prefs")?.scrollIntoView({ behavior: "smooth" });
  };

  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number | null>(
    null
  );

  const [activeDay, setActiveDay] = useState<number>(0);

  const openCase = (idx: number) => {
    setSelectedCaseIndex(idx);
    setActiveDay(0);
  };

  const closeCase = () => {
    setSelectedCaseIndex(null);
    setActiveDay(0);
  };

  const prevDay = () => {
    if (selectedCaseIndex === null) return;
    const daysCount = CASES[selectedCaseIndex].days.length;
    setActiveDay((d) => (d + daysCount - 1) % daysCount);
  };
  
  const nextDay = () => {
    if (selectedCaseIndex === null) return;
    const daysCount = CASES[selectedCaseIndex].days.length;
    setActiveDay((d) => (d + 1) % daysCount);
  };

  return (
    <div className={cls}>
      <section className={`${cls}__hero`}>
        <h1 className={`${cls}__heroTitle`}>Частные путешествия под вас</h1>
        <div className={`${cls}__heroSub`}>
          Продуманный маршрут · Персонализация поездки · Проверенные гиды и партнеры · Поддержка 24/7
        </div>
        <div className={`${cls}__heroActions`}>
          <Button text="Собрать маршрут" callback={scrollToPrefs} active />
          <Button text="Оставить заявку" callback={scrollToForm} />
        </div>
        <div className={`${cls}__heroBadges`}>
          <div className={`${cls}__badge`}>
            <div className={`${cls}__badgeNum`}>4.9/5</div>
            <div className={`${cls}__badgeText`}>Оценка клиентов</div>
          </div>
          <div className={`${cls}__badge`}>
            <div className={`${cls}__badgeNum`}>800+</div>
            <div className={`${cls}__badgeText`}>Гостей в поездках</div>
          </div>
          <div className={`${cls}__badge`}>
            <div className={`${cls}__badgeNum`}>50+</div>
            <div className={`${cls}__badgeText`}>Партнёров по миру</div>
          </div>
        </div>
      </section>

      <section id="prefs" className={`${cls}__prefs`}>
        <h2 className={`${cls}__sectionTitle`}>Ваши предпочтения</h2>
        <div className={`${cls}__prefsGroup`}>
          <div className={`${cls}__prefsLabel`}>Длительность</div>
          <div className={`${cls}__chips`}>
            {DURATION.map((v) => (
              <button
                key={v}
                className={`${cls}__chip${
                  duration === v ? ` ${cls}__chip--active` : ""
                }`}
                onClick={() => setDuration(duration === v ? null : v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <div className={`${cls}__prefsGroup`}>
          <div className={`${cls}__prefsLabel`}>Состав</div>
          <div className={`${cls}__chips`}>
            {GROUP.map((v) => (
              <button
                key={v}
                className={`${cls}__chip${
                  group === v ? ` ${cls}__chip--active` : ""
                }`}
                onClick={() => setGroup(group === v ? null : v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <div className={`${cls}__prefsGroup`}>
          <div className={`${cls}__prefsLabel`}>Темп поездки</div>
          <div className={`${cls}__chips`}>
            {RATE.map((v) => (
              <button
                key={v}
                className={`${cls}__chip${
                  rate === v ? ` ${cls}__chip--active` : ""
                }`}
                onClick={() => setRate(rate === v ? null : v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <div className={`${cls}__prefsGroup`}>
          <div className={`${cls}__prefsLabel`}>Интересы</div>
          <div className={`${cls}__chips`}>
            {INTERESTS.map((v) => (
              <button
                key={v}
                className={`${cls}__chip${
                  interests.includes(v) ? ` ${cls}__chip--active` : ""
                }`}
                onClick={() => toggleInterest(v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <div className={`${cls}__prefsGroup`}>
          <div className={`${cls}__prefsLabel`}>Бюджет поездки</div>
          <div className={`${cls}__chips`}>
            {BUDGET.map((v) => (
              <button
                key={v}
                className={`${cls}__chip${
                  budget === v ? ` ${cls}__chip--active` : ""
                }`}
                onClick={() => setBudget(budget === v ? null : v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        {summary && <div className={`${cls}__prefsSummary`}>{summary}</div>}
        <div className={`${cls}__prefsCta`}>
          <Button
            text="Сформировать предложение"
            callback={scrollToForm}
            active
          />
        </div>
      </section>

      <section className={`${cls}__cases`}>
        <h2 className={`${cls}__sectionTitle`}>Примеры маршрутов</h2>
        <div className={`${cls}__caseGrid`}>
          {CASES.map((c, idx) => (
            <div
            key={c.id}
            onClick={() => openCase(idx)}
            className={`${cls}__case`}
            >
              <div
                className={`${cls}__caseImage`}
                style={{ backgroundImage: `url(${c.img})` }}
              />
              <div className={`${cls}__caseBody`}>
                <div className={`${cls}__caseTitle`}>{c.title}</div>
                <div className={`${cls}__caseMeta`}>{c.meta}</div>
                <ul className={`${cls}__caseHighlights`}>
                  {c.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
                <div className={`${cls}__caseActions`}>
                  <Button
                    text="Смотреть маршрут"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedCaseIndex !== null && (
        <CaseOverlay
          title={CASES[selectedCaseIndex].title}
          meta={CASES[selectedCaseIndex].meta}
          days={CASES[selectedCaseIndex].days}
          active={activeDay}
          onPrev={prevDay}
          onNext={nextDay}
          onClose={closeCase}
        />
      )}

      <section className={`${cls}__benefits`}>
        <h2 className={`${cls}__sectionTitle`}>Почему частные туры с нами</h2>
        <div className={`${cls}__benefitGrid`}>
          {BENEFITS.map((b, i) => (
            <div key={i} className={`${cls}__benefit`}>
              <div className={`${cls}__benefitIcon`}>{b.icon}</div>
              <div className={`${cls}__benefitTitle`}>{b.title}</div>
              <div className={`${cls}__benefitText`}>{b.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={`${cls}__process`}>
        <h2 className={`${cls}__sectionTitle`}>Как мы работаем</h2>
        <div className={`${cls}__steps`}>
          {STEPS.map((s) => (
            <div key={s.num} className={`${cls}__step`}>
              <div className={`${cls}__stepNum`}>{s.num}</div>
              <div className={`${cls}__stepBody`}>
                <div className={`${cls}__stepTitle`}>{s.title}</div>
                <div className={`${cls}__stepText`}>{s.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={`${cls}__reviews`}>
        <h2 className={`${cls}__sectionTitle`}>Отзывы</h2>
        <div className={`${cls}__reviewList`}>
          <div className={`${cls}__review`}>
            <div className={`${cls}__reviewText`}>
              «Идеально собрали маршрут, всё чётко по времени и без суеты.
              Лучшее путешествие!»
            </div>
            <div className={`${cls}__reviewMeta`}>Анна, Италия · 2024</div>
          </div>
          <div className={`${cls}__review`}>
            <div className={`${cls}__reviewText`}>
              «Внимание к деталям на каждом этапе. Куратор всегда был на связи.»
            </div>
            <div className={`${cls}__reviewMeta`}>Дмитрий, Япония · 2023</div>
          </div>
        </div>
      </section>

      <section className={`${cls}__faq`}>
        <h2 className={`${cls}__sectionTitle`}>FAQ</h2>
        <FAQ items={FAQ_ITEMS} />
      </section>

      <section className={`${cls}__form`}>
        <h2 className={`${cls}__sectionTitle`}>Оставить заявку</h2>
        <LeadForm
          duration={duration}
          group={group}
          rate={rate}
          interests={interests}
          budget={budget}
        />
      </section>

      <section className={`${cls}__inspiration`}>
        <h2 className={`${cls}__sectionTitle`}>Вдохновение</h2>
        <div className={`${cls}__inspGrid`}>
          {INSPIRATION.map((src, i) => (
            <div key={i} className={`${cls}__inspItem`}>
              <img
                className={`${cls}__inspImg`}
                src={src}
                alt="inspiration"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export { PrivateTripsPage };
