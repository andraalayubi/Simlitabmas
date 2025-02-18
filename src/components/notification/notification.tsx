import { notifications } from "@mantine/notifications";
import {
  IconCheck,
  IconAlertTriangle,
  IconInfoCircle,
  IconX,
} from "@tabler/icons-react";
import { useMantineTheme } from "@mantine/core";
// import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

type NotificationStatus = "error" | "success" | "warning" | "info";

interface NotificationProps {
  status: NotificationStatus;
  message: string;
  isLoading?: boolean;
  duration?: number;
}

const useNotification = () => {
  const theme = useMantineTheme();

  const getNotificationColor = (status: NotificationStatus) => {
    const colors = {
      success: theme.colors.teal[6],
      error: theme.colors.red[6],
      warning: theme.colors.yellow[6],
      info: theme.colors.blue[6],
    };
    return colors[status];
  };

  const getNotificationIcon = (status: NotificationStatus) => {
    const iconProps = {
      size: "1.1rem",
      // color: getNotificationColor(status),
    };

    switch (status) {
      case "success":
        return <IconCheck {...iconProps} />;
      case "error":
        return <IconX {...iconProps} />;
      case "warning":
        return <IconAlertTriangle {...iconProps} />;
      case "info":
        return <IconInfoCircle {...iconProps} />;
      default:
        return null;
    }
  };

  const showNotification = ({
    status,
    message,
    isLoading = false,
    duration = 3000,
  }: NotificationProps) => {
    notifications.show({
      id: `notification-${status}`,
      title: status.charAt(0).toUpperCase() + status.slice(1),
      message,
      loading: isLoading,
      autoClose: isLoading ? false : duration,
      // color: getNotificationColor(status),
      icon: getNotificationIcon(status),
      withCloseButton: true,
      withBorder: true,
      position: "top-right",
      styles: (theme) => ({
        icon: {
          backgroundColor: "transparent !important",
          marginRight: theme.spacing.md,
        },
      }),
    });
  };

  return { showNotification };
};

export default useNotification;