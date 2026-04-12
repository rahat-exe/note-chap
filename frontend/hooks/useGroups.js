"use client";

import { createGroup, fetchGroups } from "@/lib/queries/group-queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGroups(){
    return useQuery({
        queryKey:['groups'],
        queryFn:fetchGroups
    })
}

export function useCreateGroup(){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(newGroup) => createGroup(newGroup),
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey:['groups']})
        }
    })
}