type TelegramUser = {
    id?: number;
    username?: string;
    first_name?: string;
    last_name?: string;
    language_code?: string;
    is_premium?: boolean;
};

type TelegramChat = {
    id?: number;
    type?: string;
    title?: string;
    username?: string;
};

type TelegramThemeParams = {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_bg_color?: string;
    header_bg_color?: string;
    accent_text_color?: string;
    [key: string]: unknown;
};

type TelegramInitDataUnsafe = {
    user?: TelegramUser;
    receiver?: TelegramUser;
    chat?: TelegramChat;
    chat_type?: string;
    chat_instance?: string;
    query_id?: string;
    start_param?: string;
    can_send_after?: number;
    auth_date?: number;
    hash?: string;
};

type TelegramWebApp = {
    initDataUnsafe?: TelegramInitDataUnsafe;
    initData?: string;
    version?: string;
    platform?: string;
    colorScheme?: 'light' | 'dark';
    themeParams?: TelegramThemeParams;
    isExpanded?: boolean;
    viewportHeight?: number;
    viewportStableHeight?: number;
    headerColor?: string;
    backgroundColor?: string;
};

const getTelegramWebApp = (): TelegramWebApp | undefined => {
    try {
        if (typeof window === 'undefined') {
            return undefined;
        }

        // @ts-ignore
        const tg = (window as any)?.Telegram?.WebApp;
        return tg as TelegramWebApp | undefined;
    } catch {
        return undefined;
    }
};

const getInitDataUnsafe = (): TelegramInitDataUnsafe | undefined => {
    return getTelegramWebApp()?.initDataUnsafe;
};

const getInitDataString = (): string | undefined => {
    return getTelegramWebApp()?.initData;
};

const getTelegramUser = (): TelegramUser | undefined => {
    return getInitDataUnsafe()?.user;
};

const getTelegramUserId = (): number | undefined => {
    const id = getTelegramUser()?.id;
    return typeof id === 'number' ? id : undefined;
};

const getTelegramUsername = (): string | undefined => {
    const username = getTelegramUser()?.username;
    return typeof username === 'string' ? username : undefined;
};

const getTelegramLanguageCode = (): string | undefined => {
    const code = getTelegramUser()?.language_code;
    return typeof code === 'string' ? code : undefined;
};

const isTelegramPremium = (): boolean | undefined => {
    const premium = getTelegramUser()?.is_premium;
    return typeof premium === 'boolean' ? premium : undefined;
};

const getTelegramChatId = (): number | undefined => {
    const id = getInitDataUnsafe()?.chat?.id;
    return typeof id === 'number' ? id : undefined;
};

const getTelegramChatType = (): string | undefined => {
    const type = getInitDataUnsafe()?.chat?.type ?? getInitDataUnsafe()?.chat_type;
    return typeof type === 'string' ? type : undefined;
};

const getTelegramReceiver = (): TelegramUser | undefined => {
    return getInitDataUnsafe()?.receiver;
};

const getTelegramReceiverId = (): number | undefined => {
    const id = getTelegramReceiver()?.id;
    return typeof id === 'number' ? id : undefined;
};

const getQueryId = (): string | undefined => {
    const q = getInitDataUnsafe()?.query_id;
    return typeof q === 'string' ? q : undefined;
};

const getStartParam = (): string | undefined => {
    const p = getInitDataUnsafe()?.start_param;
    return typeof p === 'string' ? p : undefined;
};

const getAuthDate = (): number | undefined => {
    const d = getInitDataUnsafe()?.auth_date;
    return typeof d === 'number' ? d : undefined;
};

const getAuthHash = (): string | undefined => {
    const h = getInitDataUnsafe()?.hash;
    return typeof h === 'string' ? h : undefined;
};

const getCanSendAfter = (): number | undefined => {
    const n = getInitDataUnsafe()?.can_send_after;
    return typeof n === 'number' ? n : undefined;
};

const getChatInstance = (): string | undefined => {
    const s = getInitDataUnsafe()?.chat_instance;
    return typeof s === 'string' ? s : undefined;
};

const getVersion = (): string | undefined => {
    const v = getTelegramWebApp()?.version;
    return typeof v === 'string' ? v : undefined;
};

const getPlatform = (): string | undefined => {
    const p = getTelegramWebApp()?.platform;
    return typeof p === 'string' ? p : undefined;
};

const getColorScheme = (): 'light' | 'dark' | undefined => {
    const c = getTelegramWebApp()?.colorScheme;
    return c === 'light' || c === 'dark' ? c : undefined;
};

const getThemeParams = (): TelegramThemeParams | undefined => {
    return getTelegramWebApp()?.themeParams;
};

const getIsExpanded = (): boolean | undefined => {
    const b = getTelegramWebApp()?.isExpanded;
    return typeof b === 'boolean' ? b : undefined;
};

const getViewportHeight = (): number | undefined => {
    const n = getTelegramWebApp()?.viewportHeight;
    return typeof n === 'number' ? n : undefined;
};

const getViewportStableHeight = (): number | undefined => {
    const n = getTelegramWebApp()?.viewportStableHeight;
    return typeof n === 'number' ? n : undefined;
};

const getHeaderColor = (): string | undefined => {
    const s = getTelegramWebApp()?.headerColor;
    return typeof s === 'string' ? s : undefined;
};

const getBackgroundColor = (): string | undefined => {
    const s = getTelegramWebApp()?.backgroundColor;
    return typeof s === 'string' ? s : undefined;
};

export {
    getTelegramWebApp,
    getInitDataUnsafe,
    getInitDataString,
    getTelegramUser,
    getTelegramUserId,
    getTelegramUsername,
    getTelegramLanguageCode,
    isTelegramPremium,
    getTelegramChatId,
    getTelegramChatType,
    getTelegramReceiver,
    getTelegramReceiverId,
    getQueryId,
    getStartParam,
    getAuthDate,
    getAuthHash,
    getCanSendAfter,
    getChatInstance,
    getVersion,
    getPlatform,
    getColorScheme,
    getThemeParams,
    getIsExpanded,
    getViewportHeight,
    getViewportStableHeight,
    getHeaderColor,
    getBackgroundColor,
};

export type {
    TelegramUser,
    TelegramChat,
    TelegramWebApp,
    TelegramInitDataUnsafe,
    TelegramThemeParams,
};

