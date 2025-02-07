"use client";

import { useRef, useState } from "react";
import ReactQuillComponent from "../../text_editor/quil";
import type ReactQuill from "react-quill";

const ProposalTextEditor = (modules: any, formats: string[]) => {
  return ({}) => {
    const quillRef = useRef<ReactQuill | null>(null);
    const [content, setContent] = useState("");

    const handleEditorChange = (newContent: string) => {
      setContent(String(newContent));
    };

    return (
      <ReactQuillComponent
        forwardedRef={quillRef}
        value={content}
        theme="snow"
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
        className=""
      />
    );
  };
};

const defaultModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["clean"],
  ],
};

const nameModules = {
  toolbar: [["bold", "italic"]],
};

const methodModules = {
  toolbar: [...defaultModules.toolbar, ["code-block"]],
};

const literatureModules = {
  toolbar: [...defaultModules.toolbar, ["blockquote"]],
};

const bibliographyModules = {
  toolbar: [["italic"], ["clean"]],
}

// component each proposal' elements
export const NameTextEditor = ProposalTextEditor(nameModules, []);

export const AbstractTextEditor = ProposalTextEditor(defaultModules, [
  "header",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "align",
]);
export const BackgroundTextEditor = ProposalTextEditor(defaultModules, [
  "header",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "align",
]);
export const PurposeTextEditor = ProposalTextEditor(defaultModules, [
  "header",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "align",
]);
export const MethodTextEditor = ProposalTextEditor(methodModules, [
  "header",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "align",
  "code-block",
]);
export const LiteratureReviewTextEditor = ProposalTextEditor(
  literatureModules,
  [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "align",
    "blockquote",
  ]
);
export const BibliographyTextEditor = ProposalTextEditor(bibliographyModules, [
  "italic",
]);
