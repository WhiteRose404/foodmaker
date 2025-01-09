"use client";



import { Icon } from "@chakra-ui/react";

// nextjs
import Image from "next/image";

// Media
import { MdAddBusiness } from "react-icons/md";

// component
import { Button } from "@/components/ui/button"

export default function RestoBox({ image, action, add=false }: { action: any, image?: any, add?: boolean}){
    return (
        <Button
            aspectRatio={16/11}
            onClick={action}
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
                    <Image src={image} alt={"brand name"} width={1000} height={1000}/>
                )
            }
        </Button>
    )
}
