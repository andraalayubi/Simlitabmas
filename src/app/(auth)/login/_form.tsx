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
  Space,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { zodResolver } from "mantine-form-zod-resolver";
import { loginSchema } from "./_schema";
import { loginAction } from "./_action";
import AlertNotification from "../../components/alert/alert";

export const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  // form
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginSchema),
  });

  // Call loginAction on form submit
  const handleSubmit = (values: { email: string; password: string }) => {
    loginAction(values, setLoading, setError, setSuccess, router);
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" style={{ color: "#132963" }}>
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {/* Display error or success alerts */}
        {error && (
          <>
            <AlertNotification status="error" message={error} />
            <Space h="md" />
          </>
        )}
        {success && (
          <>
            <AlertNotification
              status="success"
              message="Login successful! Redirecting to dashboard..."
            />
            <Space h="md" />
          </>
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
    </Container>
  );
};
