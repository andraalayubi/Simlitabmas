"use client"

import React from 'react'
import { Loader } from "@mantine/core";

function LoadingPage() {
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <Loader color="blue" />
        </div>
    )
}

export default LoadingPage