import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/api";

export function useUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
    });
}
