import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  RemoveRedEye,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Button,
  FormControlLabel,
  Stack,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
  TextField,
  Typography,
  Checkbox,
  TableContainer,
  Paper,
  Collapse,
  Box,
  Tab,
  Autocomplete,
} from "@mui/material";
import { common, teal } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Axios from "../../shared/Axios";
import ExportPDFModal from "./ExportPDFModal";

const Row = ({ lag, key, selectCheck }) => {
  // const { row } = props;
  // const [open, setOpen] = React.useState(false);
  // const { _id, _date, _time, totalAmount, lottery, commission, win } = lag;
  // const date = new Date(_date);

  // console.log(lag.data);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, padding: 0.5 }}>
        <TableCell>OOO</TableCell>
        <TableCell align="center">
          {/* {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}/ ${_time}`} */}
          1/1/1 PM
        </TableCell>
        <TableCell align="center">
          {/* {totalAmount} */}
          1000000
        </TableCell>
        <TableCell align="center">
          {/* {commission} */}
          10000
        </TableCell>
        <TableCell align="center">
          {/* {win} */}
          90000
        </TableCell>

        <TableCell align="center">
          {/* <NavLink
            to={`/view/lager/${lottery}`}
            state={{ lager: lag }}
            style={{ textDecoration: "none", color: "inherit" }}
          > */}
          <IconButton>
            <VisibilityOutlined />
          </IconButton>
          {/* </NavLink> */}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const View = () => {
  const [lager, setLager] = useState([]);
  const [demo, setDemo] = useState([]);

  useEffect(() => {
    Axios.get(`/lagers`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      const data = [...res.data.data];
      setLager(data);
    });
  }, []);

  console.log(lager);

  // if (demo.length) {
  //   demo.map((d) => {
  //     setLager({ data: d, select: false });
  //   });
  // }

  //Checkbox
  const [check, setCheck] = useState([]);
  const [handleSelect, setHandleSelect] = useState([]);

  console.log(check);

  const selectCheck = (e, key) => {
    setCheck([...check, { key: key, checked: e.target.checked }]);
    console.log(key, e);
    console.log(lager[key]);
    setHandleSelect([...handleSelect, lager[key]]);
  };
  console.log(handleSelect);
  const sentLager = () => {
    let arr = [];
    handleSelect.map((hslt) => {
      let obj = {
        lottery: hslt.lottery,
        user: hslt.user,
        number: hslt.call.length,
        totalAmount: hslt.totalAmount,
        commission: hslt.commission,
        call: hslt.call,
      };
      arr.push(obj);
    });
    Axios.post("/lagers", arr, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }).then((res) => console.log(res.data));
  };

  //pdf
  const [open, setOpen] = useState(false);
  //
  // const a = [{ "A"}, { "B"}, { "C"}];
  return (
    <Stack
      width={{ xs: "100%" }}
      margin={{ md: "auto" }}
      //   component={"table"}
      boxShadow={1}
      spacing={1}
      padding={1}
      // marginX={0}
    >
      <Stack direction={"row"} spacing={1} padding={2} justifyContent={"end"}>
        <Autocomplete
          size={"small"}
          id="combo-box-demo"
          // options={}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select Reports" size={"small"} />
          )}
        />
        <Button
          variant={"contained"}
          size={"small"}
          color={"success"}
          onClick={() => setOpen(true)}
        >
          Export Excel
        </Button>
        <Button
          variant="contained"
          size="small"
          color={"success"}
          onClick={sentLager}
        >
          Send Lager
        </Button>
      </Stack>
      <ExportPDFModal open={open} setOpen={setOpen} />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">date</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Commission</TableCell>
              <TableCell align="center">Win</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <Row
            // check={check}
            // setCheck={setCheck}
            // lag={lag}
            // key={key}
            // selectCheck={(e) => selectCheck(e, key)}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default View;
