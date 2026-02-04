import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";

// TanStack Query para los héroes paginados
//  {page: +page, limit: +limit, category: category} como objeto 
// por si en el futuro se quieren agregar más filtros o cambiar el orden de estos
export const useQueryPaginatedHero = (page: number, limit: number, category = 'all') => {
    return useQuery({
        queryKey: ['heroes', { page: page, limit: limit, category: category }],
        queryFn: () => getHeroesByPageAction(page, limit, category),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
