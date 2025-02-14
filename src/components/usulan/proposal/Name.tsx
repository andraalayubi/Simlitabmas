"use client";

import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import EditorToolbar from "./Toolbar";
import "./_tiptap.css"
import proposalAction from "src/action/proposalAction";

interface NameTextEditorProps {
  content: any;
  proposal_id: number;
  disabled: boolean;
  user_type: string;
}

const NameTextEditor: React.FC<NameTextEditorProps> = ({
  content,
  proposal_id,
  disabled,
  user_type,
}) => {
  const [editorContent, setEditorContent] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Bold, Italic, Underline],
    content: editorContent,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
  });

  // auto save
  useEffect(() => {
    if (!editorContent || proposal_id === 0) return;

    const timeout = setTimeout(() => {
      setIsSaving(true);
      proposalAction.updateProposalSection(
        proposal_id,
        "name",
        editorContent,
        user_type
      ).finally(() => setIsSaving(false));
    }, 3000); // auto save when idle 2 seconds

    return () => clearTimeout(timeout);
  }, [editorContent]); // Trigger auto-save saat konten berubah


  // initialize content
  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="border p-2 rounded-lg bg-white">
      <EditorToolbar
        editor={editor}
        tools={["bold", "italic", "underline", "undo", "redo"]}
      />
      <EditorContent
        editor={editor}
        className="border p-2 min-h-[200px] rounded-md bg-white proposal-name"
      />
      {isSaving && <p className="text-sm text-gray-500 mt-1">Saving...</p>}
    </div>
  );
};

export default NameTextEditor;
