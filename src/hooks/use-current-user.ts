import { getCurrentUser } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
function useCurrentUser() {
  const { data , isLoading} = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });

  return { user: data?.data, isLoading };
}

export { useCurrentUser };
