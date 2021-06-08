import { getAllContacts, postContact, putContact } from './api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Department = 'it' | 'marketing' | 'sales' | 'support';
export interface IContact {
    avatar?: string;
    email: string;
    first_name: string;
    id?: number;
    last_name: string;
    is_online?: boolean;
    is_active?: boolean;
    department?: Department;
    amount: number;
}

export interface ContactState {
  data: IContact[];
  total: number;
  status: 'idle' | 'loading' | 'failed' | 'success';
  postinContact: 'idle' | 'loading' | 'failed' | 'success';
  updatinContact: 'idle' | 'loading' | 'failed' | 'success';
  searchTerm: string;
  displayContactForm: boolean;
  setContact?: IContact | null;
}

const initialState: ContactState = {
  data: [],
  total: 0,
  status: 'idle',
  searchTerm: '',
  displayContactForm: false,
  postinContact: 'idle',
  updatinContact: 'idle',
  setContact: null,
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await getAllContacts();
    return response.data
  }
);

export const createContacts = createAsyncThunk(
  'contacts/createContacts',
  async (contact: any) => {
    console.log(contact)
    const response = await postContact(contact);
    return response.data
  }
);

export const updateContacts = createAsyncThunk(
  'contacts/updateContacts',
  async (contact: any) => {
    const response = await putContact(contact);
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
    toogleContactForm: (state) => {
      state.displayContactForm = !state.displayContactForm
    },
    resetContact: (state) => {
      state.setContact = null;
    },
    setContact: (state, action: PayloadAction<IContact | null>) => {
      state.setContact = action.payload;
      state.displayContactForm = !state.displayContactForm;
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
      .addCase(createContacts.pending, (state) => {
        state.postinContact = 'loading'
      })
      .addCase(createContacts.fulfilled, (state, action) => {
        const newContact = {
          ...action.payload,
          is_online: action.payload?.is_online || true,
          is_active: action.payload?.is_active || true,
          department: action.payload?.department || 'Marketing',
          amount: action.payload?.amount || 12 * Math.floor(Math.random() * 10),
          avatar: "https://reqres.in/img/faces/1-image.jpg"
        }
        state.postinContact = 'success';
        state.data.push(newContact)
        state.displayContactForm = false
      })
      .addCase(updateContacts.pending, (state) => {
        state.updatinContact = 'loading'
      })
      .addCase(updateContacts.fulfilled, (state, action) => {
        const newContact = {
          ...action.payload,
          is_online: action.payload?.is_online || true,
          is_active: action.payload?.is_active || true,
          department: action.payload?.department || 'Marketing',
          amount: action.payload?.amount || 12 * Math.floor(Math.random() * 10),
        }
        state.updatinContact = 'success';
        state.data = state.data.map((d) =>
            d.id === action.payload.id ? newContact : d,
        );
        state.displayContactForm = false
        state.setContact = null
      })
  },
});

export const { setSearchTerm, toogleContactForm, setContact, resetContact } = contactsSlice.actions;

export default contactsSlice.reducer;
