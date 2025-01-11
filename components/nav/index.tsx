'use client'


import {
  Link,
  Container,
  Flex,
  Text,
  IconButton,
  Button,
  Icon,
  Image
} from '@chakra-ui/react'


import { CiMenuBurger } from "react-icons/ci";
import { FaShoppingBag } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";


import { useState } from 'react';
// import Image from "next/image";
import { usePathname } from 'next/navigation'

// Media
import Logo from "@/public/theme-logo.png";
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
} from "@/components/ui/drawer"
import FoodHeader from '@/components/ui/food-header';
import { useAppContext } from '@/utils/appContext';
import FoodCard from '../ui/food-card';
import messageformater from '@/utils/messageformater';

type LinkType = {value: string, link: string};

export default function WithSubnavigation({ admin=false, links}: {admin?: boolean, links: LinkType[]}) {
  return (
    <Container
      maxW={{
        "2xl": "1200px"
      }}
      py={{
        base: 1
      }}
    >
      <DesktopNav admin={admin} links={links} />
    </Container>
  )
}

const DesktopNav = ({ admin, links}: {admin: boolean, links: LinkType[]})=>{
  const [cartDrawer, setCartDrawer] = useState(false);
  const { resto, items, setItems } = useAppContext();
  return (
    <Flex
        flexDir={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Image src={resto.logo || Logo.src} alt="Logo of restaurnte" width={120}/>
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
          <Links links={links} />
        </Flex>
        <DrawerRoot open={cartDrawer} size={"md"}>
          <DrawerBackdrop/>
          <DrawerTrigger asChild>
            <Button
              onClick={() => {
                setCartDrawer(true && !admin)
              }}
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
              <Icon as={Flex} justifyContent={"center"} alignItems={"center"}>{admin ? <RiAdminFill /> : <FaShoppingBag />}</Icon> 
              <Text
                fontWeight={{
                  base: "bold"
                }}
              >
                  {admin ? "Admin": (items.length <= 0) ? "$0.00": `$${(items.reduce((pre, item)=> pre+item.price, 0)).toFixed(2)}`}
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
              justifyContent={items.length > 0 ? "flex-start" : "center"}
              alignItems={"center"}
              flexDir={"column"}
              gap={2}
              mt={2}
            >
              {items.length > 0 ? 
                (
                  <>
                    {items.map((item: any, index: number)=>{
                        return (
                            <FoodCard key={`${item._id}-${index}`} name={item.name} price={item.price} description={item.description} image={item.logo} side={true}
                                customMessage='Delete'
                                action={()=>{
                                  setItems(items.filter((value: any)=>item._id != value._id))
                                }}    
                            />
                        )
                    })}
                  </> 
                ) : (
                  <>
                    <Image src={emptyCart.src} alt='empty Cart' />
                    <Text mt={{base: 5}} fontWeight={"extralight"}>Empty Cart</Text>
                  </>
                )
              }
            </DrawerBody>
            <DrawerFooter>
              {items.length > 0 && (
                  <Button
                    w={"100%"}
                    border={"1px solid black"}
                    _hover={{
                      bg: "blackAlpha.800",
                      color: "white"
                    }}
                    onClick={()=>{
                      const enrishMessage = messageformater(items, resto.table);
                      console.log("message sent", enrishMessage);
                    }}
                  >CheckOut</Button>
              )}
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
              <Links links={links}/>
            </DrawerBody>
            <DrawerCloseTrigger />
          </DrawerContent>
        </DrawerRoot>
    </Flex>
  )
}

function Links({ links }: { links: LinkType[] }){
  const pathname = usePathname()
  return (
    <>
      {links.map((link: LinkType)=>(
        <Link 
          color={{
            base: pathname.endsWith(link.link) ? "#FF006B" : "inherit"       
          }}
          key={link.value}
          href={link.link}
        >{link.value}</Link>
      ))}
    </>
  )
}

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}