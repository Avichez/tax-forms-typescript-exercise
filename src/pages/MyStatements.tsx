import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../lib/useAppSelector";
import { initStatements, selectStatements } from "../redux/statements";
import { loadStatements } from "../lib/api";

export default function MyStatements() {
  const dispatch = useAppDispatch();
  const statements = useAppSelector(selectStatements);

  useEffect(() => {
    loadStatements().then((statementsData) => {
      dispatch(initStatements(statementsData.data));
    });
  }, [dispatch]);

  return (
    <Box sx={{ mt: 2 }}>
      <Container>
        <TableContainer component={Paper}>
          <Typography variant="h4" sx={{ m: 1 }}>
            My Statements
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {statements.map((statement) => (
                <TableRow key={statement.id}>
                  <TableCell>{statement.name}</TableCell>
                  <TableCell>{statement.contactInformation.firstName}</TableCell>
                  <TableCell>{statement.contactInformation.lastName}</TableCell>
                  <TableCell>{statement.contactInformation.email}</TableCell>
                  <TableCell>{statement.contactInformation.phoneNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3 }}>
          <Button component={Link} to="/statement/new" variant="contained">
            Create Statement
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

