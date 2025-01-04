"use client";

import FoodSmallButton from "./food-small-button";
import FoodBigButton from "./food-big-button";

export default function({ children, small=true }: { small?: boolean; text?: string, children?: any}){
    if(small){
        return (
            <FoodSmallButton>
                {children}
            </FoodSmallButton>
        )
    }
    return (
        <FoodBigButton>
            {children}
        </FoodBigButton>
    )
}