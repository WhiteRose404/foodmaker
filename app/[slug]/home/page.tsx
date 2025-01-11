"use client"

import { Box, Flex, Grid, Image, Icon } from "@chakra-ui/react";

// nextjs
import { useRouter, usePathname } from "next/navigation";

// Media
import offer_1 from "@/public/offer_1.png"
import offer_2 from "@/public/offer_2.png"


// component
import FoodHeader from "@/components/ui/food-header";
import FoodMenu from "@/components/ui/food-menu";
import FoodCard from "@/components/ui/food-card";
import FoodButton from "@/components/ui/food-button";
import ImageSlider from "@/components/ui/image-slider";
import { useEffect, useState } from "react";
import { useAppContext } from "@/utils/appContext";

// 
import Steak from "@/public/steak_sandwich-cover.png"
import { IoIosInformationCircle } from "react-icons/io";
import { GiShuttlecock } from "react-icons/gi";
import { LuChefHat } from "react-icons/lu";


// components
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Text, Textarea, Button} from "@chakra-ui/react";
import Items from "../../admin/restaurants/items";


export default function Home() {
  const pathname = usePathname();
  const ID = pathname.split("/")[1]
  const route = useRouter();
  const { resto, setItems, items } = useAppContext();
  //
  const [selectedItem, setSelectedItem] = useState({});
  const [open, setOpen] = useState(false);
  //
  const [category, setCategory] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  useEffect(()=>{
    console.log("resto", resto)
    const categoryFetching = async ()=>{
        const res = await fetch(`/api/get/categorie?resto=${ID}`);
        const data = await res.json();
        console.log("data we have is", data.categories);
        return data.categories;
    }
    const itemsFetching = async ()=>{
        const res = await fetch(`/api/get/items?resto=${ID}`);
        const data = await res.json();
        console.log("data we have is", data.items);
        return data.items;
    }
    itemsFetching().then((resolve: any)=>{
        console.log("we got the following items", resolve);
        setDisplayItems(resolve)
    }).catch((error: any)=>{});
    categoryFetching().then((resolve: any)=>{
        console.log("we got the following categories", resolve);
        setCategory(resolve);
    }).catch((error: any)=>{})
  },[])
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
                <FoodButton small={false} onClick={()=>route.push(`/${ID}/home/menu`)}>
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
                {category.map((value: any)=>{
                    return (
                        <FoodMenu key={value._id} categorie={value.name} image={value.logo} action={()=>route.push(`/${ID}/home/menu?categorie=${value.name}`)} />
                    )
                })}
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
                <FoodButton small={false} onClick={()=>route.push(`/${ID}/home/menu`)}>View All</FoodButton>
            </Box>
            <Grid templateColumns={{lg: "repeat(4, 1fr)", md: "repeat(3, 1fr)" , base:"repeat(2, 1fr)"}} gapX="6" gapY="3">
                {displayItems.slice(0,9).map((item: any)=>{
                    return (
                        <FoodCard key={item._id} name={item.name} price={item.price} description={item.description} image={item.logo} side={false}
                            action={()=>{
                                setSelectedItem(item);
                                setOpen(true);
                            }}    
                        />
                    )
                })} 
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
                src={offer_1.src}
                alt="First Offer"
                className="rounded-2xl"
            />
            <Image
                src={offer_2.src}
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
                {displayItems.slice(0,3).map((item: any)=>{
                    return (
                        <FoodCard key={item._id} name={item.name} price={item.price} description={item.description} image={item.logo} side={true} 
                            action={()=>{
                                setSelectedItem(item);
                                setOpen(true);
                            }}
                        
                        />
                    )
                })}
            </Grid>
        </Box>
        <FoodDialog open={open} setOpen={setOpen} item={selectedItem} 
            action={()=>{
                setItems([...items, selectedItem]);
            }}
        />
    </Box>
  );
}


function FoodDialog({ open, setOpen, item, action}: any){
    return (
        <DialogRoot size={"lg"} placement={"center"} open={open} onOpenChange={(e: any) => setOpen(e.open)}>
            {/* <DialogTrigger asChild>
                <FoodButton onClick={() => setOpen(true)}>
                    Add
                </FoodButton>
            </DialogTrigger> */}
            <DialogContent>
            <DialogHeader>
                <DialogTitle
                    as={Grid}
                    gridTemplateColumns={{
                        base: "120px 1fr"
                    }}
                    gap={2}
                >
                    <Image
                        src={item.logo || Steak.src}
                        alt={item.description}
                        // style={{
                        //     objectFit: "cover"
                        // }}
                        className={`h-auto rounded-lg w-full`}
                    />
                    <Box>
                        <CardHeader name={item.name} description={item.description}/>
                        <Text
                            fontWeight={"light"}
                            fontSize={"0.75rem"}
                        >
                            {item.description}
                        </Text>
                        <Text
                            fontSize={{
                                base: "1rem"
                            }}
                            fontWeight="semibold"
                        >
                            ${item.price}
                        </Text>
                    </Box>
                    </DialogTitle>
            </DialogHeader>
            <DialogBody>
                <Box>
                    <Text fontWeight={"semibold"}>Quantity</Text>
                    <Box
                        as={Flex}
                        flexDir={"column"}
                        gap={1}
                    >
                        <Text fontSize={"0.95rem"} fontWeight={"semibold"}>Special Instructions</Text>
                        <Textarea placeholder="Add Notes..." p={1} autoresize />
                    </Box>
                </Box>
            </DialogBody>
            <DialogFooter>
                <Button
                    onClick={() => setOpen(false)}
                    fontWeight={"bold"}
                    px={{
                        base: 3
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() =>{
                        action();
                        setOpen(false)
                    }}
                    bg={"#FF006B"}
                    color={"white"}
                    fontWeight={"bold"}
                    px={{
                        base: 3
                    }}
                >
                    Add to Cart - ${Number(item.price).toFixed(2)}
                </Button>
            </DialogFooter>
            <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    )
}


function CardHeader({description="No description available", name} : {description?: string, name: string}){
    return (
        <Flex
            justifyContent={"start"}
            flexDir={"row"}
            alignItems={"center"}
        >
            <Text mr={{base: 2}}fontWeight={700} textWrap={"nowrap"} textOverflow={"ellipsis"}>{name}</Text>
            <DialogRoot size={{ base: "sm"}} placement={"center"}>
                <DialogTrigger asChild>
                <Icon
                    cursor={"pointer"}
                    _hover={{
                        color: "#FF006B"
                    }}
                >
                    <IoIosInformationCircle />
                </Icon>
                </DialogTrigger>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <FoodHeader>{name}</FoodHeader>
                    </DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <Box
                        as={Flex}
                        flexDir={"column"}
                        gap={2}
                    >
                        <Text fontSize={"md"} fontWeight={"semibold"}>Description</Text>
                        <Text ml={1}>{description}</Text>
                    </Box>
                </DialogBody>
                <DialogCloseTrigger />
                </DialogContent>
            </DialogRoot>
        </Flex>
    )
}