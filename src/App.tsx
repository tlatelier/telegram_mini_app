import { useCallback, useMemo, useState } from "react";
import { StartPage } from "./pages/start/StartPage";
import { PrivateTripsPage } from "./pages/private/PrivateTripsPage";
import { GalleryPage } from "./pages/gallery/GalleryPage";
import { TripDetailsPage } from "./pages/trip/TripDetailsPage";
import { Layout } from "./app/layout/Layout.tsx";
import { NAV_SECTIONS, type NavigationSectionType } from "./shared/types/navigation.ts";

const App = () => {
    const [section, setSection] = useState<NavigationSectionType>(NAV_SECTIONS.GROUP);
    const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

    const handleNavigate = useCallback((next: NavigationSectionType) => {
        setSelectedTripId(null);
        setSection(next);
    }, []);

    const SectionToComponent = useMemo(
        () =>
            ({
                [NAV_SECTIONS.GROUP]: StartPage,
                [NAV_SECTIONS.PRIVATE]: PrivateTripsPage,
                [NAV_SECTIONS.GALLERY]: GalleryPage,
            }) as const,
        [],
    );

    const CurrentPage = SectionToComponent[section];

    return (
        <Layout
            active={section}
            onNavigate={handleNavigate}
            showBack={Boolean(selectedTripId)}
            onBack={() => setSelectedTripId(null)}
        >
            {selectedTripId ? (
                <TripDetailsPage tripId={selectedTripId} />
            ) : (
                <CurrentPage onOpenTrip={setSelectedTripId} />
            )}
        </Layout>
    );
};

export { App };
