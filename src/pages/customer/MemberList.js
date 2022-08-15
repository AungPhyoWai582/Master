import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const MemberList = () => {
  return (
    <Paper sx={{ padding: "1", height: "100%" }}>
      <Stack direction={"row"} padding={1}>
        <TextField
          size={"small"}
          label={"Search"}
          color={"success"}
          sx={{ width: "40%" }}
          // onChange={(e) => setInputsearch(e.target.value)}
        />
      </Stack>
      <Stack padding={1} height={"70%"}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              {/* <TableCell>No</TableCell> */}
              <TableCell>Name</TableCell>
              <TableCell align="center">UserName</TableCell>
              {/* <TableCell>Phone No</TableCell> */}
              <TableCell align="center">Divider</TableCell>
              <TableCell align="right">Za</TableCell>
              <TableCell align="right">Detail</TableCell>
            </TableHead>
            <TableBody>
              {/* {users.data &&
                users.data
                  .filter((user, keey) => {
                    // if (inputsearch === "") {
                    //   return user;
                    // }
                    return (
                      user.username
                        .toLowerCase()
                        .includes(inputsearch.toLowerCase()) ||
                      user.name
                        .toLowerCase()
                        .includes(inputsearch.toLowerCase())
                      // user.divider.includes(inputsearch)
                    );
                  })
                  // .slice(page * rowperpage, page * rowperpage + rowperpage)
                  .map((user, key) => (
                    <TableRow sx={{ height: "5px" }}>
                      <TableCell>
                        <span>{key + 1}</span>
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell align="center">{user.username}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell align="center">{user.divider}</TableCell>
                      <TableCell align="right">{user.twoDZ}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          color="success"
                          onClick={() => UserContent.setDetailUser(user._id)}
                        >
                          <NavLink to={"/detail"}>
                            <VisibilityOutlined />
                          </NavLink>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      {/* <Stack direction={"row"} justifyContent={"end"} padding={1}>
        <TablePagination
          rowsPerPageOptions={[2, 5, 10]}
          count={users.count}
          rowsPerPage={rowperpage}
          page={page}
          component={"div"}
          onPageChange={hangleChangepage}
          // onRowsPerPageChange={hangleChangPerepage}
          onRowsPerPageChange
        />
      </Stack> */}
    </Paper>
  );
};

export default MemberList;
