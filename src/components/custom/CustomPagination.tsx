import { useSearchParams } from "react-router";
import { Button } from "@/components/ui/button"
import {
    ChevronLeft,
    ChevronRight,
    //MoreHorizontal,
} from "lucide-react"



interface Props {
    totalPages: number;
    //limit?: number;

}

export const CustomPagination = ({ totalPages }: Props) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const queryPage = searchParams.get('page') ?? '1';
    const page = isNaN(+queryPage) ? 1 : +queryPage;

    const handlePageChangeUrl = (page: number) => {

        if (page < 1 || page > totalPages) return;

        searchParams.set('page', page.toString());
        // obliga el renderizado
        setSearchParams(searchParams);
    };

    return (
        <div className="flex items-center justify-center space-x-2">
            <Button variant="outline" size="sm" disabled={page === 1}
                onClick={() => handlePageChangeUrl(page - 1)}>
                <ChevronLeft className="h-4 w-4" />
                Previous
            </Button>

            {
                Array.from({ length: totalPages }).map((_, index) => (
                    <Button key={index}
                        variant={page === index + 1 ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handlePageChangeUrl(index + 1)}>
                        {index + 1}
                    </Button>
                ))
            }


            {/* <Button variant="ghost" size="sm" disabled>
                <MoreHorizontal className="h-4 w-4" />
            </Button> */}

            <Button variant="outline" size="sm" disabled={page === totalPages}
                onClick={() => handlePageChangeUrl(page + 1)}>
                Next
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}
