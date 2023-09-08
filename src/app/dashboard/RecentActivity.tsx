import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";


type Props = {}

const RecentActivity = (props: Props) => {
  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <Link href="/history">Recent Activity</Link>
        </CardTitle>
        
        <CardDescription>
          {/* You have played a total of {games_count} quizzes. */}
        </CardDescription>
      </CardHeader>

      <CardContent className="col-span-4 lg:col-span-3">
        
      </CardContent>
    </Card>
  )
}

export default RecentActivity;