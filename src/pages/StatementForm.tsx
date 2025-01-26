import { useParams } from "react-router-dom";
import { Container, Paper, Typography } from "@mui/material";

import AddStatementForm from "../components/forms/AddStatementForm";
import EditStatementForm from "../components/forms/EditStatementForm";

export default function StatementForm() {
  const { id } = useParams();
  const formTitle = id ? "Update Statement" : "Create Statement";

  return (
    <Container sx={{ mt: 2 }}>
      <Paper sx={{ p: 5, mt: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {formTitle}
        </Typography>

        {id ? <EditStatementForm id={id} /> : <AddStatementForm />}
      </Paper>
    </Container>
  );
}

