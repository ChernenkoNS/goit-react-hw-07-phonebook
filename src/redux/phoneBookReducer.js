import {
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContact } from './operations';


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
    // setAddContact: (state, action) => {
    //   const { name, number, id } = action.payload;
    //   state.contacts.items.push({ name, number, id });
    // },

    // setDeleteContact: (state, action) => {
    //   state.contacts.items = state.contacts.items.filter(
    //     contact => contact.id !== action.payload
    //   );
    // },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  ////////////////////////////////////////////////////

  extraReducers: builder =>
    builder

////////////Fetch///////////

      .addCase(fetchContact.pending, state => {
        state.contacts.error = null;
        state.contacts.isLoading = true;
      })
      .addCase(fetchContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      .addCase(fetchContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })

//////////Add////////////////

      .addCase(addContact.pending, state => {
        state.contacts.error = null;
        state.contacts.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })

//////////Ddelete/////////

      .addCase(deleteContact.pending, state => {
        state.contacts.error = null;
        state.contacts.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        const index = state.contacts.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })

  ////////////////////////////////////////////////////
});

export const { setAddContact, setDeleteContact, setFilter } =
  phoneBookSlice.actions;
export const phoneBookReducer = phoneBookSlice.reducer;


export const selectContacts = state => state.phoneBook.contacts.items;
export const selectfilter = state => state.phoneBook.filter;
export const selectFilteredContacts = createSelector(
  [selectContacts, selectfilter],
  (items, filter) => {
    return items.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
