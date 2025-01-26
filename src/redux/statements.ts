import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    initStatements: (state, action: PayloadAction<Statement[]>) => {
      state.statements = action.payload;
    },
    addStatement: (state, action: PayloadAction<Statement>) => {
      state.statements.push(action.payload);
    },
    updateEditStatement: (state, action: PayloadAction<Statement>) => {
      const udpatedStatement = action.payload;
      const statementIndex = state.statements.findIndex(
        (statement) => statement.id === udpatedStatement.id,
      );

      if (statementIndex !== -1) {
        state.statements[statementIndex] = udpatedStatement;
      }
    },
  },
});

export const { addStatement, initStatements, updateEditStatement } = submissionsSlice.actions;

// Selectors

export const selectStatements = ({ statements }: RootState) => statements.statements;

export const selectStatementById = createSelector(
  [selectStatements, (state, id: string | null) => id],
  (statements, id) => statements.find((s) => s.id === id) || null,
);

export default submissionsSlice;
