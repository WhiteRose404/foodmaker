"use client"

import { Flex, Icon, Link, Text, Image} from "@chakra-ui/react"
// import Image from "next/image";
import { TbCategoryPlus } from "react-icons/tb";

// media
import Appetiazer from "@/public/appetizers-thumb.png";
import { Button } from "./button";


export default function ({ topMenu=false, active=false, action, categorie="Flame Grill Burgers", specialAdminAdd=false, image=Appetiazer.src } : { image?: any, specialAdminAdd?: boolean, categorie?: string, action?: any, topMenu?: boolean, active?: boolean }){
    
    if(specialAdminAdd){
        categorie = "New Categorie";
    }
    console.log("image ->", image)
    return (
        <Flex
            as={Button}
            flexDir={"column"}
            minH={"fit-content"}
            bgColor={`${topMenu && !active ? "white" : "#ececf1"}`}
            px={5}
            py={3}
            borderRadius={"2xl"}
            justifyContent={"center"}
            alignItems={"center"}
            minW={`${topMenu ? "8rem" : "7rem"}`}
            _hover={{
                bg: "#FFEDF4"
            }}
            borderBottom={`${active ? "2px" : "0"}`}
            borderStyle={"solid"}
            borderColor={`${active ? "#FF006B" : "none"}`}
            onClick={action}
            maxW={"150px"}
        >
            {specialAdminAdd ? <Icon><TbCategoryPlus /></Icon> : <Image src={image} alt={"image desc"} className={`${topMenu ? "w-[65%]" : "w-full"}`} />}
            <Text fontSize={"0.75rem"} mt={1} fontWeight={"medium"} textAlign={"center"} textTransform={'capitalize'}>
                {categorie}
            </Text>
        </Flex>
    )
}