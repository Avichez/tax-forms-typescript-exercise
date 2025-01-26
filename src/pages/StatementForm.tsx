import { Container, Paper, Typography } from "@mui/material";

import AddStatementForm from "../components/forms/AddStatementForm";

export default function StatementForm() {
  return (
    <Container sx={{ mt: 2 }}>
      <Paper sx={{ p: 5, mt: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Create Statement
        </Typography>

        <AddStatementForm />
      </Paper>
    </Container>
  );
}

