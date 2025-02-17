import axios from 'axios';
  

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