"use client";

import { Box, Grid, Flex } from "@chakra-ui/react";


import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

// component
import FoodMenu from "@/components/ui/food-menu";
import FoodHeader from "@/components/ui/food-header";
import FoodCard from "@/components/ui/food-card";
import { useAppContext } from "@/utils/appContext";

export default function (){
    const searchparms = useSearchParams();
    const [selected, setSelected] = useState<String>(searchparms.get("categorie") || "");

    const route = useRouter();
    const { resto, setItems } = useAppContext();
    const [category, setCategory] = useState([]);
    const [displayItems, setDisplayItems] = useState([]);

    useEffect(()=>{
        console.log("resto", resto)
        const categoryFetching = async ()=>{
            const res = await fetch(`/api/get/categorie?resto=${resto._id}`);
            const data = await res.json();
            console.log("data we have is", data.categories);
            return data.categories;
        }
        categoryFetching().then((resolve: any)=>{
            console.log("we got the following categories", resolve);
            setCategory(resolve);
        }).catch((error: any)=>{})
    },[])

    useEffect(()=>{
        console.log("fetching ", selected)
        const itemsFetching = async ()=>{
            const res = await fetch(`/api/get/items?resto=${resto._id}&category=${selected}`);
            const data = await res.json();
            console.log("data we have is", data.items);
            return data.items;
        }
        itemsFetching().then((resolve: any)=>{
            console.log("we got the following items", resolve);
            setDisplayItems(resolve)
        }).catch((error: any)=>{});
    }, [selected]);
    return (
        <Box
            mt={{
                base: 5
            }}
        >
            <Flex
                flexDir={"row"}
                flexWrap={"nowrap"}
                w={"100%"}
                overflowX={{
                    base: "auto"
                }}
                gap={3}
                className="scrollbar-hidden"
            >

                {category.map((value: any)=>{
                    return (
                        <FoodMenu key={value._id} topMenu categorie={value.name} image={value.logo} action={()=>setSelected(value.name)} active={value.name == selected} />
                    )
                })}
            </Flex>
            <Box
                as={Flex}
                flexDir={"column"}
                gap={"2rem"} 
                mt={{
                    base: "5rem"
                }}
                
                >
                <FoodHeader customColor="#FF006B">Flame Grill Burgers</FoodHeader>
                <Grid templateColumns={{lg: "repeat(3, 1fr)", md: "repeat(2, 1fr)" , base:"repeat(1, 1fr)"}} gapX="6" gapY="3">
                    {displayItems.map((item: any)=>{
                        return (
                            <FoodCard key={item._id} name={item.name} price={item.price} description={item.description} image={item.logo} side={true} />
                        )
                    })}
                </Grid>
            </Box>
        </Box>
    )
}