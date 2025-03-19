"use client";

import {
  Avatar,
  Badge,
  Card,
  Flex,
  Grid,
  Group,
  Paper,
  Tabs,
  Text,
  Title,
  ThemeIcon,
  Box,
  Divider,
  Skeleton,
} from "@mantine/core";
import {
  IconUsers,
  IconFileText,
  IconBuilding,
  IconMicroscope,
} from "@tabler/icons-react";
import researchGroupAction from "src/action/researchGroupAction";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  lecturer,
  proposal_suggestion,
  research_group,
} from "prisma/interfaces";
import useNotification from "src/components/notification/notification";
import ProposalSuggestionPhaseBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionPhaseBadge";

export default function ResearchGroupPage() {
  const user_type = "admin";
  const params = useParams();
  const id = params.id;
  const [researchGroup, setResearchGroup] = useState<research_group | null>();
  const [lecturers, setLecturers] = useState<lecturer[] | null>();
  const [proposalSuggestions, setProposalSuggestions] = useState<
    proposal_suggestion[] | null
  >();
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const getResearchGroup = useCallback(async () => {
    const response = await researchGroupAction.getResearchGroupDetail(
      user_type,
      Number(id),
      setLoading
    );

    if (response.success) {
      setResearchGroup(response.data.research_group);
      setLecturers(response.data.lecturers);
      setProposalSuggestions(response.data.proposal_suggestions);
      showNotification({ status: "success", message: response.message });
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, id]);

  useEffect(() => {
    getResearchGroup();
  }, [getResearchGroup]);

  return (
    <div className="pt-6">
      {/* Header Section */}
      <Box mb="lg">
        <Card
          withBorder={false}
          radius="md"
          mb="sm"
          style={{
            background: "linear-gradient(135deg, #e6f7ff 0%, #f0f8ff 100%)",
            overflow: "visible",
            width: "100%",
          }}
          p="xl"
        >
          <Skeleton visible={loading}>
            <Group
              justify="space-between"
              align="flex-start"
              grow
              preventGrowOverflow
            >
              <Box>
                <Title order={1} c="blue.8" mb="sm">
                  {researchGroup?.name}
                </Title>
                <Text c="dimmed" size="md" mb="md">
                  {researchGroup?.description}
                </Text>
              </Box>
            </Group>
          </Skeleton>
        </Card>

        {/* Stats Cards with Shadow and Hover Effect */}
        <Skeleton visible={loading}>
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Card
                withBorder
                shadow="sm"
                p="lg"
                radius="md"
                style={{
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 20px -10px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <div className="flex flex-row items-center gap-4">
                  <ThemeIcon
                    size={56}
                    radius="md"
                    variant="light"
                    color="blue"
                    mb="md"
                  >
                    <IconFileText size={28} />
                  </ThemeIcon>
                  <div>
                    <Text size="sm" c="dimmed" mb={2}>
                      Jumlah Usulan
                    </Text>
                    <Text fw={700} size="xl">
                      {proposalSuggestions?.length}
                    </Text>
                  </div>
                </div>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Card
                withBorder
                shadow="sm"
                p="lg"
                radius="md"
                style={{
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 20px -10px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <div className="flex flex-row items-center gap-4">
                  <ThemeIcon
                    size={56}
                    radius="md"
                    variant="light"
                    color="blue"
                    mb="md"
                  >
                    <IconUsers size={28} />
                  </ThemeIcon>
                  <div>
                    <Text size="sm" c="dimmed" mb={2}>
                      Jumlah Anggota
                    </Text>
                    <Text fw={700} size="xl">
                      {lecturers?.length}
                    </Text>
                  </div>
                </div>
              </Card>
            </Grid.Col>
          </Grid>
        </Skeleton>
      </Box>

      {/* Main Content */}
      <Skeleton visible={loading}>
        <Tabs defaultValue="research" mb="xl">
          <Tabs.List mb="md">
            <Tabs.Tab value="research">Usulan</Tabs.Tab>
            <Tabs.Tab value="members">Anggota</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="research">
            <Card withBorder shadow="sm">
              <Card.Section withBorder inheritPadding py="xs">
                <Title order={3}>Usulan</Title>
                <Text c="dimmed" size="sm">
                  Usulan penelitian terbaru yang sedang aktif
                </Text>
              </Card.Section>
              <Box mt="md">
                {proposalSuggestions?.map((proposal, index) => (
                  <Paper withBorder p="md" mb="md" key={index}>
                    <Group justify="space-between" mb="xs">
                      <Text fw={600}>{proposal.name}</Text>
                      <ProposalSuggestionPhaseBadge phase={proposal.phase} />
                    </Group>
                    <Group gap="xs" c="dimmed">
                      <Text>Ketua: {proposal.lecturer?.name}</Text>
                      <Text>•</Text>
                      <Text>Tahun: {proposal.year_research?.year}</Text>
                    </Group>
                  </Paper>
                ))}
              </Box>
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="members">
            <Grid>
              {lecturers?.map((lecturer, index) => (
                <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>
                  <Card withBorder shadow="sm">
                    <Group mb="xs">
                      <Avatar src={""} size="lg" radius="xl">
                        {lecturer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar>
                      <Box>
                        <Text fw={700}>{lecturer.name}</Text>
                        <Group gap="xs">
                          <IconBuilding size={14} />
                          <Text size="sm" c="dimmed">
                            {lecturer.is_ketua_rg ? "Ketua" : "Anggota"}
                          </Text>
                        </Group>
                      </Box>
                    </Group>
                    <Divider my="xs" />
                    <Box>
                      <Flex justify="space-between" mb="xs">
                        <Text size="sm" c="dimmed">
                          NIP:
                        </Text>
                        <Text size="sm" fw={500}>
                          {lecturer.nip}
                        </Text>
                      </Flex>
                      <Flex justify="space-between" mb="xs">
                        <Text size="sm" c="dimmed">
                          NIDN:
                        </Text>
                        <Text size="sm" fw={500} ta="right">
                          {lecturer.nidn}
                        </Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text size="sm" c="dimmed">
                          Departemen:
                        </Text>
                        <Text size="sm" fw={500}>
                          {lecturer.department?.name}
                        </Text>
                      </Flex>
                    </Box>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Tabs.Panel>
        </Tabs>
      </Skeleton>
    </div>
  );
}
