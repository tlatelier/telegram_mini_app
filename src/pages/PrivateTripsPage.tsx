import { useMemo, useState } from 'react';
import { Button } from '../components/Button';
import { createLead } from '../services/bitrix';
import './private-trips.less';

const cls = 'privateTrips';

type ChipValue = string;

const DURATION: ChipValue[] = ['3–5 дней', '6–9 дней', '10–14 дней'];
const GROUP: ChipValue[] = ['Соло', 'Пара', 'Семья', 'Компания'];
const INTERESTS: ChipValue[] = ['Гастрономия', 'Природа', 'Архитектура', 'Арт', 'Вино'];
const COMFORT: ChipValue[] = ['4*', '5*', 'Бутик'];
const BUDGET: ChipValue[] = ['1000$', '2000$', '3000+$'];

type CaseCard = { id: string; title: string; meta: string; img: string; highlights: string[] };
const CASES: CaseCard[] = [
    { id: 'c1', title: 'Тоскана на двоих', meta: '7 дней · 3 города · от 1800$', img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format', highlights: ['Винодельни', 'Медленные города', 'Бутик‑отели'] },
    { id: 'c2', title: 'Япония: от Киото до океана', meta: '9 дней · 4 города · от 3200$', img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1600&auto=format', highlights: ['Чайные церемонии', 'Рёканы', 'Природные бани'] },
    { id: 'c3', title: 'Камчатка эксплор', meta: '6 дней · 2 локации · от 2500$', img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format', highlights: ['Вертолётные туры', 'Медведи и гейзеры', 'Тёплые источники'] },
];

const BENEFITS: { title: string; text: string }[] = [
    { title: 'Личный куратор', text: 'На связи 24/7 до и во время поездки' },
    { title: 'Гибкий маршрут', text: 'Под интересы, темп и бюджет' },
    { title: 'Эксклюзивный доступ', text: 'Места и активности без толп' },
    { title: 'Надёжная логистика', text: 'Перелёты, трансферы, отели — всё под контролем' },
    { title: 'Проверенные гиды', text: 'Локальные эксперты и аутентичные опыты' },
    { title: 'Безопасность', text: 'Страхование и поддержка на маршруте' },
];

const STEPS: { num: number; title: string; text: string }[] = [
    { num: 1, title: 'Бриф', text: 'Короткая анкета и созвон для понимания запросов' },
    { num: 2, title: 'Предложение', text: 'Через 24 часа отправим маршрут и смету' },
    { num: 3, title: 'Согласование', text: 'Уточняем детали и бронируем' },
    { num: 4, title: 'Сопровождение', text: 'Куратор с вами 24/7 на связи' },
];

const INCLUDES: string[] = ['Проживание', 'Индивидуальная программа', 'Сопровождение куратора', 'Трансферы по маршруту'];
const EXCLUDES: string[] = ['Авиабилеты', 'Часть питания', 'Личные расходы'];

const INSPIRATION: string[] = [
    'https://images.unsplash.com/photo-1488740304459-45c4277a3e56?q=80&w=1200&auto=format',
    'https://images.unsplash.com/photo-1549880181-56a44cf4a9a7?q=80&w=1200&auto=format',
    'https://images.unsplash.com/photo-1530629013299-6cb10c1c0f6b?q=80&w=1200&auto=format',
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format',
];

const FAQ_ITEMS: { q: string; a: string }[] = [
    { q: 'Сколько времени занимает подготовка?', a: 'Первое предложение — в течение 24 часов после брифа.' },
    { q: 'Можно менять маршрут в процессе?', a: 'Да, мы гибко адаптируем программу под вас.' },
    { q: 'Как происходит оплата?', a: 'Предоплата для брони и прозрачная смета с этапами.' },
    { q: 'Работаете с особыми запросами?', a: 'Да, учтём предпочтения по питанию, доступности и т.д.' },
    { q: 'Делаете визовую поддержку?', a: 'Поможем с документами и страховкой при необходимости.' },
];

const PrivateTripsPage = () => {
    const [duration, setDuration] = useState<ChipValue | null>(null);
    const [group, setGroup] = useState<ChipValue | null>(null);
    const [interests, setInterests] = useState<ChipValue[]>([]);
    const [comfort, setComfort] = useState<ChipValue | null>(null);
    const [budget, setBudget] = useState<ChipValue | null>(null);

    const toggleInterest = (value: ChipValue) => {
        setInterests((prev) => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    };

    const summary = useMemo(() => {
        return [duration, group, interests.join(', '), comfort, budget].filter(Boolean).join(' · ');
    }, [duration, group, interests, comfort, budget]);

    const scrollToForm = () => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };
    const scrollToPrefs = () => {
        document.getElementById('prefs')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={cls}>
            <section className={`${cls}__hero`}>
                <h1 className={`${cls}__heroTitle`}>Частные путешествия под вас</h1>
                <div className={`${cls}__heroSub`}>Маршрут за 24 часа · Личный куратор 24/7 · Премиум‑логистика</div>
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
                        {DURATION.map(v => (
                            <button key={v} className={`${cls}__chip${duration === v ? ` ${cls}__chip--active` : ''}`} onClick={() => setDuration(duration === v ? null : v)}>{v}</button>
                        ))}
                    </div>
                </div>
                <div className={`${cls}__prefsGroup`}>
                    <div className={`${cls}__prefsLabel`}>Состав</div>
                    <div className={`${cls}__chips`}>
                        {GROUP.map(v => (
                            <button key={v} className={`${cls}__chip${group === v ? ` ${cls}__chip--active` : ''}`} onClick={() => setGroup(group === v ? null : v)}>{v}</button>
                        ))}
                    </div>
                </div>
                <div className={`${cls}__prefsGroup`}>
                    <div className={`${cls}__prefsLabel`}>Интересы</div>
                    <div className={`${cls}__chips`}>
                        {INTERESTS.map(v => (
                            <button key={v} className={`${cls}__chip${interests.includes(v) ? ` ${cls}__chip--active` : ''}`} onClick={() => toggleInterest(v)}>{v}</button>
                        ))}
                    </div>
                </div>
                <div className={`${cls}__prefsGroup`}>
                    <div className={`${cls}__prefsLabel`}>Комфорт</div>
                    <div className={`${cls}__chips`}>
                        {COMFORT.map(v => (
                            <button key={v} className={`${cls}__chip${comfort === v ? ` ${cls}__chip--active` : ''}`} onClick={() => setComfort(comfort === v ? null : v)}>{v}</button>
                        ))}
                    </div>
                </div>
                <div className={`${cls}__prefsGroup`}>
                    <div className={`${cls}__prefsLabel`}>Бюджет</div>
                    <div className={`${cls}__chips`}>
                        {BUDGET.map(v => (
                            <button key={v} className={`${cls}__chip${budget === v ? ` ${cls}__chip--active` : ''}`} onClick={() => setBudget(budget === v ? null : v)}>{v}</button>
                        ))}
                    </div>
                </div>
                {summary && (
                    <div className={`${cls}__prefsSummary`}>{summary}</div>
                )}
                <div className={`${cls}__prefsCta`}>
                    <Button text="Сформировать предложение" callback={scrollToForm} active />
                </div>
            </section>

            <section className={`${cls}__cases`}>
                <h2 className={`${cls}__sectionTitle`}>Примеры маршрутов</h2>
                <div className={`${cls}__caseGrid`}>
                    {CASES.map(c => (
                        <div key={c.id} className={`${cls}__case`}>
                            <div className={`${cls}__caseImage`} style={{ backgroundImage: `url(${c.img})` }} />
                            <div className={`${cls}__caseBody`}>
                                <div className={`${cls}__caseTitle`}>{c.title}</div>
                                <div className={`${cls}__caseMeta`}>{c.meta}</div>
                                <ul className={`${cls}__caseHighlights`}>
                                    {c.highlights.map((h, i) => (<li key={i}>{h}</li>))}
                                </ul>
                                <div className={`${cls}__caseActions`}>
                                    <Button text="Смотреть маршрут" callback={scrollToForm} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className={`${cls}__benefits`}>
                <h2 className={`${cls}__sectionTitle`}>Почему частные туры с нами</h2>
                <div className={`${cls}__benefitGrid`}>
                    {BENEFITS.map((b, i) => (
                        <div key={i} className={`${cls}__benefit`}>
                            <div className={`${cls}__benefitIcon`} />
                            <div className={`${cls}__benefitTitle`}>{b.title}</div>
                            <div className={`${cls}__benefitText`}>{b.text}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className={`${cls}__process`}>
                <h2 className={`${cls}__sectionTitle`}>Как мы работаем</h2>
                <div className={`${cls}__steps`}>
                    {STEPS.map(s => (
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

            <section className={`${cls}__inclusions`}>
                <h2 className={`${cls}__sectionTitle`}>Что включено</h2>
                <div className={`${cls}__inclWrap`}>
                    <ul className={`${cls}__list ${cls}__list--ok`}>
                        {INCLUDES.map((i, idx) => (<li key={idx}>{i}</li>))}
                    </ul>
                    <ul className={`${cls}__list ${cls}__list--no`}>
                        {EXCLUDES.map((i, idx) => (<li key={idx}>{i}</li>))}
                    </ul>
                </div>
            </section>

            <section className={`${cls}__inspiration`}>
                <h2 className={`${cls}__sectionTitle`}>Вдохновение</h2>
                <div className={`${cls}__inspGrid`}>
                    {INSPIRATION.map((src, i) => (
                        <div key={i} className={`${cls}__inspItem`}>
                            <img className={`${cls}__inspImg`} src={src} alt="inspiration" loading="lazy" />
                        </div>
                    ))}
                </div>
            </section>

            <section className={`${cls}__reviews`}>
                <h2 className={`${cls}__sectionTitle`}>Отзывы</h2>
                <div className={`${cls}__reviewList`}>
                    <div className={`${cls}__review`}>
                        <div className={`${cls}__reviewText`}>«Идеально собрали маршрут, всё чётко по времени и без суеты. Лучшее путешествие!»</div>
                        <div className={`${cls}__reviewMeta`}>Анна, Италия · 2024</div>
                    </div>
                    <div className={`${cls}__review`}>
                        <div className={`${cls}__reviewText`}>«Внимание к деталям на каждом этапе. Куратор всегда был на связи.»</div>
                        <div className={`${cls}__reviewMeta`}>Дмитрий, Япония · 2023</div>
                    </div>
                </div>
            </section>

            <section className={`${cls}__faq`}>
                <h2 className={`${cls}__sectionTitle`}>FAQ</h2>
                <FaqInline />
            </section>

            <section id="lead-form" className={`${cls}__form`}>
                <h2 className={`${cls}__sectionTitle`}>Оставить заявку</h2>
                <LeadForm />
            </section>
        </div>
    );
};

const FaqInline = () => {
    const [openIdx, setOpenIdx] = useState<number | null>(0);
    return (
        <div className={`${cls}__faqList`}>
            {FAQ_ITEMS.map((it, i) => {
                const open = openIdx === i;
                return (
                    <div key={i} className={`${cls}__faqItem`}>
                        <button className={`${cls}__faqQ`} onClick={() => setOpenIdx(open ? null : i)} aria-expanded={open}>
                            {it.q}
                        </button>
                        {open && <div className={`${cls}__faqA`}>{it.a}</div>}
                    </div>
                );
            })}
        </div>
    );
};

export {
    PrivateTripsPage,
};
const LeadForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [tg, setTg] = useState('');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [err, setErr] = useState('');

    return (
        <div className={`${cls}__form`}>
            <input className={`${cls}__input`} placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} required />
            <input className={`${cls}__input`} placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <input className={`${cls}__input`} placeholder="Telegram" value={tg} onChange={(e) => setTg(e.target.value)} />
            {err && <div style={{ color: '#a6533f' }}>{err}</div>}
            {sent ? (
                <div className={`${cls}__submit`}>Отправлено! Мы свяжемся с вами.</div>
            ) : (
                <Button
                    text={sending ? 'Отправка…' : 'Отправить'}
                    active
                    callback={async () => {
                        if (sending) return;
                        setErr('');
                        if (!name || !phone) {
                            setErr('Заполните имя и телефон');
                            return;
                        }
                        try {
                            setSending(true);
                            const isTg = Boolean((window as any)?.Telegram?.WebApp);
                            await createLead({
                                title: 'Заявка: Частные путешествия',
                                name,
                                phones: [{ value: phone, valueType: 'MOBILE' }],
                                comments: tg ? `Telegram: ${tg}` : undefined,
                                sourceId: isTg ? 'TELEGRAM' : 'WEB',
                            });
                            setSent(true);
                        } catch (e) {
                            setErr('Не удалось отправить. Попробуйте позже.');
                        } finally {
                            setSending(false);
                        }
                    }}
                />
            )}
        </div>
    );
};



