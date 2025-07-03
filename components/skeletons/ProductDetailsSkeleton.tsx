import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent } from "../ui/card";

export default function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        <Skeleton className="h-4 w-20" />
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full rounded-lg" />
        </div>

        <div className="space-y-6">
          <div>
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6 mt-2" />
            <Skeleton className="h-4 w-2/3 mt-2" />
          </div>

          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-6 w-24" />
          </div>

          <Skeleton className="h-12 w-full" />

          <Card>
            <CardContent className="px-6">
              <Skeleton className="h-5 w-32 mb-4" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
