import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";

export const SearchPage = () => {
    return (
        <>
            {/* Header */}
            <CustomJumbotron
                title="Search the Superhero Universe"
                description="Search and discover incredible powers and manage your favorite characters all in one place."
            />
            <CustomBreadcrumbs currentPage="Search Superhero"
            // breadcrumbs={[
            //     { label: "Home", to: "/" },
            //     { label: "Home2", to: "/" },
            //     { label: "Home3", to: "/" },

            // ]}
            />
            {/* Stats Dashboard */}
            <HeroStats />

            {/* Controls */}
            <SearchControls />
        </>
    )
}

// para evitar el .then(module => ({ default: module.SearchPage }))); en app.router.tsx
export default SearchPage;