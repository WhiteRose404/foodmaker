"use client";

import { Box, Flex, Tabs, Kbd, Table, Grid, Text } from "@chakra-ui/react"
import {
  ActionBarContent,
  ActionBarRoot,
  ActionBarSelectionTrigger,
  ActionBarSeparator,
} from "@/components/ui/action-bar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"


const items = [
  {
    title: "Basic Information's",
    content: [
        { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
        { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
        { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
        { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
        { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
      ]
  },
  {
    title: "Menus",
    content: [
        { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
        { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
        { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
        { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
        { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
      ]
  },
  {
    title: "Items",
    content: [
        { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
        { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
        { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
        { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
        { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
      ]
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
              <FoodTable items={item.content} />
            </Tabs.Content>
          ))}
        </Box>
      </Tabs.Root>
    </Flex>
  )
}



const FoodTable = ({ items }: { items: any}) => {
  const [selection, setSelection] = useState<string[]>([])

  const hasSelection = selection.length > 0
  const indeterminate = hasSelection && selection.length < items.length

  const rows = items.map((item: any) => (
    <Table.Row
      key={item.name}
      data-selected={selection.includes(item.name) ? "" : undefined}
      borderBottom={"1px solid #00000020"}
    >
      <Table.Cell>
        <Checkbox
          top="1"
          aria-label="Select row"
          checked={selection.includes(item.name)}
          onCheckedChange={(changes: any) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, item.name]
                : selection.filter((name) => name !== item.name),
            )
          }}
          border={"1px solid #00000010"}
        />
      </Table.Cell>
      <Table.Cell>{item.name}</Table.Cell>
      <Table.Cell>{item.category}</Table.Cell>
      <Table.Cell>${item.price}</Table.Cell>
    </Table.Row>
  ))

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="6">
              <Checkbox
                top="1"
                aria-label="Select all rows"
                checked={indeterminate ? "indeterminate" : selection.length > 0}
                onCheckedChange={(changes: any) => {
                  setSelection(
                    changes.checked ? items.map((item: any) => item.name) : [],
                  )
                }}
              />
            </Table.ColumnHeader>
            <Table.ColumnHeader>Product</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Price</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>

      <ActionBarRoot open={hasSelection}>
        <ActionBarContent>
          <ActionBarSelectionTrigger>
            {selection.length} selected
          </ActionBarSelectionTrigger>
          <ActionBarSeparator />
          <Button variant="outline" size="sm">
            Delete <Kbd>⌫</Kbd>
          </Button>
          <Button variant="outline" size="sm">
            Share <Kbd>T</Kbd>
          </Button>
        </ActionBarContent>
      </ActionBarRoot>
    </>
  )
}
