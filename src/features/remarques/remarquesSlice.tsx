import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Remarque } from '../../types/remarque';

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

// 🔁 GET all remarques
export const fetchRemarques = createAsyncThunk(
  'remarques/fetchRemarques',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:1337/api/remarques');
      console.log("✅ Réponse brute GET remarques :", response.data);

      return response.data.data.map((item: any) => {
        const remarque = item.remarque || item.remarque?.remarque || item?.data?.remarque || item?.remarqueText;

        return {
          id: item.id,
          remarque: item.remarque || item.remarqueText || item?.remarque, // adapte si besoin
        };
      });
    } catch (error: any) {
      console.error("❌ Erreur GET remarques :", error.response?.data || error.message);
      return thunkAPI.rejectWithValue("❌ Échec du chargement des remarques.");
    }
  }
);

// ➕ POST une remarque
export const addRemarque = createAsyncThunk(
  'remarques/addRemarque',
  async (texte: string, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:1337/api/remarques',
        {
          data: {
            remarque: texte,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        id: response.data.data.id,
        remarque: response.data.data.attributes.remarque,
      };
    } catch (error: any) {
      console.error("Erreur Strapi POST :", error.response?.data || error.message);
      return thunkAPI.rejectWithValue("❌ Échec de l'ajout de la remarque.");
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
        state.error = null;
      })
      .addCase(addRemarque.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default remarquesSlice.reducer;
