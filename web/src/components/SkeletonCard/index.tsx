import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from '../ui/card'
 
export function SkeletonCard() {
  return (
    <div className="flex items-center space-x-4">
      <div className="space-y-2">
        <Card className="w-[350px]">
          <CardContent className='p-6'>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Skeleton className="h-4 w-[250px]" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Skeleton className="h-4 w-[250px]" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className='flex gap-[50px]'>
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}