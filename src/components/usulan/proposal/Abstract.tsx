"use client";

import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import { user_type } from "prisma/interfaces";
import Underline from "@tiptap/extension-underline";
import EditorToolbar from "./Toolbar";

interface AbstractTextEditorProps {
  content: any;
  proposal_id: number;
  disabled: boolean;
  user_type: user_type;
}

const AbstractTextEditor: React.FC<AbstractTextEditorProps> = ({
  content,
  proposal_id,
  disabled,
  user_type,
}) => {
  const [editorContent, setEditorContent] = useState(content);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Color,
      Underline,
    ],
    content: editorContent,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const toolbarTools = [
    "bold",
    "italic",
    "underline",
    "alignLeft",
    "alignCenter",
    "alignRight",
    "alignJustify",
    "undo",
    "redo",
  ];

  return (
    <div className="border p-2 rounded-lg bg-white">
      <EditorToolbar editor={editor} tools={toolbarTools} />
      <EditorContent
        editor={editor}
        className="border p-2 min-h-[200px] rounded-md bg-white proposal-abstract"
      />
    </div>
  );
};
export default AbstractTextEditor;
