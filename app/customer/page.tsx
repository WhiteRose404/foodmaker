import { Box, Text, Flex, Link, Grid } from "@chakra-ui/react";
import Image from "next/image";

// Media
import Appetiazer from "../../public/appetizers-thumb.png"
import offer_1 from "../../public/offer_1.png"
import offer_2 from "../../public/offer_2.png"

import FoodHeader from "../../components/ui/food-header";
import FoodCard from "../../components/ui/food-card";
import FoodButton from "../../components/ui/food-button";
import ImageSlider from "../../components/ui/image-slider";



export default function Home() {
  return (
    <Box>
        <Box
            my={{
                base: 2
            }}
            maxW={{
                base: "100%"
            }}
            overflowX={"auto"}
        >
            <ImageSlider />
        </Box>
        <Box
            mt={{
                base: 5
            }}
        >
            <Box
                as={Flex}
                justifyContent={"space-between"}
                mb={{
                    base: 3
                }}
            >
                <FoodHeader>
                    Our Menu
                </FoodHeader>
                <FoodButton small={false}>
                    View All
                </FoodButton>
            </Box>
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
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
            </Flex>
        </Box>
        <Box
            mt={{
                base: 5
            }}
        >
            <Box
                as={Flex}
                justifyContent={"space-between"}
                mb={{
                    base: 3
                }}
            >
                <FoodHeader>Featured Items</FoodHeader>
                <FoodButton small={false}>View All</FoodButton>
            </Box>
            <Grid templateColumns={{lg: "repeat(4, 1fr)", md: "repeat(3, 1fr)" , base:"repeat(2, 1fr)"}} gapX="6" gapY="3">
                <FoodCard side={false}/>
                <FoodCard side={false}/>
                <FoodCard side={false}/>
                <FoodCard side={false}/>
                <FoodCard side={false}/>
                <FoodCard side={false}/>
                <FoodCard side={false}/>
                <FoodCard side={false}/>
            </Grid>
        </Box>
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
            templateColumns={{sm: "repeat(2, 1fr)", base:"repeat(1, 1fr)"}}
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
        <Box
            mt={{
                base: 5
            }}
        >
            <Box 
                mb={{
                    base: 3
                }}
            >
                <FoodHeader>Most Popular Items</FoodHeader>
            </Box>
            <Grid templateColumns={{lg: "repeat(3, 1fr)", md: "repeat(2, 1fr)" , base:"repeat(1, 1fr)"}} gapX="6" gapY="3">
                <FoodCard side={true}/>
                <FoodCard side={true}/>
                <FoodCard side={true}/>
                <FoodCard side={true}/>
                <FoodCard side={true}/>
                <FoodCard side={true}/>
            </Grid>
        </Box>
    </Box>
  );
}



function Item(){
    return (
        <Flex
            as={Link}
            flexDir={"column"}
            bgColor={"#ececf1"}
            px={5}
            py={3}
            borderRadius={"2xl"}
            justifyContent={"center"}
            alignItems={"center"}
            w={"7rem"}
            _hover={{
                bg: "#FFEDF4"
            }}
        >
            <Image src={Appetiazer} alt={"image desc"} />
            <Text fontSize={"0.85rem"} mt={1} fontWeight={"semibold"} textTransform={'lowercase'}>
                Appetiazers
            </Text>
        </Flex>
    )
}