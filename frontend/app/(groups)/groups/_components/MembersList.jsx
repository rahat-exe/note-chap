"use client";

import { useEffect } from "react";
import { useGetMembers } from "@/hooks/useGroups";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Crown, Users, Mail, Shield } from "lucide-react";

const MembersList = ({ groupId }) => {
  const { data, isLoading, isError, error, refetch } = useGetMembers(groupId);

  useEffect(() => {
    refetch();
  }, []);

  if(data){
    console.log("data", data);
  }

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-48 flex-col items-center justify-center gap-2 text-center">
        <div className="rounded-full bg-destructive/10 p-3">
          <Users className="h-6 w-6 text-destructive" />
        </div>
        <p className="text-sm text-muted-foreground">
          {error?.message || "Failed to load members"}
        </p>
      </div>
    );
  }

  if (!data) return null;

  const { admins = [], members = [] } = data;

  return (
    <div className="space-y-6">
      {/* Admins Section */}
      {admins.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-amber-500" />
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Administrators
            </h4>
            <Badge variant="secondary" className="text-xs">
              {admins.length}
            </Badge>
          </div>

          <div className="space-y-2">
            {admins.map((admin) => (
              <div
                key={admin._id}
                className="group flex items-center gap-3 rounded-lg border bg-amber-50/50 p-3 transition-colors hover:bg-amber-50 dark:bg-amber-950/10 dark:hover:bg-amber-950/20"
              >
                <Avatar className="h-10 w-10 ring-2 ring-amber-200 dark:ring-amber-800">
                  <AvatarImage src={admin.image} alt={admin.name} />
                  <AvatarFallback className="bg-amber-100 text-amber-700">
                    {admin.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">
                      {admin.name}
                    </span>
                    <Crown className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{admin.email}</span>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className="text-xs border-amber-200 text-amber-700 bg-amber-100/50"
                >
                  Admin
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Members Section */}
      {members.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-500" />
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Members
            </h4>
            <Badge variant="secondary" className="text-xs">
              {members.length}
            </Badge>
          </div>

          <div className="space-y-2">
            {members.map((member) => {
              const isAdmin = admins.some((a) => a._id === member._id);
              if (isAdmin) return null; // Skip if already shown in admins

              return (
                <div
                  key={member._id}
                  className="group flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {member.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-sm truncate block">
                      {member.name}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{member.email}</span>
                    </div>
                  </div>

                  <Badge variant="outline" className="text-xs">
                    Member
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {admins.length === 0 && members.length === 0 && (
        <div className="flex h-32 flex-col items-center justify-center gap-2 text-center text-muted-foreground">
          <Users className="h-8 w-8 opacity-50" />
          <p className="text-sm">No members found</p>
        </div>
      )}
    </div>
  );
};

export default MembersList;
