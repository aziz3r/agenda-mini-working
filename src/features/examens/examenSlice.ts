import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Examen } from '../../types/Examen';

interface ExamenState {
  examens: Examen[];
  loading: boolean;
  error: string | null;
}

// ✅ Lien vers l’API Strapi avec population des relations
const API_URL = 'http://localhost:1337/api/exams?populate=*';

const initialState: ExamenState = {
  examens: [],
  loading: false,
  error: null,
};

export const fetchExamens = createAsyncThunk(
  'examens/fetchExamens',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:1337/api/exams');
      console.log("✅ Réponse brute Strapi :", response.data);
return response.data.data.map((item: any) => ({
  id: item.id,
  idexam: item.idexam,
  nom: item.nom,
  date: new Date(item.date).toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }),
  poids: item.poids,
}));

    } catch (error: any) {
      console.error('❌ Erreur API', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.error?.message || 'Erreur de récupération des examens'
      );
    }
  }
);



// ✅ Slice Redux
const examenSlice = createSlice({
  name: 'examens',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExamens.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExamens.fulfilled, (state, action) => {
        state.loading = false;
        state.examens = action.payload;
      })
      .addCase(fetchExamens.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          'Erreur inconnue';
      });
  },
});

export default examenSlice.reducer;
