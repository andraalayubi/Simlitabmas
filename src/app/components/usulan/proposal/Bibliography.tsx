"use client";

import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { user_type } from "prisma/interfaces";
import EditorToolbar from "./Toolbar";

interface BibliographyTextEditorProps {
  content: any;
  proposal_id: number;
  disabled: boolean;
  user_type: user_type;
}

const BibliographyTextEditor: React.FC<BibliographyTextEditorProps> = ({
  content,
  disabled,
}) => {
  const [editorContent, setEditorContent] = useState(content);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      Link,
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
    "alignLeft",
    "alignCenter",
    "alignRight",
    "alignJustify",
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
        className="border p-2 min-h-[200px] rounded-md bg-white proposal-bibliography"
      />
    </div>
  );
};

export default BibliographyTextEditor;
