"use client";

import { use, useState } from "react";
import {
  useJoinGroup,
  useLeaveGroup,
  useSearchGroup,
} from "../../../../hooks/useGroups.js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Loader2,
  Users,
  Globe,
  Lock,
  Check,
  ArrowRight,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation.js";

export default function SearchGroups() {
  const [search, setSearch] = useState("");
  const [enabled, setEnabled] = useState(false);
  const router = useRouter();

  const { data: groups, isLoading, error, refetch } = useSearchGroup(search);
  const {
    mutate,
    isLoading: joinIsLoading,
    error: joinError,
    isError: joinIsError,
  } = useJoinGroup();
  const {
    mutate: leaveMutate,
    isLoading: leaveIsLoading,
    error: leaveError,
    isError: leaveIsError,
  } = useLeaveGroup();
  console.log(leaveError)

  console.log(groups);
  console.log(joinError);

  const handleSearch = () => {
    refetch();
    console.log(error);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-muted/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Find Groups
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Discover communities that match your interests
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative flex items-center gap-2">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              <Search className="h-5 w-5" />
            </div>

            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search groups..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setEnabled(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-12 pr-12 h-14 w-full rounded-full border-2 bg-background shadow-lg text-lg transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setEnabled(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Desktop Button */}
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              size="lg"
              className="hidden sm:flex h-14 px-8 rounded-full text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Search
                </>
              )}
            </Button>

            {/* Mobile Button */}
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              size="icon"
              className="sm:hidden h-14 w-14 rounded-full shrink-0"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="max-w-2xl mx-auto p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
            <p className="font-medium flex items-center gap-2">
              <X className="h-4 w-4" />
              {error.message}
            </p>
          </div>
        )}

        {/* Results */}
        <div className="space-y-4">
          {groups && groups.length > 0 && (
            <p className="text-muted-foreground">
              Found{" "}
              <span className="font-semibold text-foreground">
                {groups.length}
              </span>{" "}
              groups
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groups?.map((group) => (
              <Card
                key={group._id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Cover */}
                <div className="relative h-32 bg-linear-to-r from-primary/20 to-primary/10">
                  {group.coverImage ? (
                    <img
                      src={group.coverImage}
                      alt={group.groupName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary/40">
                      <Users className="h-12 w-12" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <Badge
                      variant={group.isPublic ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {group.isPublic ? (
                        <>
                          <Globe className="h-3 w-3 mr-1" /> Public
                        </>
                      ) : (
                        <>
                          <Lock className="h-3 w-3 mr-1" /> Private
                        </>
                      )}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold line-clamp-1">
                    {group.groupName}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-sm">
                    {group.groupDescription || "No description available"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{group.memberCount || 0} members</span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <Button
                        size="sm"
                        variant={group.isJoined ? "outline" : "default"}
                        onClick={() =>(
                          mutate(group._id, {
                            onSuccess: (data) => {
                              console.log(data);
                              toast.success(data.message);
                            },
                            onError: (error) => {
                              toast.error(error.message);
                            },
                          }),
                          refetch()
                        )
                          
                        }
                        disabled={group.isJoined}
                        className={
                          group.isJoined
                            ? "text-green-600 border-green-600 hover:bg-green-50"
                            : ""
                        }
                      >
                        {group.isJoined ? (
                          <>
                            <Check className="mr-1 h-4 w-4" />
                            Joined
                          </>
                        ) : (
                          <>
                            join
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </>
                        )}
                      </Button>
                      {group.isJoined && (
                        <Button
                          size="sm"
                          onClick={() =>(

                            leaveMutate(group._id, {
                              onSuccess: (data) => {
                                console.log(data);
                                toast.success(data.message);
                              },
                              onError: (error) => {
                                toast.error(error.message);
                              },
                            }),
                            refetch()
                          )
                          }
                        >
                          Leave
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {groups && groups.length === 0 && search && !isLoading && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No groups found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your search terms
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
