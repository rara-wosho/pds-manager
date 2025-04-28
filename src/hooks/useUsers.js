import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/api";

export function useUsers(course) {
    return useQuery({
        queryKey: ["users", course || "all"], // depend on course
        queryFn: async () => {
            const users = await getAllUsers();
            if (course) {
                return users.filter((user) => user.course === course);
            }
            return users;
        },
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
    });
}
