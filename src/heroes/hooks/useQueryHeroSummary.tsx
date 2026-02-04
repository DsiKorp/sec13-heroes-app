import { useQuery } from "@tanstack/react-query";
import { getSummaryAction } from "../actions/get-summary.action";

export const useQueryHeroSummary = () => {

    return useQuery({
        queryKey: ['summary-information'],
        queryFn: getSummaryAction,
        //queryFn: () => getSummaryAction(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
