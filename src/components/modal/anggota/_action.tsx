import axios from 'axios';

export const fetchLecturers = async () => {
    try {
      const response = await fetch('/api/lecturer/member/1');
      const result = await response.json();
      console.log(result);
      
  
      if (result.success) {
        return result.data.map((member: { id: number; name: string; nidn: number }) => ({
          id: member.id.toString(),
          name: member.name,
          nidn: member.nidn.toString()
        }));
      }
  
      return [];
    } catch (error) {
      console.error('Failed to fetch year researches:', error);
      return [];
    }
  }

export const anggotaAction = async (
  values: {
    name: string;
    nidn: string;
    usulan_id: string;
  },
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);
    
    // First, find the lecturer ID by NIDN
    const lecturerResponse = await axios.get(`/api/lecturer/member?nidn=${values.nidn}`);
    const lecturerId = lecturerResponse.data.data[0]?.id;

    if (!lecturerId) {
      throw new Error('Lecturer not found');
    }

    // Then, add the lecturer to the proposal suggestion
    const response = await axios.post('/api/lecturer/proposal-suggestion/member', {
      proposalSuggestionId: parseInt(values.usulan_id),
      lecturerId: lecturerId
    });

    return {
      success: true,
      message: 'Anggota berhasil ditambahkan'
    };
  } catch (error: any) {
    console.error('Error adding anggota:', error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Gagal menambahkan anggota'
    };
  } finally {
    setLoading(false);
  }
};

//disni