"use client";

import React from "react";
import { Editor } from "@tiptap/react";
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
} from "@tabler/icons-react";

interface EditorToolbarProps {
  editor: Editor | null;
  tools: string[];
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor, tools }) => {
  if (!editor) return null;

  const toolbarButtons: any = getToolbarButtons(editor);

  return (
    <div className="mb-2 flex gap-2 flex-wrap">
      {tools.map((tool) => {
        const buttonConfig = toolbarButtons[tool];
        return buttonConfig ? (
          <ToolbarButton
            key={tool}
            action={buttonConfig.action}
            active={buttonConfig.active}
            icon={buttonConfig.icon}
          />
        ) : null;
      })}
    </div>
  );
};

interface ToolbarButtonProps {
  action: () => void;
  active: boolean;
  icon: React.ReactNode;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  action,
  active,
  icon,
}) => {
  return (
    <button
      type="button"
      onClick={action}
      className={`p-1 rounded-md hover:bg-gray-100 ${
        active ? "bg-gray-200" : ""
      }`}
    >
      {icon}
    </button>
  );
};

const getToolbarButtons = (editor: Editor) => ({
  bold: {
    action: () => editor.chain().focus().toggleBold().run(),
    active: editor.isActive("bold"),
    icon: <IconBold size={16} />,
  },
  italic: {
    action: () => editor.chain().focus().toggleItalic().run(),
    active: editor.isActive("italic"),
    icon: <IconItalic size={16} />,
  },
  underline: {
    action: () => editor.chain().focus().toggleUnderline().run(),
    active: editor.isActive("underline"),
    icon: <IconUnderline size={16} />,
  },
  strikethrough: {
    action: () => editor.chain().focus().toggleStrike().run(),
    active: editor.isActive("strike"),
    icon: <IconStrikethrough size={16} />,
  },
  code: {
    action: () => editor.chain().focus().toggleCode().run(),
    active: editor.isActive("code"),
    icon: <IconCode size={16} />,
  },
  alignLeft: {
    action: () => editor.chain().focus().setTextAlign("left").run(),
    active: editor.isActive({ textAlign: "left" }),
    icon: <IconAlignLeft size={16} />,
  },
  alignCenter: {
    action: () => editor.chain().focus().setTextAlign("center").run(),
    active: editor.isActive({ textAlign: "center" }),
    icon: <IconAlignCenter size={16} />,
  },
  alignRight: {
    action: () => editor.chain().focus().setTextAlign("right").run(),
    active: editor.isActive({ textAlign: "right" }),
    icon: <IconAlignRight size={16} />,
  },
  alignJustify: {
    action: () => editor.chain().focus().setTextAlign("justify").run(),
    active: editor.isActive({ textAlign: "justify" }),
    icon: <IconAlignJustified size={16} />,
  },
  heading1: {
    action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    active: editor.isActive("heading", { level: 1 }),
    icon: <IconH1 size={16} />,
  },
  heading2: {
    action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    active: editor.isActive("heading", { level: 2 }),
    icon: <IconH2 size={16} />,
  },
  heading3: {
    action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    active: editor.isActive("heading", { level: 3 }),
    icon: <IconH3 size={16} />,
  },
  bulletList: {
    action: () => editor.chain().focus().toggleBulletList().run(),
    active: editor.isActive("bulletList"),
    icon: <IconList size={16} />,
  },
  orderedList: {
    action: () => editor.chain().focus().toggleOrderedList().run(),
    active: editor.isActive("orderedList"),
    icon: <IconListNumbers size={16} />,
  },
  blockquote: {
    action: () => editor.chain().focus().toggleBlockquote().run(),
    active: editor.isActive("blockquote"),
    icon: <IconQuote size={16} />,
  },
  horizontalRule: {
    action: () => editor.chain().focus().setHorizontalRule().run(),
    active: false,
    icon: <IconSeparator size={16} />,
  },
  link: {
    action: () => {
      const url = prompt("Masukkan URL:");
      if (url) editor.chain().focus().toggleLink({ href: url }).run();
    },
    active: editor.isActive("link"),
    icon: <IconLink size={16} />,
  },
  unlink: {
    action: () => editor.chain().focus().unsetLink().run(),
    active: false,
    icon: <IconUnlink size={16} />,
  },
  image: {
    action: () => {
      const url = prompt("Masukkan URL gambar:");
      if (url) editor.chain().focus().setImage({ src: url }).run();
    },
    active: false,
    icon: <IconPhoto size={16} />,
  },
  undo: {
    action: () => editor.chain().focus().undo().run(),
    active: false,
    icon: <IconArrowBack size={16} />,
  },
  redo: {
    action: () => editor.chain().focus().redo().run(),
    active: false,
    icon: <IconArrowForward size={16} />,
  },
});

export default EditorToolbar;
