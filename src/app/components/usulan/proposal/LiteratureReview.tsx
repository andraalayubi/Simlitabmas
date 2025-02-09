"use client";

import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Blockquote from "@tiptap/extension-blockquote";
import { user_type } from "prisma/interfaces";
import EditorToolbar from "./Toolbar";
import Color from "@tiptap/extension-color";
import ImageResize from "tiptap-extension-resize-image";
import Image from "@tiptap/extension-image";
import ListItem from "@tiptap/extension-list-item";

interface LiteratureReviewTextEditorProps {
  content: any;
  proposal_id: number;
  disabled: boolean;
  user_type: user_type;
}

const LiteratureReviewTextEditor: React.FC<LiteratureReviewTextEditorProps> = ({
  content,
  disabled,
}) => {
  const [editorContent, setEditorContent] = useState(content);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Color,
      Link.configure({ openOnClick: true }),
      Image,
      Heading.configure({ levels: [1, 2, 3] }),
      ListItem,
      Blockquote,
      Underline,
      ImageResize
    ],
    content: editorContent,
    editable: !disabled,
    editorProps: {
      attributes: {
        class: "prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc", // handle list and heading toolbar
      },
    },
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor) editor.commands.setContent(content);
  }, [content, editor]);

  const toolbarTools = [
    "bold",
    "italic",
    "underline",
    "horizontalRule",
    "alignLeft",
    "alignCenter",
    "alignRight",
    "alignJustify",
    "heading1",
    "heading2",
    "heading3",
    "blockquote",
    "bulletList",
    "orderedList",
    "code",
    "link",
    "unlink",
    "undo",
    "redo",
  ];

  return (
    <div className="border p-2 rounded-lg bg-white">
      <EditorToolbar editor={editor} tools={toolbarTools} />
      <EditorContent
        editor={editor}
        className="border p-2 min-h-[200px] rounded-md bg-white proposal-literature-review"
      />
    </div>
  );
};

export default LiteratureReviewTextEditor;
