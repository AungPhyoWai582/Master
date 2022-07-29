import React, { useEffect, useState } from "react";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  Stack,
  Typography,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  TableBody,
  TableRow,
  IconButton,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import { useLocation, NavLink } from "react-router-dom";
import Axios from "../../shared/Axios";

const Report = () => {
  const location = useLocation();
  const { lotteryId } = location.state;
  console.log(lotteryId);

  const [report, setReport] = useState([]);

  useEffect(() => {
    Axios.get(`/reports/agent/${lotteryId}`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      setReport(res.data.resReport);
    });
  }, []);
  return (
    <Stack>
      {/* <TableContainer component={Paper} sx={{ padding: "1px" }}> */}
      <Table
        // sx={{ minWidth: "max-content" }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead sx={{ bgcolor: "success.light" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>User Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Bet</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Comission</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Win/Lose</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ overflow: "scroll" }}>
          {report.map((rp) => {
            return (
              <TableRow>
                <TableCell>{rp.userId.username}</TableCell>
                <TableCell>{rp.bet}</TableCell>
                <TableCell>{rp.commission}</TableCell>
                <TableCell>{rp.win}</TableCell>
                <TableCell>
                  <IconButton color="success">
                    <NavLink
                      to={`/reports/agent/${rp.userId._id}/calls/${lotteryId}`}
                      // state={{ lotteryId: lotteryId }}
                    >
                      <VisibilityOutlined />
                    </NavLink>
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* </TableContainer> */}
    </Stack>
  );
};

export default Report;
