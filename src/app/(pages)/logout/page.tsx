"use client";

import { Modal, Text } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Logout = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/logout");

      if (response.status === 200 && response.data.success) {
        localStorage.removeItem("payload");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          router.push("/login");
        }, 2000);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "An unexpected error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <>
      <Modal opened={success} onClose={() => setSuccess(false)} title="Success">
        <Text>Logout successful! Redirecting to login page...</Text>
      </Modal>
    </>
  );
};

export default Logout;
