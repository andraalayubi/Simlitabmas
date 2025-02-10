"use client";

import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { user_type } from "prisma/interfaces";
import EditorToolbar from "./Toolbar";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { FontSize } from "src/components/text_editor/tiptapExtension";
import TextStyle from '@tiptap/extension-text-style'
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import './_tiptap.css'


interface PurposeTextEditorProps {
  content: any;
  proposal_id: number;
  disabled: boolean;
  user_type: user_type;
}

const PurposeTextEditor: React.FC<PurposeTextEditorProps> = ({
  content,
  disabled,
}) => {
  const [editorContent, setEditorContent] = useState(content);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      OrderedList,
      ListItem,
      FontSize,
      TextStyle,
      Table.configure({
        resizable: true
      }),
      TableRow,
      TableHeader,
      TableCell
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
    "fontSize",
    "bold",
    "italic",
    "underline",
    "alignLeft",
    "alignCenter",
    "alignRight",
    "alignJustify",
    "bulletList",
    "orderedList",
    "table",
    "undo",
    "redo",
  ];

  return (
    <div className="border p-2 rounded-lg bg-white">
      <EditorToolbar editor={editor} tools={toolbarTools} />
      <EditorContent
        editor={editor}
        className="border p-2 min-h-[200px] rounded-md bg-white proposal-purpose"
      />
    </div>
  );
};

export default PurposeTextEditor;
