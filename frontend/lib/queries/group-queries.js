import { error } from "better-auth/api";

const url = process.env.NEXT_PUBLIC_API_URL;

export async function fetchGroups() {
  const response = await fetch(`${url}/api/groups`, {
    credentials: "include",
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result);
  return result.data;
}

export async function createGroup(newGroup) {
  const response = await fetch(`${url}/api/groups`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newGroup),
  });
  const result = await response.json();
  console.log(result);
  if (!response.ok) throw new Error(result.error);
  return result;
}

export async function fetchGroupById(id) {
  const response = await fetch(`${url}/api/groups/${id}`, {
    credentials: "include",
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result.data;
}

export async function searchGroups(search) {
  const response = await fetch(`${url}/api/groups/explore?name=${search}`, {
    credentials: "include",
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result.data;
}

export async function joinGroup(groupId) {
  const response = await fetch(`${url}/api/groups/${groupId}/join`, {
    method: "POST",
    credentials: "include",
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result;
}

export async function leaveGroup(groupId) {
  const response = await fetch(`${url}/api/groups/${groupId}/leave`, {
    method: "DELETE",
    credentials: "include",
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result;
}

export async function getMembers(groupId){
  const response = await fetch(`${url}/api/groups/${groupId}/members`,{
    credentials:"include"
  })
  const result = await response.json();
  if(!response.ok) throw new Error(result.error);
  return result.data;
}