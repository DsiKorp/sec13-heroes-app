import { useQuery } from "@tanstack/react-query";
import { getHeroAction } from "../actions/get-hero.action";

export const useQueryHeroDesc = (slug: string) => {
    return useQuery({
        queryKey: ['hero-information', { slug: slug }],
        queryFn: () => getHeroAction(slug),
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
