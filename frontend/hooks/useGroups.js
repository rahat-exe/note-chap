"use client";

import {
  createGroup,
  fetchGroupById,
  fetchGroups,
  joinGroup,
  leaveGroup,
  searchGroups,
} from "@/lib/queries/group-queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGroups() {
  return useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
  });
}
export function useGroupById(id) {
  return useQuery({
    queryKey: ["group", id],
    queryFn: () => fetchGroupById(id),
  });
}

export function useCreateGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newGroup) => createGroup(newGroup),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
}

export function useSearchGroup(search) {
  return useQuery({
    queryKey: ["search"],
    queryFn: () => searchGroups(search),
    enabled: false,
    retry: false,
  });
}

export function useJoinGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (groupId) => joinGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["search"] });
    },
  });
}

export function useLeaveGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (groupId) => leaveGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["search"] });
    },
  });
}