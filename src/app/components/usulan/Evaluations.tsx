import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Collapse, Button, Card, Text } from '@mantine/core';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';

interface EvaluationDetail {
  id: number;
  reviewer: string;
  aspect: string;
  comment: string;
  score: string;
}

interface Evaluation {
  id: number;
  title: string;
  details: EvaluationDetail[];
}

const Evaluations: React.FC = () => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const response = await axios.get('/api/evaluations');
        setEvaluations(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching evaluations:', error);
        setLoading(false);
      }
    };

    fetchEvaluations();
  }, []);

  const columns = React.useMemo<MRT_ColumnDef<EvaluationDetail>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'No',
        size: 10,
      },
      {
        accessorKey: 'reviewer',
        header: 'Reviewer',
      },
      {
        accessorKey: 'aspect',
        header: 'Aspek',
      },
      {
        accessorKey: 'comment',
        header: 'Komentar',
      },
      {
        accessorKey: 'score',
        header: 'Nilai',
      },
    ],
    [],
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='bg-white shadow sm:rounded-lg p-6'>
      <h2 className="text-xl font-semibold mb-4">Evaluasi</h2>
      {evaluations.map((evaluation) => (
        <Card key={evaluation.id} shadow="sm" className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <Text fw={500}>{evaluation.title}</Text>
            <Button onClick={() => setExpandedId(expandedId === evaluation.id ? null : evaluation.id)}>
              {expandedId === evaluation.id ? 'Hide' : 'Show'}
            </Button>
          </div>
          <Collapse in={expandedId === evaluation.id}>
            <MantineReactTable columns={columns} data={evaluation.details} enablePagination={false} enableColumnActions={false} enableColumnFilters={false} enableSorting={false}/>
          </Collapse>
        </Card>
      ))}
    </div>
  );
};

export default Evaluations;
