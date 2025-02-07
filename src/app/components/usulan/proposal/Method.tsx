"use client";

import { useRef, useState } from "react";
import ReactQuillComponent from "../../text_editor/quil";
import type ReactQuill from "react-quill";

const MethodTextEditor: React.FC = ({}) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const [content, setContent] = useState("");
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["code-block", "image"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "align",
    "code-block",
    "image"
  ];

  const handleEditorChange = (newContent: String) => {
    setContent(String(newContent));
  };

  return (
    <>
      <ReactQuillComponent
        forwardedRef={quillRef}
        value={content}
        theme="snow"
        onChange={handleEditorChange}
        modules={quillModules}
        formats={quillFormats}
        className="w-full h-64 pb-11 bg-white"
      />
    </>
  );
};

export default MethodTextEditor;