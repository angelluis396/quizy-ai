import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import WordCloud from "@/components/CustomWordCloud";
import { prisma } from "@/lib/db";
// import CustomWordCloud from "@/components/CustomWordCloud";

type Props = {}

const HotTopicsCard = async (props: Props) => {
  const topics = await prisma.topic_count.findMany({});
  const formattedTopics = topics.map((topic) => {
    return {
      text: topic.topic,
      value: topic.count,
    };
  });

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Hot Topics</CardTitle>
          <CardDescription>
            Click on a topic to start a quiz on it.
          </CardDescription>
      </CardHeader>
    </Card>
  )
}
export default HotTopicsCard;