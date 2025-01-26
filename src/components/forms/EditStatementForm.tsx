import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { Box, Button, Grid, TextField, TextFieldProps, Typography } from "@mui/material";

import { useDispatch } from "react-redux";
import { Statement } from "../../lib/applicationTypes";
import { updateStatement } from "../../lib/api";
import { selectStatementById, updateEditStatement } from "../../redux/statements";
import { useAppSelector } from "../../lib/useAppSelector";

type AppFieldProps = {
  label: string;
  name: string;

  // Extend by TextFieldProps to use all available text field props
} & TextFieldProps;

const AppField: React.FC<AppFieldProps> = ({ label, name, sx, ...restFieldProps }) => {
  const [field] = useField(name);
  const value = field.value || "";

  return (
    <TextField
      fullWidth
      variant="outlined"
      id={name}
      label={label}
      sx={sx}
      {...restFieldProps}
      {...field}
    />
  );
};

const StatementSchema = Yup.object().shape({
  name: Yup.string().required("Please provide a name for the statement"),
});

type EditStatementFormProps = {
  id: string;
};

export default function EditStatementForm({ id }: EditStatementFormProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const statement = useAppSelector((state) => selectStatementById(state, id));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitEditStatement = async (values: Statement) => {
    try {
      setIsSubmitting(true);

      const submittedData = await updateStatement(values);
      dispatch(updateEditStatement(submittedData));
      navigate("/statements");
    } catch (error) {
      console.error("Failed to udpate statement:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!statement) {
    return <Box>Statement was not found!</Box>;
  }

  const initialValues: Statement = statement;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={StatementSchema}
      onSubmit={handleSubmitEditStatement}>
      {({ errors }) => (
        <Form>
          <AppField label="Name" name="name" error={!!errors.name} helperText={errors.name} />

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Contact Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <AppField label="First name" name="contactInformation.firstName" />
              </Grid>
              <Grid item xs={6}>
                <AppField label="Last name" name="contactInformation.lastName" />
              </Grid>
              <Grid item xs={6}>
                <AppField label="Email" name="contactInformation.email" />
              </Grid>
              <Grid item xs={6}>
                <AppField label="Phone number" name="contactInformation.phoneNumber" />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              Submit Statement
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
