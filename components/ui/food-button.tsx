"use client";

import FoodSmallButton from "@/components/ui/food-small-button";
import FoodBigButton from "@/components/ui/food-big-button";
import { FaShoppingBag } from "react-icons/fa";


export default function({ children, small=true, onClick, CustomIcon=FaShoppingBag }: { onClick?: any, small?: boolean; text?: string, children?: any, CustomIcon?: any}){
    if(small){
        return (
            <FoodSmallButton onClick={onClick} CustomIcon={CustomIcon}>
                {children}
            </FoodSmallButton>
        )
    }
    return (
        <FoodBigButton onClick={onClick}>
            {children}
        </FoodBigButton>
    )
}