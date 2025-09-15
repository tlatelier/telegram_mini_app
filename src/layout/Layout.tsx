import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { NavigationSectionType } from '../types/navigation';
import { Button } from '../components/Button';
import './layout.less';

const layoutClass = 'layout';

interface LayoutProps {
    children?: ReactNode;
    onNavigate?: (section: NavigationSectionType) => void;
    active?: NavigationSectionType;
    showBack?: boolean;
    onBack?: () => void;
}

const Layout = ({ children, onNavigate, active, showBack, onBack }: LayoutProps) => {
    const [navElevated, setNavElevated] = useState(false);

    useEffect(() => {
        const update = () => {
            const doc = document.documentElement;
            const scrollTop = doc.scrollTop;
            const clientHeight = doc.clientHeight;
            const scrollHeight = doc.scrollHeight;
            const atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 1;
            setNavElevated(!atBottom);
        };
        update();
        window.addEventListener('scroll', update, { passive: true } as AddEventListenerOptions);
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, []);
    const items = useMemo(() => ([
        { key: 'group' as const, label: 'Групповые' },
        { key: 'private' as const, label: 'Частные' },
        { key: 'gallery' as const, label: 'Галерея' },
    ]), []);

    const handleClick = useCallback((key: NavigationSectionType) => () => {
        onNavigate?.(key);
    }, [onNavigate]);

    return (
        <div
            className={layoutClass}
        >
            <main className={`${layoutClass}__main`}>
                {children}
            </main>
            <nav 
                className={`${layoutClass}__nav${navElevated ? ` ${layoutClass}__nav--solid` : ''}`} 
                aria-label="Основная навигация"
            >
                {showBack ? (
                    <div className={`${layoutClass}__nav-item`}>
                        <Button
                            text="Назад"
                            callback={onBack ?? (() => onNavigate?.('group'))}
                        />
                    </div>
                ) : (
                    items.map(({ key, label }) => (
                        <div key={key} className={`${layoutClass}__nav-item`}>
                            <Button text={label} callback={handleClick(key)} active={active === key} />
                        </div>
                    ))
                )}
            </nav>
        </div>
    );
};

export {
    Layout,
};