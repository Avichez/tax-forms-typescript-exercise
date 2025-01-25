import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from ".";
import { Statement } from "../lib/applicationTypes";

export type StatementSlice = {
  statements: Statement[];
};

const initialState: StatementSlice = {
  statements: [],
};

const submissionsSlice = createSlice({
  name: "statements",
  initialState,
  reducers: {
    addStatement: (state, action: PayloadAction<Statement>) => {
      state.statements.push(action.payload);
    },
  },
});

export const { addStatement } = submissionsSlice.actions;

// Selectors

export const selectStatements = ({ statements }: RootState) =>
  statements.statements;

export default submissionsSlice;
