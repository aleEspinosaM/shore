import { getAllContacts } from './api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IContact {
    avatar: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    is_online: boolean;
    is_active: boolean;
    department: 'it' | 'marketing' | 'sales' | 'support';
    amount: number;
}

export interface ContactState {
  data: IContact[];
  total: number;
  status: 'idle' | 'loading' | 'failed' | 'success';
  searchTerm: string;
}

const initialState: ContactState = {
  data: [],
  total: 0,
  status: 'idle',
  searchTerm: '',
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await getAllContacts();
    return response.data
  }
);

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        const data = action.payload.data.map((d: IContact, idx: number) => {
            return {
                ...d,
                is_online: idx % 2 === 0,
                is_active: !d.first_name.startsWith('J'),
                department: 'Marketing',
                amount: 12 * idx,
            }
        })
        state.status = 'success';
        state.total = action.payload.total;
        state.data = data;
      })
  },
});

export const { setSearchTerm } = contactsSlice.actions;

export default contactsSlice.reducer;
