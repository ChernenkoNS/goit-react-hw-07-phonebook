import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContact } from './operations';

const handlePending = state => {
  state.contacts.error = null;
  state.contacts.isLoading = true;
};

const handleRejected = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = action.payload;
};

const phoneBookSlice = createSlice({
  name: 'phoneBook',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },

  extraReducers: builder =>
    builder

      ////////////Fetch///////////

      .addCase(fetchContact.pending, handlePending)

      .addCase(fetchContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = action.payload;
      })

      .addCase(fetchContact.rejected, handleRejected)

      //////////Add////////////////

      .addCase(addContact.pending, handlePending)

      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items.push(action.payload);
      })

      .addCase(addContact.rejected, handleRejected)

      //////////Ddelete/////////
      .addCase(deleteContact.pending, handlePending)

      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        const index = state.contacts.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.items.splice(index, 1);
      })

      .addCase(deleteContact.rejected, handleRejected),
});

export const { setFilter } = phoneBookSlice.actions;
export const phoneBookReducer = phoneBookSlice.reducer;
