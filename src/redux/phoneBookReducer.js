import {
  // createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

//////////////////////////////////////////////////////

// export const fetchContactDataThunk = createAsyncThunk(
//   'phoneBook/fetchContactDataThunk',
//   async (contactId, thunkApi) => {
//     try {
//       const contactData = await fetchDetails(contactId);
//     } catch {
//       return thunkApi.rejectWithValue(error.massage);
//     }
//   }
// );

//////////////////////////////////////////////////////

// const initialState = {
//   contacts: {
//     items: [],
//     isLoading: false,
//     error: null,
//   },
//   filter: '',
// };

/////////////////////////////////////////////////////
const phoneBookSlice = createSlice({
  name: 'phoneBook',
  initialState: {
    contacts: [],
    filter: '',
  },
  reducers: {
    setAddContact: (state, action) => {
      const { name, number, id } = action.payload;
      state.contacts.push({ name, number, id });
    },

    setDeletContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  ////////////////////////////////////////////////////

  // extraReducers: builder =>
  //   builder
  //     .addCase(fetchContactDataThunk.pending, state => {
  //       state.isLoading = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchContactDataThunk.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.items = action.payload;
  //     })
  //     .addCase(fetchContactDataThunk.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     }),

  ////////////////////////////////////////////////////
});

export const { setAddContact, setDeletContact, setFilter } =
  phoneBookSlice.actions;
export const phoneBookReducer = phoneBookSlice.reducer;

export const selectContacts = state => state.phoneBook.contacts;
export const selectfilter = state => state.phoneBook.filter;
export const selectFilteredContacts = createSelector(
  [selectContacts, selectfilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
