import { notifications } from "@mantine/notifications";
import {
  IconCheck,
  IconAlertTriangle,
  IconInfoCircle,
  IconX,
} from "@tabler/icons-react";
import "@mantine/notifications/styles.css";

type NotificationStatus = "error" | "success" | "warning" | "info";

interface NotificationProps {
  status: NotificationStatus;
  message: string;
  isLoading?: boolean;
  duration?: number;
}

const useNotification = () => {
  const showNotification = ({
    status,
    message,
    isLoading = false,
    duration = 3000,
  }: NotificationProps) => {
    const getNotificationIcon = (status: NotificationStatus) => {
      switch (status) {
        case "success":
          return <IconCheck size={18} />;
        case "error":
          return <IconX size={18} />;
        case "warning":
          return <IconAlertTriangle size={18} />;
        case "info":
          return <IconInfoCircle size={18} />;
        default:
          return null;
      }
    };

    notifications.show({
      id: `notification-${status}`,
      title: status.charAt(0).toUpperCase() + status.slice(1),
      message,
      loading: isLoading,
      autoClose: duration,
      color: status,
      icon: getNotificationIcon(status),
      position: "top-right",
    });
  };

  return { showNotification };
};

export default useNotification;
