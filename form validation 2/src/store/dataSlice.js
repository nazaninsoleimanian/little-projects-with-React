import { createSlice } from '@reduxjs/toolkit'

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    firstName: '',
    lastName: '',
    fatherName: '',
    nationalId: '',
  },
  reducers: {
    saveData: (state, action) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.fatherName = action.payload.fatherName
      state.nationalId = action.payload.nationalId
    },
  },
})
export const { saveData } = dataSlice.actions
export const selectData = (state) => state.data
export default dataSlice.reducer
