import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { useLoadingScreen } from "../core/Hooks";

export default function LoadingScreen() {
    const [awaitState, _] = useLoadingScreen()

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