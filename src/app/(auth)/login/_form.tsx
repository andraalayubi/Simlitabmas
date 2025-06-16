"use client";

import { useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Button,
  Container,
  Title,
  Card,
  Text,
  Center,
  Box,
  rem,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { loginSchema } from "./_schema";
import { loginAction } from "./_action";
import useNotification from "src/components/notification/notification";
import { IconMail, IconLock, IconSchool } from "@tabler/icons-react";

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
      setTimeout(() => (window.location.href = "/dashboard"), 2000);
    } else {
      showNotification({ status: "error", message: result.message });
    }
  };

  return (
    <div className="min-h-screen from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Container size={460} my={40} style={{ width: "100%" }}>
        {/* Header */}
        <Box ta="center" mb="lg">
          <Center mb="md">
            <Box
              bg="blue.6"
              p="sm"
              style={{
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconSchool size={32} color="white" />
            </Box>
          </Center>
          <Title order={3} fw={700} c="gray.9" mb="xs">
            Sistem Informasi Penelitian dan Pengabdian Masyarakat
          </Title>
          {/* <Text c="gray.6" size="sm">
            Perguruan Tinggi
          </Text> */}
        </Box>

        {/* Login Card */}
        <Card
          shadow="xl"
          radius="md"
          padding="lg"
          withBorder
          style={{ border: "none" }}
        >
          <Card.Section p="lg" pb="md">
            <Title order={3} ta="center" fw={600}>
              Masuk ke Akun Anda
            </Title>
            <Text c="gray.6" size="sm" ta="center" mt="xs">
              Silakan masukkan kredensial Anda untuk mengakses sistem
            </Text>
          </Card.Section>

          <Card.Section p="lg" pt={0}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              {/* Email Field */}
              <TextInput
                label="Email"
                placeholder="nama@mail.ac.id"
                required
                leftSection={<IconMail size={18} />}
                styles={{
                  input: { paddingLeft: rem(40), height: rem(44) },
                  label: { fontWeight: 500 },
                }}
                mb="md"
                {...form.getInputProps("email")}
              />

              {/* Password Field */}
              <PasswordInput
                label="Password"
                placeholder="Masukkan password Anda"
                required
                leftSection={<IconLock size={18} />}
                styles={{
                  input: { paddingLeft: rem(40), height: rem(44) },
                  innerInput: { height: rem(44) },
                  label: { fontWeight: 500 },
                }}
                mb="sm"
                {...form.getInputProps("password")}
              />

              <br />

              {/* Login Button */}
              <Button
                fullWidth
                type="submit"
                bg="blue.6"
                size="md"
                loading={loading}
              >
                {loading ? "Memproses..." : "Masuk"}
              </Button>
            </form>
          </Card.Section>
        </Card>

        {/* Footer */}
        <Box ta="center" mt="lg">
          <Text c="gray.5" size="xs">
            © 2025 Perguruan Tinggi. All rights reserved.
          </Text>
          <Text c="gray.5" size="xs" mt={4}>
            Sistem Informasi Manajemen Penelitian dan Pengabdian Masyarakat
          </Text>
        </Box>
      </Container>
    </div>
  );
};
