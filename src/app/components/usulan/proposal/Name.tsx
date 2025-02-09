"use client";

import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import "./_tiptap.css"
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import { user_type } from "prisma/interfaces";
import EditorToolbar from "./Toolbar";

interface NameTextEditorProps {
  content: any;
  proposal_id: number;
  disabled: boolean;
  user_type: user_type;
}

const NameTextEditor: React.FC<NameTextEditorProps> = ({ content, proposal_id, disabled, user_type }) => {
  const [editorContent, setEditorContent] = useState(content);

  const editor = useEditor({
    extensions: [StarterKit, Bold, Italic, Underline],
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
    "undo",
    "redo",
  ];

  return (
    <div className="border p-2 rounded-lg bg-white">
      <EditorToolbar editor={editor} tools={toolbarTools} />
      <EditorContent
        editor={editor}
        className="border p-2 min-h-[200px] rounded-md bg-white proposal-name"
      />
    </div>
  );
};

export default NameTextEditor;
