import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "../ui/alert"
import { AlertCircle } from "lucide-react"

type Props = {
    error: string
}

const Error = ({ error }: Props) => {
    return (
        <Alert variant="destructive" className='mb-2 mt-2'>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {error}
            </AlertDescription>
        </Alert>
    )
}

export default Error