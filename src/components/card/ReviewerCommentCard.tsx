import { Card, Text, Stack } from '@mantine/core';
import { review } from 'prisma/interfaces';

interface ReviewerCommentCardProps {
  reviewerNumber: number;
  review: review;
}

export const ReviewerCommentCard = ({ reviewerNumber, review }: ReviewerCommentCardProps) => {
  return (
    <Card withBorder shadow="sm" radius="md" mb="xl" p="lg" h="100%">
      <Stack gap="xs">
        <Text fw={500} size="lg">Hasil Reviewer {reviewerNumber}</Text>
        <Text>{review.note || 'Belum ada catatan'}</Text>
      </Stack>
    </Card>
  );
};