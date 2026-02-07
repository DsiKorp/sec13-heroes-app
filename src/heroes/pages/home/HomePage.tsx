import { use, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';
import { useQueryHeroSummary } from '@/heroes/hooks/useQueryHeroSummary';
import { useQueryPaginatedHero } from '@/heroes/hooks/useQueryPaginatedHero';
import { FavoriteHeroContext } from '@/heroes/context/FavoriteHeroContext';

//import { usePaginatedHero } from '@/heroes/hooks/usePaginatedHero';

export const HomePage = () => {
    // hook para manejar los parámetros de la URL
    const [searchParams, setSearchParams] = useSearchParams();
    // hook para manejar los favoritos
    const { favoriteCount, favorites } = use(FavoriteHeroContext);

    // trae los parámetros de la URL
    const activeTab = searchParams.get('tab') ?? 'all';
    const page = searchParams.get('page') ?? '1';
    const limit = searchParams.get('limit') ?? '6';
    const category = searchParams.get('category') ?? 'all';

    // hook para manejar el tab seleccionado, useMemo para evitar recalcular en cada render
    const selectedTab = useMemo(() => {
        const validTabs = ['all', 'favorites', 'heroes', 'villains'];
        return validTabs.includes(activeTab) ? activeTab : 'all';
    }, [activeTab]);

    //const { data: heroesResponse } = CustomPagination(+page);

    // TanStack Query para los héroes paginados
    //  {page: +page, limit: +limit, category: category} como objeto 
    // por si en el futuro se quieren agregar más filtros o cambiar el orden de estos
    // useQueryPaginatedHero recibe los parámetros como argumentos directos, hook personalizado
    const { data: heroesResponse } = useQueryPaginatedHero(+page, +limit, category);
    // const { data: heroesResponse } = useQuery({
    //     queryKey: ['heroes', { page: +page, limit: +limit, category: category }],
    //     queryFn: () => getHeroesByPageAction(+page, +limit),
    //     staleTime: 1000 * 60 * 5, // 5 minutes
    // });

    // TanStack Query para el resumen de héroes
    // hook personalizado para resumir la información de los héroes
    const { data: summaryInformation } = useQueryHeroSummary();


    return (
        <>
            <>
                {/* Header */}
                {/* Custom Jumbotron para el título y descripción , componentes reutilizables */}
                <CustomJumbotron
                    title="Universo de SuperHéroes"
                    description="Descubre, explora y administra super héroes y villanos"
                />

                {/* Custom Breadcrumbs para la navegación */}
                <CustomBreadcrumbs currentPage="Super Héroes" />

                {/* Stats Dashboard para mostrar información general */}
                <HeroStats />

                {/* Tabs para filtrar los héroes */}
                <Tabs value={selectedTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                        <TabsTrigger
                            value="all"
                            className="border border-gray-300 data-[state=active]:border-transparent"
                            onClick={() =>
                                setSearchParams((prev) => {
                                    prev.set('tab', 'all');
                                    prev.set('category', 'all');
                                    prev.set('page', '1');
                                    return prev;
                                })
                            }
                        >
                            All Characters ({summaryInformation?.totalHeroes})
                        </TabsTrigger>
                        <TabsTrigger
                            value="favorites"
                            className="flex items-center gap-2 border border-gray-300 data-[state=active]:border-transparent"
                            onClick={() =>
                                setSearchParams((prev) => {
                                    prev.set('tab', 'favorites');
                                    return prev;
                                })
                            }
                        >
                            Favorites ({favoriteCount})
                        </TabsTrigger>
                        <TabsTrigger
                            value="heroes"
                            className="border border-gray-300 data-[state=active]:border-transparent"
                            onClick={() =>
                                setSearchParams((prev) => {
                                    prev.set('tab', 'heroes');
                                    prev.set('category', 'hero');
                                    prev.set('page', '1');
                                    return prev;
                                })
                            }
                        >
                            Heroes ({summaryInformation?.heroCount})
                        </TabsTrigger>
                        <TabsTrigger
                            value="villains"
                            className="border border-gray-300 data-[state=active]:border-transparent"
                            onClick={() =>
                                setSearchParams((prev) => {
                                    prev.set('tab', 'villains');
                                    prev.set('category', 'villain');
                                    prev.set('page', '1');
                                    return prev;
                                })
                            }
                        >
                            Villains ({summaryInformation?.villainCount})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="pt-4 md:pt-0">
                        {/* Mostrar todos los personajes */}
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                    <TabsContent value="favorites" className="pt-4 md:pt-0">
                        {/* Mostrar todos los personajes favoritos */}
                        <h1>Favoritos!!!</h1>
                        <HeroGrid heroes={favorites} />
                    </TabsContent>
                    <TabsContent value="heroes" className="pt-4 md:pt-0">
                        {/* Mostrar todos los héroes */}
                        <h1>Héroes</h1>
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                    <TabsContent value="villains" className="pt-4 md:pt-0">
                        {/* Mostrar todos los Villanos */}
                        <h1>Villanos</h1>
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                </Tabs>

                {/* Pagination para los tabs que no son favoritos */}
                {
                    selectedTab !== 'favorites' && (
                        <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
                    )
                }
            </>
        </>
    );
};