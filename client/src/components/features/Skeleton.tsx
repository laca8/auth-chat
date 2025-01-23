import { Skeleton } from "../ui/skeleton"

const Loader = () => {
    return (
        <div className="flex items-center space-x-4 w-full h-full">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 w-full h-full">
                <Skeleton className=" w-full h-1/4" />
                <Skeleton className="h-1/4 w-full" />
            </div>
        </div>
    )
}
export default Loader