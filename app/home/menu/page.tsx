"use client";

import { Box, Grid, Flex } from "@chakra-ui/react";



// component
import FoodMenu from "@/components/ui/food-menu";
import FoodHeader from "@/components/ui/food-header";
import FoodCard from "@/components/ui/food-card";

export default function (){
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
                <FoodMenu topMenu/>
                <FoodMenu topMenu active/>
                <FoodMenu topMenu/>
                <FoodMenu topMenu/>
                <FoodMenu topMenu/>
                <FoodMenu topMenu/>
                <FoodMenu topMenu/>
                <FoodMenu topMenu/>
                <FoodMenu topMenu/>
                <FoodMenu topMenu/>
                <FoodMenu topMenu/>
                <FoodMenu topMenu/>
                <FoodMenu topMenu/>
                <FoodMenu topMenu/>
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
                    <FoodCard side={true}/>
                    <FoodCard side={true}/>
                    <FoodCard side={true}/>
                    <FoodCard side={true}/>
                    <FoodCard side={true}/>
                </Grid>
            </Box>
        </Box>
    )
}