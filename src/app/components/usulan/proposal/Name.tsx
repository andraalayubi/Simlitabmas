"use client";

import { useRef, useState } from "react";
import ReactQuillComponent from "../../text_editor/quil";
import type ReactQuill from "react-quill";

const NameTextEditor: React.FC = ({}) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const [content, setContent] = useState("");
  const quillModules = {
    toolbar: [
      ["bold", "italic"],
    ],
  };

  const quillFormats = [
    "bold",
    "italic",
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
        placeholder="Masukkan Judul Proposal"
        onChange={handleEditorChange}
        modules={quillModules}
        formats={quillFormats}
        className=""
      />
    </>
  );
};

export default NameTextEditor;
