import { Alert, Text } from "@mantine/core";
import {
  IconAlertCircle,
  IconCheck,
  IconAlertTriangle,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

interface AlertNotificationProps {
  status: "error" | "success" | "warning";
  message: string;
}

const AlertComponent = ({ status, message }: AlertNotificationProps) => {
  const [opened, { close }] = useDisclosure(true); // Alert is initially opened

  // Set icon and color based on status
  const getAlertProps = () => {
    switch (status) {
      case "error":
        return {
          icon: <IconAlertCircle size={16} />,
          color: "red",
          title: "Error",
        };
      case "success":
        return {
          icon: <IconCheck size={16} />,
          color: "teal",
          title: "Success",
        };
      case "warning":
        return {
          icon: <IconAlertTriangle size={16} />,
          color: "yellow",
          title: "Warning",
        };
      default:
        return { icon: null, color: "gray", title: "" };
    }
  };

  const { icon, color, title } = getAlertProps();

  if (!opened) return null; // Do not render if alert is closed

  return (
    <Alert
      icon={icon}
      title={title}
      color={color}
      radius="md"
      withCloseButton
      onClose={close} // Close alert when close button is clicked
    >
      <Text>{message}</Text>
    </Alert>
  );
};

export default AlertComponent;
