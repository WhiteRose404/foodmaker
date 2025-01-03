import { Box, Text, Button, Flex, Link, CardRoot, CardBody, CardDescription, Grid, Icon } from "@chakra-ui/react";
import Image from "next/image";

// Media
import Appetiazer from "../../public/appetizers-thumb.png"
import Steak from "../../public/steak_sandwich-cover.png"
import { IoIosInformationCircle } from "react-icons/io";



export default function Home() {
  return (
    <Box>
        <Box>
            Slidover
        </Box>
        <Box>
            <Box>
                <Text>Our Menu</Text>
                <Button>View All</Button>
            </Box>
            <Flex
                flexDir={"row"}
                flexWrap={"nowrap"}
                w={"100%"}
                gap={2}
            >
                <Item />
                <Item />
                <Item />
                <Item />
            </Flex>
        </Box>
        <Box>
            <Box>
                <Text>Featured Items</Text>
                <Button>View All</Button>
            </Box>
            <Grid templateColumns={{lg: "repeat(4, 1fr)", md: "repeat(3, 1fr)" , base:"repeat(2, 1fr)"}} gap="6">
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
            </Grid>
        </Box>
        <Box>
            Most Popular Items
        </Box>
    </Box>
  );
}


function FoodCard(){
    return (
        <CardRoot overflow="hidden" className="border border-[#eff0f6] rounded-3xl">
            <Image
                src={Steak}
                alt="Green double couch with wooden legs"
                className="w-full"
            />
            <CardBody gap="2">
                <CardDescription
                    as={Box}
                >
                    <Grid
                        templateColumns={"1fr 1fr"}
                    >
                        <Text w={"100%"} fontWeight={700} textWrap={"nowrap"} textOverflow={"ellipsis"}>BBQ Pulled Pored</Text>
                        <Icon><IoIosInformationCircle /></Icon>
                    </Grid>
                </CardDescription>
            </CardBody>
        </CardRoot>
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
        >
            <Image src={Appetiazer} alt={"image desc"} />
            <Text fontSize={"0.9rem"}>Appetiazers</Text>
        </Flex>
    )
}