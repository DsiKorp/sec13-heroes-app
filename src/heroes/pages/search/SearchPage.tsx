import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useQuerySearch } from "@/heroes/hooks/useQuerySearch";
import { useSearchParams } from "react-router";

export const SearchPage = () => {

    // tomar los parametros de la url
    const [searchParams] = useSearchParams();

    const name = searchParams.get('name') || undefined;
    // const team = searchParams.get('team') || undefined;
    // const category = searchParams.get('category') || undefined;
    // const universe = searchParams.get('universe') || undefined;
    // const status = searchParams.get('status') || undefined;
    const strength = searchParams.get('strength') || undefined;

    // useQuery
    //const { data: heroes = [] } = useQuerySearch(name, team, category, universe, status, strength);
    const { data: heroesData = [] } = useQuerySearch(name, strength);

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

            <HeroGrid heroes={heroesData} />
        </>
    )
}

// para evitar el .then(module => ({ default: module.SearchPage }))); en app.router.tsx
// por el lazy loading de React
export default SearchPage;