import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { useWorkerAwaiter } from "../core/Hooks";

export default function Worker() {
    const [awaitState, _] = useWorkerAwaiter()

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
                open={awaitState}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}