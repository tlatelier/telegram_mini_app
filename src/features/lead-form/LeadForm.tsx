import { useCallback, useState, type ChangeEvent } from "react";
import { createLead } from "../../shared/api/services/bitrix";
import { GROUP_STRUCTURE_FIELDS, TEMPO_FIELDS, BUDGET_FIELDS } from "../../shared/api/services/bitrix/enumeration";
import "./lead-form.less"

const cls = "leadForm";

type LeadFormProps = {
  // Для групповых туров
  tripDuration?: string;
  tripTitle?: string;

  // Для индивидуальных предпочтений (PrivateTripsPage)
  duration?: string | null;
  group?: string | null;
  rate?: string | null;
  interests?: string[];
  budget?: string | null;
};

const extractDigits = (value: string): string => {
  return value.replace(/\D/g, "");
};

const formatDomesticPhone = (raw: string): string => {
  const digits = extractDigits(raw);

  let national = digits;
  const isInternational = digits.startsWith("8") || digits.startsWith("7");

  if (digits.length > 11 || !isInternational) {
    return digits;
  } else if (isInternational) {
    national = digits.replace(/^8|^7/, "+7");
  }

  let masked = "";

  if (national.length > 0) {
    masked += ` ${national.slice(0, 2)}`;
  }

  if (national.length > 2) {
    masked += ` ${national.slice(2, 5)}`;
  }

  if (national.length > 5) {
    masked += ` ${national.slice(5, 8)}`;
  }

  if (national.length > 8) {
    masked += ` ${national.slice(8, 20)}`;
  }

  return masked;
};

const nameRegex = /^[A-Za-zА-Яа-яЁё\s]{2,}$/;

const normalizeTelegram = (raw: string): string => {
  const trimmed = raw.trim();
  const hasAt = trimmed.startsWith("@");
  const letters = trimmed.replace(/[^A-Za-zА-Яа-яЁё\s]/g, "");

  if (!letters.length) {
    return hasAt ? "@" : "";
  }

  return `@${letters}`;
};

const LeadForm = ({ tripDuration, tripTitle, duration, group, rate, interests, budget }: LeadFormProps) => {
  const [leadName, setLeadName] = useState<string>("");
  const [leadPhone, setLeadPhone] = useState<string>("");
  const [leadTg, setLeadTg] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const isGroupTrip = Boolean(tripTitle || tripDuration);
  const groupLabel = tripTitle ?? tripDuration ?? "";
  const leadTitle = isGroupTrip
    ? `[Групповая] ${groupLabel}. ${leadName ? leadName : ""}`
    : `[Индивидуальная] ${leadName ? leadName : ""}`;

  const valueToEnumId = (dictionary: Record<string, string>, value?: string | null): string | undefined => {
    if (!value) {
      return undefined;
    }

    const entry = Object.entries(dictionary).find(([, label]) => label === value);
    return entry ? entry[0] : undefined;
  };
    
  const handleNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const raw = event.target.value;
      const lettersAndSpaces = raw.replace(/[^A-Za-zА-Яа-яЁё\s]/g, "");
      setLeadName(lettersAndSpaces);
    },
    []
  );

  const handlePhoneInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setLeadPhone(formatDomesticPhone(event.target.value));
    },
    []
  );

  const handleTelegramInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setLeadTg(normalizeTelegram(event.target.value));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    if (sending) {
      return;
    }

    setErrorMsg("");

    if (!nameRegex.test(leadName)) {
      setErrorMsg("Имя: буквы и пробелы, минимум 2 символа");

      return;
    }

    if (!leadPhone) {
      setErrorMsg("Заполните телефон");

      return;
    }

    try {
      setSending(true);

      const payload: Parameters<typeof createLead>[0] = {
        title: leadTitle,
        name: leadName,
        phone: leadPhone,
        telegram: leadTg,
        source: "TELEGRAM",
        type: isGroupTrip ? "GROUP" : "INDIVIDUAL",
      };

      // Индивидуальные предпочтения (передаются, если есть)
      const mappedGroupId = valueToEnumId(GROUP_STRUCTURE_FIELDS, group ?? undefined);
      const mappedTempoId = valueToEnumId(TEMPO_FIELDS, rate ?? undefined);
      const mappedBudgetId = valueToEnumId(BUDGET_FIELDS, budget ?? undefined);

      if (!isGroupTrip) {
        if (duration) payload.it_duration = duration;
        if (mappedGroupId) payload.it_group_structure = mappedGroupId;
        if (mappedTempoId) payload.it_tempo = mappedTempoId;
        if (interests && interests.length > 0) payload.it_interests = interests.join(", ");
        if (budget) payload.it_budget = mappedBudgetId;
      }

      await createLead(payload);

      setSent(true);
    } catch {
      setErrorMsg("Не удалось отправить. Попробуйте позже.");
    } finally {
      setSending(false);
    }
  }, [sending, leadName, leadPhone, leadTg, tripDuration, tripTitle, duration, group, rate, interests, budget]);

  return (
    <div id="lead-form" className={`${cls}`}>
      <input
        type="text"
        inputMode="text"
        placeholder="Имя"
        value={leadName}
        autoComplete="name"
        className={`${cls}__input`}
        minLength={2}
        autoCapitalize="words"
        spellCheck={false}
        onChange={handleNameChange}
        required
      />

      <input
        type="tel"
        inputMode="tel"
        placeholder="Телефон"
        value={leadPhone}
        autoComplete="tel"
        className={`${cls}__input`}
        maxLength={20}
        onChange={handlePhoneInput}
        required
      />

      <input
        type="text"
        inputMode="text"
        placeholder="Telegram"
        value={leadTg}
        autoComplete="off"
        className={`${cls}__input`}
        spellCheck={false}
        onChange={handleTelegramInput}
        autoCapitalize="none"
      />

      {errorMsg && <div style={{ color: "#a6533f" }}>{errorMsg}</div>}

      <button className={`${cls}__submit`} onClick={handleSubmit}>
        {sent
          ? "Все получили, уже изучаем!"
          : sending
          ? "Отправка…"
          : "Отправить"}
      </button>
    </div>
  );
};

export { LeadForm };
