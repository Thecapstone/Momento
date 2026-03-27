"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCapsules, CapsuleListItem } from "../capsules";

export type UseCapsulesResult = {
  data?: CapsuleListItem[];
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
};

export const useCapsules = (): UseCapsulesResult =>
  useQuery<CapsuleListItem[], Error>({
    queryKey: ["capsules"],
    queryFn: fetchCapsules,
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
