import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Remarque {
  id: number;
  texte: string;
}

interface RemarqueState {
  remarques: Remarque[];
  loading: boolean;
  error: string | null;
}

const initialState: RemarqueState = {
  remarques: [],
  loading: false,
  error: null,
};

export const fetchRemarques = createAsyncThunk(
  'remarques/fetchRemarques',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:1337/api/remarques');
      return response.data.data.map((item: any) => {
        const data = item.attributes || item;
        return {
          id: item.id,
          texte: data.texte || '',
        };
      });
    } catch (error: any) {
      console.error('❌ Erreur API', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.error?.message || 'Erreur de récupération des remarques'
      );
    }
  }
);

export const addRemarque = createAsyncThunk(
  'remarques/addRemarque',
  async (texte: string, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:1337/api/remarques', {
        data: { texte },
      });

      console.log('✅ Réponse API :', response.data);

      return {
        id: response.data.data.id,
        texte: response.data.data.attributes.texte,
      };
    } catch (error: any) {
      console.error('❌ Erreur lors de l\'ajout', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.error?.message || "Erreur lors de l'ajout"
      );
    }
  }
);

export const deleteRemarque = createAsyncThunk(
  'remarques/deleteRemarque',
  async (id: number, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:1337/api/remarques/${id}`);
      return id;
    } catch (error: any) {
      console.error('❌ Erreur API', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.error?.message || 'Erreur de suppression'
      );
    }
  }
);

const remarquesSlice = createSlice({
  name: 'remarques',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRemarques.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRemarques.fulfilled, (state, action) => {
        state.loading = false;
        state.remarques = action.payload;
      })
      .addCase(fetchRemarques.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addRemarque.fulfilled, (state, action) => {
        state.remarques.push(action.payload);
      })
      .addCase(deleteRemarque.fulfilled, (state, action) => {
        state.remarques = state.remarques.filter((r) => r.id !== action.payload);
      });
  },
});

export default remarquesSlice.reducer;
