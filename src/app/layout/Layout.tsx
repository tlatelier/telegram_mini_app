import {
    useMemo, useEffect, type ReactNode,
} from 'react';
import {
    Link, useLocation, useNavigate,
} from 'react-router-dom';
import {
    NAV_ITEMS, NAV_SECTIONS, type NavigationSectionType,
} from '../../shared/types/navigation';
import { Button } from '../../shared/ui/button/Button';
import './layout.less';

const layoutClass = 'layout';

interface ILayoutProps {
    children?: ReactNode;
    active?: NavigationSectionType;
}

const Layout = ({ children }: ILayoutProps) => {
    const items = useMemo(() => [...NAV_ITEMS], []);

    const navigate = useNavigate();
    const location = useLocation();

    const showBack = location.pathname.startsWith('/trip/');

    const activeKey: NavigationSectionType = useMemo(() => {
        if (location.pathname.startsWith('/private')) {
            return NAV_SECTIONS.PRIVATE;
        }

        if (location.pathname.startsWith('/gallery')) {
            return NAV_SECTIONS.GALLERY;
        }

        return NAV_SECTIONS.GROUP;
    }, [location.pathname]);

    // Прокручиваем в начало при смене маршрута
    useEffect(() => {
        try {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        } catch {
            window.scrollTo(0, 0);
        }
    }, [location.pathname]);

    return (
        <div className={layoutClass}>
            <main className={`${layoutClass}__main`}>{children}</main>
            <nav
                className={`${layoutClass}__nav`}
                aria-label="Основная навигация"
            >
                <div className={`${layoutClass}__nav-inner`}>
                    {showBack ? (
                        <div className={`${layoutClass}__nav-item`}>
                            <Button
                                text="Назад"
                                callback={() => navigate(-1)}
                            />
                        </div>
                    ) : (
                        items.map(({ key, label }) => (
                            <div
                                key={key}
                                className={`${layoutClass}__nav-item`}
                            >
                                <Link
                                    to={key === NAV_SECTIONS.GROUP ? '/' : `/${key}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Button
                                        text={label}
                                        active={activeKey === key}
                                    />
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </nav>
        </div>
    );
};

export {
    Layout,
};
