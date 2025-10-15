import { useMemo } from "react";
import { SnackBarManager } from "../services/SnackBarManager";
import { useSnackBarStore } from "../utils/SnackBarStateManager";


export function useSnackBarManager(){
    const store = useSnackBarStore();
    return new SnackBarManager(store);
}
