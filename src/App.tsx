
import { useCallback, useMemo, useState } from 'react';
import { StartPage } from './pages/StartPage.tsx';
import { PrivateTripsPage } from './pages/PrivateTripsPage.tsx';
import { GalleryPage } from './pages/GalleryPage.tsx';
import { TripDetailsPage } from './pages/TripDetailsPage';
import { Layout } from './layout/Layout.tsx';
import type { NavigationSectionType } from './types/navigation.ts';

const App = () => {
    const [section, setSection] = useState<NavigationSectionType>('group');
    const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

    const handleNavigate = useCallback((next: NavigationSectionType) => {
        setSelectedTripId(null);
        setSection(next);
    }, []);

    const SectionToComponent = useMemo(() => ({
        group: StartPage,
        private: PrivateTripsPage,
        gallery: GalleryPage,
    } as const), []);

    const CurrentPage = SectionToComponent[section];

    return (
        <Layout
            active={section}
            onNavigate={handleNavigate}
            showBack={Boolean(selectedTripId)}
            onBack={() => setSelectedTripId(null)}
        >
            {selectedTripId ? (
                <TripDetailsPage 
                    tripId={selectedTripId}
                />
            ) : (
                <CurrentPage
                    onOpenTrip={setSelectedTripId}  
                />
            )}
        </Layout>
    );
}

export {
  App,
};
