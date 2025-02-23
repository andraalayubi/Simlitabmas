'use client'

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
import useNotification from "src/components/notification/notification";

export const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { showNotification } = useNotification();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginSchema),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    const result = await loginAction(values, setLoading);

    if (result.success) {
      showNotification({ status: "success", message: result.message });
      setTimeout(() => window.location.href = '/penelitian/usulan_saya', 2000);
      console.log('to dashboard')
    } else {
      showNotification({ status: "error", message: result.message });
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" style={{ color: "#132963" }}>
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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
