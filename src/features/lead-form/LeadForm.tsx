import { useCallback, useState, type ChangeEvent } from "react";
import { createLead } from "../../shared/api/bitrix";
import "./lead-form.less";

const cls = "leadForm";

type LeadFormProps = {
  tripTitle: string;
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

const LeadForm = ({ tripTitle }: LeadFormProps) => {
  const [leadName, setLeadName] = useState<string>("");
  const [leadPhone, setLeadPhone] = useState<string>("");
  const [leadTg, setLeadTg] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

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

      const tgGlobal = window as unknown as { Telegram?: { WebApp?: unknown } };
      const isTg = Boolean(tgGlobal?.Telegram?.WebApp);

      await createLead({
        title: `Заявка: ${tripTitle}`,
        name: leadName,
        phones: [{ value: leadPhone, valueType: "MOBILE" }],
        comments: leadTg ? `Telegram: ${leadTg}` : undefined,
        sourceId: isTg ? "TELEGRAM" : "WEB",
      });

      setSent(true);
    } catch {
      setErrorMsg("Не удалось отправить. Попробуйте позже.");
    } finally {
      setSending(false);
    }
  }, [sending, leadName, leadPhone, leadTg, tripTitle]);

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
          ? "Отправлено! Мы свяжемся с вами."
          : sending
          ? "Отправка…"
          : "Отправить"}
      </button>
    </div>
  );
};

export { LeadForm };
