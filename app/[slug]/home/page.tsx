"use client"

import { Box, Flex, Grid, Image, Icon, Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

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
  const [selectedItem, setSelectedItem] = useState({
    commentaire: "",
    quantity: 1,
    price: 0
  });
  const [commentaire,setCommentaire] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState([]);
  const [addons, setAddons] = useState([]);
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
        <FoodDialog open={open} setOpen={setOpen} item={selectedItem} commentaire={commentaire} setCommentaire={setCommentaire} quantity={quantity} setQuantity={setQuantity} chossedSize={size} setSize={setSize}
            action={()=>{
                const chossed = {...selectedItem};
                chossed.quantity = quantity;
                chossed.price = quantity * chossed.price;
                chossed.commentaire = commentaire;
                setItems([...items, chossed]);
            }}
        />
    </Box>
  );
}


function FoodDialog({ open, setOpen, item, action, quantity, setQuantity, commentaire, setCommentaire, chossedSize, setSize}: any){
    return (
        <DialogRoot size={"lg"} placement={"center"} open={open} onOpenChange={(e: any) => setOpen(e.open)}>
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
            <DialogBody
                as={Flex}
                flexDir={"column"}
                gap={"2"}
            >
                <Flex
                    flexDir={"column"}

                >
                    <Field gap={0} label="Quantity">
                        <Input type="number" px={2} border={"1px solid #000000A0"} name="quantity" value={quantity} onChange={({ target: { value }}: {target: { value: string }})=>{ setQuantity(Number(value)) }} />
                    </Field>
                    <Box
                        as={Flex}
                        flexDir={"column"}
                        gap={1}
                    >
                        <Text fontSize={"0.85rem"} fontWeight={"semibold"}>Special Instructions</Text>
                        <Textarea placeholder="Add Notes..." p={1} autoresize value={commentaire} onChange={({ target: { value }}: {target: { value: string }})=>{ setCommentaire(value) }}/>
                    </Box>
                </Flex>
                {item.sizes?.map((size: any)=>{
                    return (
                        <Flex
                            key={size.name}
                            bg={"gray.400"}
                            flexDir={"column"}
                            px={{
                                base: 3
                            }}
                            py={{
                                base: 3
                            }}
                            rounded={"2xl"}
                            color={"white"}
                            maxW={'5rem'}
                            justifyContent={"center"}
                            alignItems={"center"}
                            _hover={{
                                bg: "blackAlpha.900",
                                cursor: "pointer"
                            }}
                            // onClick={()=> setSizes(sizes.filter(((value: any) => value.name != size.name && value.price != size.price)))}
                        >
                            <Text mr={"auto"}>{size.name}</Text>
                            <Text ml={"auto"}>+${size.price}</Text>
                        </Flex>
                    )
                })}
                {item.addons?.map((size: any)=>{
                    return (
                        <Flex
                            key={size.name}
                            bg={size.name == chossedSize.name && size.price == chossedSize.price ? "blackAlpha.800" : "gray.400"}
                            flexDir={"column"}
                            px={{
                                base: 3
                            }}
                            py={{
                                base: 3
                            }}
                            rounded={"2xl"}
                            color={"white"}
                            maxW={'10rem'}
                            justifyContent={"center"}
                            alignItems={"center"}
                            _hover={{
                                bg: "blackAlpha.800",
                                cursor: "pointer"
                            }}
                            onClick={()=> setSize({name: size.name, size: size.price})}
                        >
                            <Text mr={"auto"}>{size.name}</Text>
                            <Text ml={"auto"}>+${size.price}</Text>
                        </Flex>
                    )
                })}
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