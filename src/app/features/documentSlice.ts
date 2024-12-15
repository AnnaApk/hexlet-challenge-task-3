import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Document {
  id: string;
  title: string;
  status: 'in-progress' | 'under-review' | 'completed';
}

const initialDocuments: Document[] = [
  { id: '1', title: 'Документ 1', status: 'in-progress' },
  { id: '2', title: 'Документ 2', status: 'in-progress' },
  { id: '3', title: 'Документ 3', status: 'under-review' },
];

const documentSlice = createSlice({
  name: 'documents',
  initialState: initialDocuments,
  reducers: {
    addDocument: (state, action: PayloadAction<{ title: string }>) => {
      state.push({
        id: Date.now().toString(),
        title: action.payload.title,
        status: 'in-progress',
      });
    },
    updateDocumentStatus: (
      state,
      action: PayloadAction<{ id: string; status: Document['status'] }>
    ) => {
      const doc = state.find((d) => d.id === action.payload.id);
      if (doc) doc.status = action.payload.status;
    },
  },
});

export const { addDocument, updateDocumentStatus } = documentSlice.actions;
export default documentSlice.reducer;
