import React from "react";
import { useState } from "react";
import TypingContext from './Context'
import data from '../../Data.json'

function TypingContextProvider({children}){

    console.log(data)
    return(
        <TypingContext.Provider value={{}}>
        {children}
        </TypingContext.Provider>
    )
}

export default TypingContextProvider;