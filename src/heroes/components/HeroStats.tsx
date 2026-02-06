import { use } from "react";

import { Badge } from "@/components/ui/badge"
import { Heart, Trophy, Users, Zap } from "lucide-react"

import { HeroStatCard } from "./HeroStatCard"
import { useQueryHeroSummary } from "../hooks/useQueryHeroSummary";
import { FavoriteHeroContext } from "../context/FavoriteHeroContext";


export const HeroStats = () => {

    const { data: summaryInformation } = useQueryHeroSummary();
    const { favoriteCount } = use(FavoriteHeroContext);

    // const percentageOfFavorites = summaryInformation && summaryInformation.totalHeroes > 0
    //     ? ((favoriteCount / summaryInformation.totalHeroes) * 100).toFixed(1)
    //     : '0.0';



    //     const { data: summaryInformation } = useQuery({
    //     queryKey: ['summary-information'],
    //     queryFn: getSummaryAction,
    //     //queryFn: () => getSummaryAction(),
    //     staleTime: 1000 * 60 * 5, // 5 minutes
    // });

    if (!summaryInformation) {
        return <div>Loading...</div>
    }


    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <HeroStatCard
                title="Total Characters"
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
            >
                <div className="text-2xl font-bold">{summaryInformation?.totalHeroes || 0}</div>
                <div className="flex gap-1 mt-2">
                    <Badge variant="secondary" className="text-xs">
                        {summaryInformation?.heroCount}
                    </Badge>
                    <Badge variant="destructive" className="text-xs">
                        {summaryInformation?.villainCount}
                    </Badge>
                </div>
            </HeroStatCard>

            <HeroStatCard
                title="Favorites"
                icon={<Heart className="h-4 w-4 text-muted-foreground" />}
            >
                {/* TODO: calcular este valor */}
                <div className="text-2xl font-bold text-red-600" data-testid="favorite-count">{favoriteCount}</div>
                <p className="text-xs text-muted-foreground" data-testid="favorite-percentage">
                    {((favoriteCount / summaryInformation?.totalHeroes) * 100).toFixed(2)}% of total
                </p>
            </HeroStatCard>

            <HeroStatCard
                title="Strongest"
                icon={<Zap className="h-4 w-4 text-muted-foreground" />}
            >
                <div className="text-lg font-bold">{summaryInformation?.strongestHero?.alias || 'Unknown'}</div>
                <p className="text-xs text-muted-foreground">Strength: {summaryInformation?.strongestHero?.strength || 0}/10</p>
            </HeroStatCard>

            <HeroStatCard
                title="Smartest"
                icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
            >
                <div className="text-lg font-bold">{summaryInformation?.smartestHero?.alias || 'Unknown'}</div>
                <p className="text-xs text-muted-foreground">Intelligence: {summaryInformation?.smartestHero?.intelligence || 0}/10</p>
            </HeroStatCard>

        </div>
    )
}
