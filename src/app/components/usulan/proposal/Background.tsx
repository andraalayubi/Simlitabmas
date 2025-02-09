"use client";

import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import ImageResize from 'tiptap-extension-resize-image';
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";
import { user_type } from "prisma/interfaces";
import {
  IconBold,
  IconItalic,
  IconUnderline,
  IconStrikethrough,
  IconCode,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconAlignJustified,
  IconPhoto,
  IconLink,
  IconUnlink,
  IconList,
  IconListNumbers,
  IconQuote,
  IconSeparator,
  IconArrowBack,
  IconArrowForward,
  IconH1,
  IconH2,
  IconH3,
} from "@tabler/icons-react"; // Import ikon dari Tabler Icons
import EditorToolbar from "./Toolbar";

interface BackgroundTextEditorProps {
  content: any;
  proposal_id: number;
  disabled: boolean;
  user_type: user_type;
}

const BackgroundTextEditor: React.FC<BackgroundTextEditorProps> = ({
  content,
  proposal_id,
  disabled,
  user_type,
}) => {
  const [editorContent, setEditorContent] = useState(content);

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc", // handle list and heading toolbar
      },
    },
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Color,
      Link.configure({ openOnClick: true }),
      Image,
      Heading.configure({ levels: [1, 2, 3] }),
      ListItem,
      Underline,
      ImageResize
    ],
    content: `
        <p>This is a basic example of implementing images. Drag to re-order.</p>
        <img src="https://placehold.co/800x400" />
      `,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
  });

  // useEffect(() => {
  //   if (editor) {
  //     editor.commands.setContent(content);
  //   }
  // }, [content, editor]);

  const addImage = () => {
    const url = prompt("Masukkan URL gambar:");
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = prompt("Masukkan URL:");
    if (url) {
      editor?.chain().focus().toggleLink({ href: url }).run();
    }
  };

  const toolbarTools = [
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "code",
    "alignLeft",
    "alignCenter",
    "alignRight",
    "alignJustify",
    "heading1",
    "heading2",
    "heading3",
    "bulletList",
    "orderedList",
    "blockquote",
    "horizontalRule",
    "link",
    "unlink",
    "image",
    "undo",
    "redo",
  ];

  return (
    <div className="border p-2 rounded-lg bg-white">
      <EditorToolbar editor={editor} tools={toolbarTools} />
      <EditorContent
        editor={editor}
        className="border p-2 min-h-[200px] rounded-md bg-white proposal-background"
      />
    </div>
  );
};
export default BackgroundTextEditor;
