import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

// Types
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  image: z.string(),
  topics: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      title: z.string(),
      message: z.string(),
      allowText: z.boolean(),
      allowVideo: z.boolean(),
      logo: z.string().nullable(),
      questions: z.any().nullable(),
    })
  ),
});

export type User = z.infer<typeof userSchema>;

// API functions
const fetchUser = async (email: string): Promise<User> => {
  const response = await fetch(`/api/user?email=${email}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  const data = await response.json();
  return userSchema.parse(data);
};

const createOrUpdateUser = async (userData: {
  email: string;
  name: string;
  image: string;
}): Promise<User> => {
  const response = await fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Failed to create/update user");
  }
  const data = await response.json();
  return userSchema.parse(data);
};

// Hook
export function useUser(email?: string) {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", email],
    queryFn: () => (email ? fetchUser(email) : null),
    enabled: !!email, // Only run query if email is provided
  });

  const mutation = useMutation({
    mutationFn: createOrUpdateUser,
    onSuccess: (newUser) => {
      // Update the cache with the new user data
      queryClient.setQueryData(["user", newUser.email], newUser);
    },
  });

  return {
    user,
    isLoading,
    error,
    createOrUpdateUser: mutation.mutate,
    isUpdating: mutation.isPending,
    updateError: mutation.error,
  };
}
