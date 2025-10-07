import { useCallback, useMemo, type ReactNode } from "react";
import { NAV_ITEMS, NAV_SECTIONS, type NavigationSectionType } from "../../shared/types/navigation";
import { Button } from "../../shared/ui/button/Button";
import "./layout.less";

const layoutClass = "layout";

interface LayoutProps {
    children?: ReactNode;
    onNavigate?: (section: NavigationSectionType) => void;
    active?: NavigationSectionType;
    showBack?: boolean;
    onBack?: () => void;
}

const Layout = ({ children, onNavigate, active, showBack, onBack }: LayoutProps) => {
    const items = useMemo(() => [...NAV_ITEMS], []);

    const handleClick = useCallback(
        (key: NavigationSectionType) => () => {
            onNavigate?.(key);
        },
        [onNavigate],
    );

    return (
        <div className={layoutClass}>
            <main className={`${layoutClass}__main`}>{children}</main>
            <nav className={`${layoutClass}__nav`} aria-label="Основная навигация">
                <div className={`${layoutClass}__nav-inner`}>
                    {showBack ? (
                        <div className={`${layoutClass}__nav-item`}>
                            <Button
                                text="Назад"
                                callback={onBack ?? (() => onNavigate?.(NAV_SECTIONS.GROUP))}
                            />
                        </div>
                    ) : (
                        items.map(({ key, label }) => (
                            <div key={key} className={`${layoutClass}__nav-item`}>
                                <Button
                                    text={label}
                                    callback={handleClick(key)}
                                    active={active === key}
                                />
                            </div>
                        ))
                    )}
                </div>
            </nav>
        </div>
    );
};

export { Layout };
