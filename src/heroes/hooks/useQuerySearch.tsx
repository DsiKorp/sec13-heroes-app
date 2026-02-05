import { useQuery } from "@tanstack/react-query"
import { searchHeroesAction } from "../actions/search-heroes.action"



// export const useQuerySearch = (name?: string, team?: string, category?: string,
//     universe?: string, status?: string, strength?: string) => {

export const useQuerySearch = (name?: string, strength?: string) => {

    return useQuery({
        queryKey: ['search', name, strength],
        queryFn: () => searchHeroesAction({ name, strength }),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: false,
    })
}
