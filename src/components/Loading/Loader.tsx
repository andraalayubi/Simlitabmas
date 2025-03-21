"use client"

import React from 'react'
import { Loader } from "@mantine/core";

function LoaderComponent() {
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <Loader color="blue" />
        </div>
    )
}

export default LoaderComponent