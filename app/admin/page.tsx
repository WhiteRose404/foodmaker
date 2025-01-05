"use client";

import { Box, Flex, Icon, Link } from "@chakra-ui/react";

import { MdAddBusiness } from "react-icons/md";


// nextjs
import Image from "next/image";

// Media
import offer_1 from "@/public/burger_king.png"
import offer_2 from "@/public/pizza_hut_ori.png"

// component
import FoodHeader from "@/components/ui/food-header";


export default function (){
    return (
        <Box
            mt={{
                base: "3rem"
            }}
        >
            <FoodHeader customColor="black">
                All restaurants
            </FoodHeader>
            <Flex
                mt={{
                    base: 5
                }}
                gapX={{
                    base: 2
                }}
                gapY={{
                    base: 3
                }}
                mx={{
                    base: 2
                }}
                flexDir={"row"}
                flexWrap={"wrap"}
            >
                <RestoBox
                    image={offer_1}
                />
                <RestoBox
                    image={offer_2}
                />
                <RestoBox
                    add
                />
            </Flex>
        </Box>
    )
}


function RestoBox({ image,add=false }: { image?: any, add?: boolean}){
    return (
        <Link
            aspectRatio={16/11}
            href={"/admin/restaurants"}
            height={{ base: "13vh", md: "20vh"}}
            border={"1px solid black"}
            bg={"gray.50"}
            _hover={{
                bg: "gray.900",
                color: "whiteAlpha.900"
            }}
            className="rounded-2xl overflow-hidden"
        >
            {
                add ? <Icon minW={"100%"}><MdAddBusiness width={"100%"} /></Icon> : (
                    <Image src={image} alt={"brand name"} />
                )
            }
        </Link>
    )
}