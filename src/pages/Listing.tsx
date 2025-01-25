import React from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, useField } from "formik";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";

import { selectClaimedListingById } from "../redux/listings";
import { useAppSelector } from "../lib/useAppSelector";
import { Submission } from "../lib/applicationTypes";

type AppFieldProps = {
  label: string;
  name: string;

  // Extend by TextFieldProps to use all available text field props
} & TextFieldProps;

// AppField is mostly a simple wrapper around MaterialUI's TextField, but
// hooks into Formik. Just saves us allot of typing.
const AppField: React.FC<AppFieldProps> = ({
  label,
  name,
  sx,
  ...restFieldProps
}) => {
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

export default function Listing() {
  const { id = null } = useParams();
  const listing = useAppSelector((state) =>
    selectClaimedListingById(state, id)
  );

  if (!listing) {
    return <Box>Listing was not found!</Box>;
  }

  const initialValues: Submission = {
    listing,
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Paper sx={{ p: 5, mt: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Request An Extension For {listing.name}
        </Typography>

        <Formik initialValues={initialValues} onSubmit={() => {}}>
          <Form>
            <AppField label="Name" name="listing.name" />

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Mailing Address</Typography>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <AppField
                    label="Address 1"
                    name="listing.mailingAddress.address1"
                  />
                </Grid>
                <Grid item xs={3}>
                  <AppField
                    label="Address 2"
                    name="listing.mailingAddress.address2"
                  />
                </Grid>
                <Grid item xs={2}>
                  <AppField label="City" name="listing.mailingAddress.city" />
                </Grid>
                <Grid item xs={2}>
                  <AppField label="State" name="listing.mailingAddress.state" />
                </Grid>
                <Grid item xs={2}>
                  <AppField label="Zip" name="listing.mailingAddress.zip" />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Physical Address</Typography>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <AppField
                    label="Address 1"
                    name="listing.physicalAddress.address1"
                  />
                </Grid>
                <Grid item xs={3}>
                  <AppField
                    label="Address 2"
                    name="listing.physicalAddress.address2"
                  />
                </Grid>
                <Grid item xs={2}>
                  <AppField label="City" name="listing.physicalAddress.city" />
                </Grid>
                <Grid item xs={2}>
                  <AppField
                    label="State"
                    name="listing.physicalAddress.state"
                  />
                </Grid>
                <Grid item xs={2}>
                  <AppField label="Zip" name="listing.physicalAddress.zip" />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Reason of Extension</Typography>
              <AppField label="Reason" name="reason" multiline minRows={3} />
            </Box>

            <Box sx={{ mt: 3 }}>
              <Button variant="contained" type="submit">
                Submit Request
              </Button>
            </Box>
          </Form>
        </Formik>
      </Paper>
    </Container>
  );
}
