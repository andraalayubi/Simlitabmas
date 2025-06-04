"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Title,
  Text,
  Group,
  Paper,
  Divider,
  Grid,
  Box,
  Stack,
  Badge,
  useMantineTheme,
  Card,
  Skeleton,
  Center,
} from "@mantine/core";
import {
  IconUser,
  IconSchool,
  IconTrophy,
  IconBook,
  IconHeartHandshake,
} from "@tabler/icons-react";
import { getDegreeType } from "src/lib/degree";
import { showNotification } from "@mantine/notifications";
import { user_type } from "@prisma/client";
import { getSession } from "src/lib/session";
import { lecturer } from "prisma/interfaces";
import { useParams } from "next/navigation";
import lecturerAction from "src/action/lecturerAction";
import { decode } from "src/lib/sqids";

interface degreesArray {
  code: string;
  year: string;
  field: string;
  degree: string;
  university: string;
}

const ProfilePage = () => {
  const theme = useMantineTheme();
  const params = useParams();
  const hashedId = params.id;

  const [lecturerNotFound, setLecturerNotFound] = useState(false);
  const [professorData, setProfessorData] = useState<lecturer>();
  const [degree, setDegree] = useState<degreesArray[]>([]);
  const [leaderProposal, setLeaderProposal] = useState(0);
  const [penelitianCount, setPenelitianCount] = useState(0);
  const [pengmasCount, setPengmasCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getUserLecturers = useCallback(async (lecturerId: number) => {
    const session = await getSession();
    const response = await lecturerAction.getProfile(
      session?.user_type as user_type,
      lecturerId,
      setLoading
    );

    if (response.success) {
      if (response.data) {
        setProfessorData(response.data);
        setDegree(response.data.degree);
        setLeaderProposal(response.data.leaderProposal);
        setPenelitianCount(response.data.penelitianCount);
        setPengmasCount(response.data.pengmasCount);
        setLecturerNotFound(false);
        showNotification({ status: "success", message: response.message });
      } else {
        setLecturerNotFound(true);
      }
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, []);

  useEffect(() => {
    const lecturerId = decode(hashedId as string);

    getUserLecturers(lecturerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserLecturers, hashedId]);

  return (
    <Card shadow="sm" padding="lg" radius="md" p="md" mt="md" withBorder>
      {lecturerNotFound ? (
        <Skeleton visible={loading}>
          <Center h={200}>
            <Text c="red" fw={600} size="xl">
              Lecturer not found
            </Text>
          </Center>
        </Skeleton>
      ) : (
        <>
          <Group justify="space-between" align="flex-start">
            <Skeleton visible={loading}>
              <Group>
                <Avatar size={120} radius={60} color="gray.2" src={""}>
                  <IconUser
                    size={60}
                    stroke={1.5}
                    color={theme.colors.gray[5]}
                  />
                </Avatar>
                <Box>
                  <Title order={2}>{professorData?.name}</Title>
                  <Text color="dimmed">{professorData?.position?.name}</Text>

                  <Group mt="xs">
                    <Badge
                      leftSection={<IconTrophy size={14} />}
                      variant="outline"
                      me="md"
                    >
                      {`${leaderProposal} kali menjadi ketua`}
                    </Badge>

                    <Badge
                      leftSection={<IconBook size={14} />}
                      variant="outline"
                      me="md"
                    >
                      {`${penelitianCount} penelitian`}
                    </Badge>

                    <Badge
                      leftSection={<IconHeartHandshake size={14} />}
                      variant="outline"
                    >
                      {`${pengmasCount} pengmas`}
                    </Badge>
                  </Group>
                </Box>
              </Group>
            </Skeleton>
          </Group>

          <Divider my="md" />

          <Box mb="md">
            <Skeleton visible={loading}>
              <Group align="center" mb="xs">
                <IconUser size={20} />
                <Text fw={600} size="lg">
                  Data Diri
                </Text>
              </Group>
            </Skeleton>

            <Skeleton visible={loading}>
              <Grid>
                <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
                  <Text color="dimmed" size="sm">
                    Nama
                  </Text>
                  <Text>{professorData?.name}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
                  <Text color="dimmed" size="sm">
                    Jabatan
                  </Text>
                  <Text>{professorData?.position?.name}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
                  <Text color="dimmed" size="sm">
                    NIP
                  </Text>
                  <Text>{professorData?.nip}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
                  <Text color="dimmed" size="sm">
                    NIDN
                  </Text>
                  <Text>{professorData?.nidn}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
                  <Text color="dimmed" size="sm">
                    Research Group
                  </Text>
                  <Text>{professorData?.research_group?.name}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
                  <Text color="dimmed" size="sm">
                    Program Studi
                  </Text>
                  <Text>{professorData?.department?.name}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
                  <Text color="dimmed" size="sm">
                    Nomor Telepon
                  </Text>
                  <Text>{professorData?.phone_number || '-'}</Text>
                </Grid.Col>
              </Grid>
            </Skeleton>
          </Box>

          <Divider my="md" />

          <Box mb="md">
            <Skeleton visible={loading}>
              <Group align="center" mb="xs">
                <IconSchool size={20} />
                <Text fw={600} size="lg">
                  Pendidikan
                </Text>
              </Group>
            </Skeleton>

            <Skeleton visible={loading}>
              <Stack gap="lg">
                {Array.isArray(degree) && degree.length > 0 ? (
                  degree.map((item, index) => (
                    <Group key={index} justify="space-between" mb="xs">
                      <div>
                        <Text w={600}>
                          {getDegreeType(item?.degree)} ({item?.code}) in{" "}
                          {item?.field}
                        </Text>
                        <Text size="sm" color="dimmed">
                          {item?.university}
                        </Text>
                      </div>
                      <Text color="dimmed">{item?.year}</Text>
                    </Group>
                  ))
                ) : (
                  <Text color="dimmed">No degrees available</Text>
                )}
              </Stack>
            </Skeleton>
          </Box>

          <Divider my="md" />

          <Skeleton visible={loading}>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Paper withBorder p="md" radius="md">
                  <Stack align="center" gap="xs">
                    <IconTrophy size={30} />
                    <Text fw={700} size="lg">
                      {leaderProposal}
                    </Text>
                    <Text size="sm" color="dimmed" ta="center">
                      kali menjadi ketua penelitian/pengmas
                    </Text>
                  </Stack>
                </Paper>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Paper withBorder p="md" radius="md">
                  <Stack align="center" gap="xs">
                    <IconBook size={30} />
                    <Text fw={700} size="lg">
                      {penelitianCount}
                    </Text>
                    <Text size="sm" color="dimmed" ta="center">
                      penelitian yang telah diikuti
                    </Text>
                  </Stack>
                </Paper>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Paper withBorder p="md" radius="md">
                  <Stack align="center" gap="xs">
                    <IconHeartHandshake size={30} />
                    <Text fw={700} size="lg">
                      {pengmasCount}
                    </Text>
                    <Text size="sm" color="dimmed" ta="center">
                      pengmas yang telah diikuti
                    </Text>
                  </Stack>
                </Paper>
              </Grid.Col>
            </Grid>
          </Skeleton>
        </>
      )}
    </Card>
  );
};

export default ProfilePage;
