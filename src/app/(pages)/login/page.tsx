"use client";

import { useState } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Button,
  Container,
  Paper,
  Title,
  Text,
  Alert,
  Modal,
} from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,
    },
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/login", values);
      if (response.status === 200 && response.data.success) {
        console.log(response.data);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          router.push("/dashboard"); // Redirect to dashboard page
        }, 2000);
      } else {
        setError(response.data.message);
        console.log(response.data.message);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "An unexpected error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" style={{ color: "#132963" }}>
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {error && (
          <Alert title="Error" color="red" mb={20}>
            {error}
          </Alert>
        )}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <Button
            fullWidth
            mt="xl"
            type="submit"
            style={{ backgroundColor: "#132963" }}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Paper>

      <Modal opened={success} onClose={() => setSuccess(false)} title="Success">
        <Text>Login successful! Redirecting to dashboard...</Text>
      </Modal>
    </Container>
  );
};

export default Login;
