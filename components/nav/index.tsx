'use client'


import {
  Link,
  Container,
  Flex,
  Text,
  IconButton,
  Button,
  Icon,
} from '@chakra-ui/react'


import { CiMenuBurger } from "react-icons/ci";
import { FaShoppingBag } from "react-icons/fa";

import { useState } from 'react';
import Image from "next/image";

// Media
import logo from "@/public/theme-logo.png";
import emptyCart from "@/public/empty-cart.gif";

// Componenet
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger
} from "../ui/drawer"
import FoodHeader from '../ui/food-header';


export default function WithSubnavigation() {
  return (
    <Container
      maxW={{
        "2xl": "1200px"
      }}
      py={{
        base: 1
      }}
    >
      <DesktopNav />
    </Container>
  )
}

const DesktopNav = ()=>{
  const [cartDrawer, setCartDrawer] = useState(false);
  return (
    <Flex
        flexDir={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Image src={logo} alt="Logo of restaurnte" width={120}/>
        <Flex
          as={"ul"}
          display={{
            base: "none",
            md: "flex"
          }}
          gap={{
            base: 5
          }}
          fontWeight={"semibold"}
          fontSize={{
            base: "0.95rem"
          }}
        >
          <Links />
        </Flex>
        <DrawerRoot open={cartDrawer}>
          <DrawerBackdrop/>
          <DrawerTrigger asChild>
            <Button
              onClick={() => setCartDrawer(true)}
              rounded={{
                base: "4xl"
              }}
              bg={"#17171e"}
              color={"white"}
              px={{
                base: 4
              }}
              gap={{
                base: 2
              }}
              fontSize={{
                base: "0.95rem"
              }}
              fontFamily={{ base: "rubik,sans-serif" }}
              ml={{
                base: "auto",
                md: "0"
              }}
            >
              <Icon as={Flex} justifyContent={"center"} alignItems={"center"}><FaShoppingBag /></Icon> 
              <Text
                fontWeight={{
                  base: "bold"
                }}
              >
                  $0.00
              </Text>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle justifyContent={"center"}>
                <FoodHeader center>My Cart</FoodHeader>
              </DrawerTitle>
            </DrawerHeader>
            <DrawerBody
              as={Flex}
              justifyContent={"center"}
              alignItems={"center"}
              flexDir={"column"}
            >
              <Image src={emptyCart} alt='empty Cart' />
              <Text mt={{base: 5}} fontWeight={"extralight"}>Empty Cart</Text>
            </DrawerBody>
            <DrawerFooter>
              {/* <DrawerActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerActionTrigger>
              <Button>Save</Button> */}
            </DrawerFooter>
            <DrawerCloseTrigger onClick={() => setCartDrawer(false)}/>
          </DrawerContent>
        </DrawerRoot>
        <DrawerRoot size={"full"}>
          <DrawerBackdrop />
          <DrawerTrigger asChild>
            <IconButton ml={4} variant="surface" size="lg" border={{ base: "1px solid gray.100"}} h={"2rem"} aspectRatio={"golden"} display={{ base: "flex", md: "none"}} justifyContent={"center"}>
              <CiMenuBurger />
            </IconButton>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerBody
              as={Flex}
              flexDir={"column"}
              gap={{
                base: "3rem"
              }}
              fontSize={{
                base: "2.1rem"
              }}
              justifyContent={"center"}
              alignItems={'center'}
            >
              <Links />
            </DrawerBody>
            <DrawerCloseTrigger />
          </DrawerContent>
        </DrawerRoot>
    </Flex>
  )
}

function Links(){
  return (
    <>
      <Link
        color={{
          base: "#FF006B"
        }}
        href="/home"
      >
        Home
      </Link>
      <Link
        href="/home/menu"
      >Menu</Link>
      <Link
        href="/home/offers"
      >Offer</Link>
    </>
  )
}


// const DesktopNav = () => {
//   const linkColor = 'gray.600'
//   const linkHoverColor = 'gray.800'
//   const popoverContentBgColor = 'white'

//   return (
//   )
// }

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Inspiration',
    children: [
      {
        label: 'Explore Design Work',
        subLabel: 'Trending Design to inspire you',
        href: '#',
      },
      {
        label: 'New & Noteworthy',
        subLabel: 'Up-and-coming Designers',
        href: '#',
      },
    ],
  },
  {
    label: 'Find Work',
    children: [
      {
        label: 'Job Board',
        subLabel: 'Find your dream design job',
        href: '#',
      },
      {
        label: 'Freelance Projects',
        subLabel: 'An exclusive list for contract work',
        href: '#',
      },
    ],
  },
  {
    label: 'Learn Design',
    href: '#',
  },
  {
    label: 'Hire Designers',
    href: '#',
  },
]