"use client"

import React from 'react'
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import D3WordCloud from 'react-d3-cloud';


// type Props = {
//   formattedTopics: { text: string; value: number }[];
// };

type Props = {}

const data = [
  {
    text: "hey",
    value: 3,
  },
  {
    text: "hey",
    value: 8,
  }
]

const fontSizeMapper = (word: { value: number }) =>
  Math.log2(word.value) * 5 + 16;

const WordCloud = (props: Props) => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <>
      <D3WordCloud
        data={data}
        height={550}
        font="Times"
        fontSize={fontSizeMapper}
        rotate={0}
        padding={10}
        fill={theme.theme === "dark" ? "white" : "black"}

      />
    </>
  )
}

export default WordCloud;