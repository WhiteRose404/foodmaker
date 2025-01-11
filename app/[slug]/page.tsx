"use client"

import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";



import { MdRestaurantMenu } from "react-icons/md";
import { RiArrowRightLine, RiMailLine } from "react-icons/ri"
import { Button } from "@/components/ui/button";

import themeLogo from "@/public/theme-logo.png"
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppContext } from "@/utils/appContext";


export default function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const route = useRouter();
    const TABLE = useSearchParams().get("table");
    const { resto, table, setTable, setResto } = useAppContext();
    if(!resto._id)
        route.push("/")
    setTable(Number(TABLE));
    const [restaurant, setRestaurant] = useState<any>({});
    useEffect(()=>{
        const fetchData = async ()=>{
            // const slug = (await params).slug;
            // setSlug(slug);
            const res = await fetch(`/api/get/restaurant?resto=${resto._id}`);
            const data = await res.json();
            console.log("data we have is", data);
            if(data.tables < table || table < 0)
                route.push("/");
            console.log("table is", table);
            if(data.error) 
                throw Error("resto not found")
            return data;
        }
        fetchData().then((resolve: any[]) => {
            setRestaurant(resolve);
            setResto(resolve);
        }).catch((reason: any)=>{ 
            console.log("")
        })
    }, []);
    return (
        <>
            <Flex gap={10} flexDir={"column"} minW={"100vw"} minH={"100vh"} bg={"black"} justifyContent={"center"} alignItems={"center"} color={"white"}>
                <Image 
                    src={restaurant.logo || themeLogo}
                    alt={`resto Image`}
                    style={{
                        objectFit: "fill"
                    }}
                    width={500}
                    height={500}
                    className="rounded-xl transition-all duration-500 ease-in-out cursor-pointer"
                />
                <Flex
                    alignItems={"stretch"}
                    flexDir={"column"}
                    gap={2}
                >
                    <Button border={"1px solid green"} px={5} _hover={{ bg: "teal" }} variant="solid" onClick={()=> {route.push(`/${resto._id}/home`)}}>
                        <MdRestaurantMenu /> Menu
                    </Button>
                    <Button border={"1px solid green"} px={5} _hover={{ bg: "teal" }} variant="outline">
                        Contact us <RiArrowRightLine />
                    </Button>
                </Flex>
            </Flex>
        </>
    )
}