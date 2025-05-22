import { BAT_MAN, CAT, DEATHPOOL, SPIDER_MAN, WOLVERINE } from "./constants";

export const findImage = (name)=>{
    const group1 = ["j", "e", "t", "c", "h"];
    const group2 = ["b", "k", "v", "a", "w"];
    const group3 = ["g", "m", "n", "p", "r"];
    const group4 = ["y", "l", "f", "s", "d"]; 
   
    const letter = name.charAt(0).toLowerCase();
    if(group1.includes(letter)){
        return BAT_MAN
    }
    else if(group2.includes(letter)){
        return SPIDER_MAN
    }
    else if(group3.includes(letter)){
        return DEATHPOOL
    }
    else if(group4.includes(letter)){
        return WOLVERINE;
    }
    else{
        return CAT
    }
    
}