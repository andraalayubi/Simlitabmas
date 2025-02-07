'use client'

import {  RefObject } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "./_quill.css"
import { ReactQuillProps } from "react-quill";
import type ReactQuill from "react-quill";

const ReactQuillComponent = dynamic(
    async () => {
        const { default: RQ } = await import('react-quill');

        const Component = ({ forwardedRef, ...props }: { forwardedRef: RefObject<ReactQuill> } & ReactQuillProps) => (
            <RQ ref={forwardedRef} {...props} />
        );

        Component.displayName = 'ReactQuillComponent';
        return Component;
    },
    {
        ssr: false,
    }
);

export default ReactQuillComponent;