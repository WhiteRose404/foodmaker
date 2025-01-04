'use client'

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
  DrawerTrigger,
} from "../ui/drawer"

import {
  Box,
  Link,
  Container,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Icon,
  useBreakpointValue,
  useDisclosure,
  Collapsible,
} from '@chakra-ui/react'
import { CiMenuBurger } from "react-icons/ci";
import { FaShoppingBag } from "react-icons/fa";
import Image from "next/image";

// Media
import logo from "../../public/theme-logo.png";

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
          <Link
            color={{
              base: "#FF006B"
            }}
          >
            Home
          </Link>
          <Link>Menu</Link>
          <Link>Offer</Link>
        </Flex>
        <Button
          // position={{
          //   base: "absolute",
          //   lg:"block"
          // }}
          // right={0}
          // bottom={0}
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
        >
          <Icon><FaShoppingBag /></Icon> 
          <Text
            fontWeight={{
              base: "bold"
            }}
          >
              $0.00
          </Text>
        </Button>
        <DrawerRoot size={"full"}>
          <DrawerBackdrop />
          <DrawerTrigger asChild>
            <IconButton variant="surface" size="lg" bg={{ base: "gray.100"}} display={{ base: "block", lg: "none"}}>
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
              <Link
                color={{
                  base: "#FF006B"
                }}
              >
                Home
              </Link>
              <Link>Menu</Link>
              <Link>Offer</Link>
            </DrawerBody>
            <DrawerCloseTrigger />
          </DrawerContent>
        </DrawerRoot>
    </Flex>
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