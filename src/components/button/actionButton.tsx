import React from "react";
import { ActionIcon, Group, Menu, Tooltip } from "@mantine/core";
import {
  IconEye,
  IconPencil,
  IconTrash,
  IconDotsVertical,
  IconPlus,
} from "@tabler/icons-react";

export type ActionButtonType = "view" | "edit" | "delete" | "option" | "add";


// propos for option button
interface OptionItem {
  label: string;
  onClick: () => void;
}

interface ActionButtonProps {
  type: ActionButtonType;
  onClick?: () => void; 
  label? : string;
  options?: OptionItem[]; 
}

const ActionButton: React.FC<ActionButtonProps> = ({
  type,
  onClick,
  label,
  options,
}) => {
  // mapping tipe ke ikon, label, dan warna
  const typeConfig = {
    view: {
      icon: <IconEye size={16} />,
      label: label ?? "View",
      color: "blue",
    },
    edit: {
      icon: <IconPencil size={16} />,
      label: label ?? "Edit",
      color: "green",
    },
    delete: {
      icon: <IconTrash size={16} />,
      label: label ?? "Delete",
      color: "red",
    },
    option: {
      icon: <IconDotsVertical size={16} />,
      label: label ?? "Options",
      color: "gray",
    },
    add: {
      icon: <IconPlus size={16} />,
      label: label ?? "Add",
      color: "teal",
    },
  };

  // Jika tipe option, render menu dropdown dengan ActionIcon sebagai trigger
  if (type === "option") {
    return (
      <Menu>
        <Menu.Target>
          <ActionIcon color={typeConfig.option.color} variant="outline">
            {typeConfig.option.icon}
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          {options?.map((option, index) => (
            <Menu.Item key={index} onClick={option.onClick}>
              {option.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    );
  }

  return (
    <Tooltip
      label={typeConfig[type].label}
      position="top"
      withArrow
      __size="24"
    >
      <ActionIcon
        color={typeConfig[type].color}
        variant="outline"
        onClick={onClick}
      >
        {typeConfig[type].icon}
      </ActionIcon>
    </Tooltip>
  );
};

export default ActionButton;
