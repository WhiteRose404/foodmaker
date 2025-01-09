"use client";

import { Box, Flex, Tabs, Grid, Text } from "@chakra-ui/react"
import BasicInformation from "./basicInformation";
import Categorie from "./categories"
import Items from "./items"


const items = [
  {
    title: "Basic Information's",
    Content: ()=>(<BasicInformation />)
  },
  {
    title: "Categories",
    Content: ()=>(<Categorie />)
  },
  {
    title: "Items",
    Content: ()=>(<Items />)
  },
]

export default function(){
  return (
    <Flex mt={{ base: 3}}>
      <Tabs.Root defaultValue="1" width="full">
        <Tabs.List as={Grid} gridTemplateColumns={"repeat(3, 1fr)"}>
          {items.map((item, index) => (
            <Tabs.Trigger key={index} value={item.title}>
                <Text  textAlign={"center"}>{item.title}</Text>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Box pos="relative" width="full">
          {items.map((item, index) => (
            <Tabs.Content
              key={index}
              value={item.title}
              position="absolute"
              inset="0"
              _open={{
                animationName: "fade-in, scale-in",
                animationDuration: "300ms",
              }}
              _closed={{
                animationName: "fade-out, scale-out",
                animationDuration: "120ms",
              }}
            >
              <item.Content />
            </Tabs.Content>
          ))}
        </Box>
      </Tabs.Root>
    </Flex>
  )
}




