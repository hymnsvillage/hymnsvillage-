import { getCurrentUser } from "@/api/auth";
import { CleanUser } from "@/app/(backend)/lib/cleanUser";
import { useQuery } from "@tanstack/react-query";
function useCurrentUser() {
  const { data , isLoading} = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });

  return { user: data?.data as CleanUser , isLoading };
}

export { useCurrentUser };
