"use client"

import { Flex, Link, Text} from "@chakra-ui/react"
import Image from "next/image";

// media
import Appetiazer from "../../public/appetizers-thumb.png";


export default function ({ topMenu=false, active=false } : { topMenu?: boolean, active?: boolean }){
    return (
        <Flex
            as={Link}
            flexDir={"column"}
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
        >
            <Image src={Appetiazer} alt={"image desc"} className={`${topMenu ? "w-[65%]" : "w-full"}`} />
            <Text fontSize={"0.75rem"} mt={1} fontWeight={"medium"} textAlign={"center"} textTransform={'capitalize'}>
                Flame Grill Burgers
            </Text>
        </Flex>
    )
}