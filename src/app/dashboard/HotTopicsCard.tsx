import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WordCloud from "@/components/WordCloud";
import { prisma } from "@/lib/db";

type Props = {}

const HotTopicsCard = (props: Props) => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Hot Topics</CardTitle>
          <CardDescription>
            Click on a topic to start a quiz on it.
          </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <WordCloud />
      </CardContent>
    </Card>
  )
}
export default HotTopicsCard;