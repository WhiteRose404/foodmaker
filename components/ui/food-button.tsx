"use client";

import FoodSmallButton from "./food-small-button";
import FoodBigButton from "./food-big-button";

export default function({ children, small=true, onClick }: { onClick?: any, small?: boolean; text?: string, children?: any}){
    if(small){
        return (
            <FoodSmallButton onClick={onClick}>
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