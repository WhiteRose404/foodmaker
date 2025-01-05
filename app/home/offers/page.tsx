"use client";

import { Box, Grid } from "@chakra-ui/react";

// nextjs
import Image from "next/image";

// Media
import offer_1 from "../../../public/offer_1.png"
import offer_2 from "../../../public/offer_2.png"

// component
import FoodHeader from "../../../components/ui/food-header";




export default function (){
    return (
        <Box
            mt={{
                base: "3rem"
            }}
        >
            <FoodHeader customColor="#FF006B">
                All Offers
            </FoodHeader>
            <Grid
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
                templateColumns={{md: "repeat(2, 1fr)", base:"repeat(1, 1fr)"}}
            >
                <Image
                    src={offer_1}
                    alt="First Offer"
                    className="rounded-2xl"
                />
                <Image
                    src={offer_2}
                    alt="Second Offer"
                    className="rounded-2xl"
                />
            </Grid>
        </Box>
    )
}