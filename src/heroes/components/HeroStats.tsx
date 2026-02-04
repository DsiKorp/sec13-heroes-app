
import { Badge } from "@/components/ui/badge"
import { Heart, Trophy, Users, Zap } from "lucide-react"

import { HeroStatCard } from "./HeroStatCard"
import { useQueryHeroSummary } from "../hooks/useQueryHeroSummary";


export const HeroStats = () => {

    const { data: summaryInformation } = useQueryHeroSummary();

    //     const { data: summaryInformation } = useQuery({
    //     queryKey: ['summary-information'],
    //     queryFn: getSummaryAction,
    //     //queryFn: () => getSummaryAction(),
    //     staleTime: 1000 * 60 * 5, // 5 minutes
    // });


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
                <div className="text-2xl font-bold text-red-600">3</div>
                <p className="text-xs text-muted-foreground">18.8% of total</p>
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
