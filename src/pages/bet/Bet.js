import {
  Add,
  AddSharp,
  ArrowBack,
  ArrowForward,
  Close,
  Delete,
  Edit,
} from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Pagination,
  PaginationItem,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { blue, green, grey, red, yellow } from "@mui/material/colors";
import { arrayIncludes } from "@mui/x-date-pickers/internals/utils/utils";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import ReactFileReader from "react-file-reader";
import { useLocation, useParams } from "react-router-dom";
import BetButtonCom from "../../components/BetButtonCom";
import BetCom from "../../components/BetCom";
import BetListCom from "../../components/BetListCom";
import LagerCom from "../../components/LagerCom";
import TwoDSign from "../../components/TwoDSign";
import Axios from "../../shared/Axios";
import Lager from "../../pages/lager/Lager";
import { startStar } from "./Betsign";

const Bet = () => {
  const [inOutCtl, setInOutCtl] = useState();
  // const [singleBetCleanctlr, setSingleBetCleanctlr] = useState(false);

  //loading
  const [loading, setLoading] = useState(false);
  const [loadSuccess, setLoadSuccess] = useState(false);
  // const timer = useRef();

  const [selectChoice, setSelectChoice] = useState();
  const [enternumtol, setEnternumtol] = useState({ number: "", total: "" });

  const [beterrorcontrol, setBeterrorcontrol] = useState(false);
  const [callandBetlistctleff, setCallandBetlistctleff] = useState(true);

  const [agentcalls, setAgentcalls] = useState([]);
  const [callcrud, setCallcrud] = useState(null);
  const [lager, setLager] = useState();
  const [call, setCall] = useState({
    agent: "",
    numbers: [],
  });
  const [callList, setCallList] = useState([]);

  const [agents, setAgents] = useState([]);

  const showCalls = [];

  const { lotteryId } = useParams();
  const location = useLocation();
  const { hot_tees } = location.state;
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  //callList crud
  const [editCtlBtn, setEditCtlBtn] = useState(false);
  const [agentcallcrud, setAgentCallCrud] = useState({ id: "", numbers: [] });
  const [keydemo, setKeyDemo] = useState();
  //For twoD sign state
  const [autoCompleteValue, setAutoCompleteValue] = useState();

  const [onchange, setOnchange] = useState({
    number: "",
    amount: "",
  });
  // console.log(agents);
  //lager open
  const [lagerOpen, setLagerOpen] = useState(false);

  //Lager Break
  const [lagerBreak, setLagerBreak] = useState("0");
  const [demoLager, setDemolager] = useState();
  const [callDemo, setCallDemo] = useState([]);
  //calllist control state
  const [calllistctrl, setCalllistctrl] = useState(false);

  const [agentTotalData, setAgentTotalData] = useState({
    agent: "123456",
    numbers: [
      { number: "13", total: "5000" },
      { number: "45", total: "1000" },
      { number: "23", total: "2000" },
      { number: "63", total: "8000" },
      { number: "55", total: "4000" },
      { number: "41", total: "7000" },
      { number: "33", total: "10000" },
      { number: "86", total: "25000" },
    ],
  });
  useEffect(() => {
    // console.log(hot_tees);
    // console.log(lotteryId);
    Axios.get(`/agents`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    })
      .then((res) => {
        // console.log(res.data);
        const agents = res.data.data;
        // console.log(agents);

        if (agents) {
          setAgents(agents);
          setAutoCompleteValue(agents[0]);
        }
      })
      .catch((err) => console.log(err));

    Axios.get(`/lagers/${lotteryId}`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setLager(res.data.data);
        setCallList(res.data.data.in.read);
        setCalllistctrl(false);
        // setSuccess(false);
      })
      .catch((err) => console.log(err));
  }, [calllistctrl]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    console.log(value);

    agentTotalData.numbers.map((agenTol, key) => {
      //Check for input total
      if (agentTotalData.numbers.map((ag) => ag.number).includes(value)) {
        const index = agentTotalData.numbers.findIndex(
          (obj) => obj.number === value
        );
        console.log(index, agentTotalData.numbers[index]);
        // update setstate
        setEnternumtol({
          number: agentTotalData.numbers[index].number,
          total: agentTotalData.numbers[index].total,
        });
      } else {
        setEnternumtol({
          number: "",
          total: "",
        });
      }
    });

    setOnchange({
      ...onchange,
      [name]: value,
    });
  };

  console.log(enternumtol);
  const choice = (e) => {
    e.preventDefault();

    if (
      onchange.number.length > 1 &&
      onchange.number.length < 3 &&
      onchange.amount.length > 2
      // onchange.number !== "**"
    ) {
      setCall({
        ...call,
        numbers: [...call.numbers, onchange],
      });
      {
        setOnchange({ number: "", amount: onchange.amount });
      }

      setEditCtlBtn(false);
      setCallandBetlistctleff(false);
    }
    {
      setBeterrorcontrol(true);
    }
  };

  const handleFiles = (e) => {
    // console.log(file.base64);
    // console.log(file.fileList);

    const reader = new FileReader();
    reader.onload = (e) => {
      const ReadData = [];

      const text = e.target.result;
      console.log(text);
      const cells = text.split("\n").map((el) => el.split(/\s+/));
      // console.log(cells);
      const headings = cells.shift();
      console.log(cells);
      // console.log(headings);

      cells.map((el) => ReadData.push({ number: el[0], amount: el[1] }));

      console.log(ReadData);
      if (ReadData.length) {
        setCall({ ...call, numbers: ReadData });
      }
    };

    // setCall({ ...call, numbers: ReadData });

    reader.readAsText(e.target.files[0]);
  };

  // console.log(call);

  const bet = (e) => {
    e.preventDefault();
    console.log(call);
    if (call.numbers.length === 0 && loading === false) {
      setBeterrorcontrol(true);
      return;
    }
    Axios.post(`/call/${lotteryId}`, call, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    })
      .then((res) => {
        console.log(res.data);

        setSuccess(true);
        setLoading(true);
        setCall({
          agent: "",
          numbers: [],
        });
        setOnchange({
          number: "",
          amount: "",
        });
        setCalllistctrl(true);
      })
      .then((res) => {
        setSuccess(false);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  // console.log(la);
  //crud delete
  const agentcallDelete = (key, calcrud) => {
    console.log(calcrud);
    // const enumbers = [...calcrud];

    // console.log(index);
  };
  const editHandle = (cal, key) => {
    console.log(key);
    setEditCtlBtn(true);
    setOnchange({
      number: cal.number,
      amount: cal.amount,
    });
  };
  // console.log(callcrud);
  //editReading
  const updateCall = () => {
    console.log(onchange);
    console.log(agentcallcrud);
    const numbers = [...agentcallcrud.numbers];
    const index = numbers.findIndex((obj) => obj.number == onchange.number);
    console.log(numbers[index]);
    numbers[index] = onchange;
    console.log(numbers);
    // setAgentCallCrud({ ...agentcallcrud, numbers: numbers });
    Axios.put(
      `/call/${lotteryId}/${agentcallcrud.id}`,
      {
        numbers: numbers,
      },
      {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("access-token"),
        },
      }
    ).then((res) => {
      console.log(res.data.data);
      setAgentCallCrud({ id: "", numbers: [] });
      setEditCtlBtn(false);
    });
  };

  const setBreak = () => {
    console.log(demoLager);
    console.log(lagerBreak);
    const extraArray = [];
    demoLager.map((demol, key) => {
      if (Number(demol.amount) > Number(lagerBreak)) {
        // console.log(Number(demol.amount) - Number(lagerBreak));
        let obj = {
          number: demol.number,
          amount: Number(demol.amount) - Number(lagerBreak),
        };
        extraArray.push(obj);
      }
      // console.log(array);
    });
    console.log(extraArray);
    setCallDemo(extraArray);
    // setDemolager(callDemo);
    setLagerOpen(false);
  };
  // console.log(callDemo);
  // console.log(agentcallcrud);

  // call
  useEffect(() => {
    Axios.get(`/call/${lotteryId}`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      console.log(res.data.data);
      setAgentcalls(res.data.data);
    });
  }, [calllistctrl]);
  // console.log(call.agent.toString());
  // const b = [...agentcalls].filter((a) => {
  //   return call.agent.toString() === a.agent._id.toString();
  // });
  // console.log(agentcalls);
  // console.log(b);
  // console.log(showCalls);

  //CallOutLager
  const changeInOut = (e) => {
    setSelectChoice(e.target.value);
    console.log(selectChoice);
  };

  return (
    <Stack height={"100%"}>
      {success && (
        <Alert
          severity="success"
          sx={{
            color: "green",
            // fontWeight: "bold",
            bgcolor: green[200],
          }}
          action={
            <IconButton
              aria-label="close"
              color="success"
              size="small"
              onClick={() => {
                setSuccess(false);
              }}
            >
              <Close fontSize="12" />
            </IconButton>
          }
        >
          Lottery Updated !
        </Alert>
      )}
      {error && (
        <Alert
          severity="error"
          sx={{
            color: "red",
            // fontWeight: "bold",
            bgcolor: red[200],
          }}
          action={
            <IconButton
              aria-label="close"
              color="error"
              size="small"
              onClick={() => {
                setError(false);
              }}
            >
              <Close fontSize="12" />
            </IconButton>
          }
        >
          Error
        </Alert>
      )}
      {beterrorcontrol === true && (
        <Alert
          variant="filled"
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="error"
              size="small"
              onClick={() => {
                setBeterrorcontrol(false);
              }}
            >
              <Close fontSize="12" />
            </IconButton>
          }
        >
          This is bet error alert — check it out!
        </Alert>
      )}
      <Stack
        padding={1}
        spacing={1}
        direction={"row"}
        justifyContent={"center"}
        boxShadow={1}
      >
        {/* <Autocomplete
          onChange={changeInOut}
          size="small"
          id="combo-box-demo"
          // sx={{ width: 50 }}
          options={selectType}
          renderInput={(params) => (
            <TextField
              {...params}
              label="In/Out"
              size={"small"}
              sx={{ width: 100 }}
            />
          )}
        /> */}

        <Autocomplete
          size="small"
          // id="combo-box-demo"
          // options={selectChoice && selectChoice === "Out" ? agents : "0"}
          options={agents}
          isOptionEqualToValue={(option, value) => option.code === value}
          value={autoCompleteValue}
          sx={{ width: 200 }}
          getOptionLabel={(cus) => cus.username}
          onChange={(e, value) => {
            setAutoCompleteValue(value);
            setCall({ ...call, agent: value._id });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ fontSize: 8 }}
              label="Agent"
              size="small"
              color={"success"}
              // defaultValue={agents}
            />
          )}
        />

        <Button
          onClick={handleFiles}
          variant="contained"
          component="label"
          color="success"
          size="small"
          // sx={{ fontSize: 14 }}
        >
          <Typography fontSize={13}>Read</Typography>
          <input hidden accept={"All/*"} multiple type="file" />
        </Button>

        <Stack direction={"row"} spacing={1}>
          <Button
            variant={"contained"}
            size={"small"}
            color={"success"}
            onClick={() => {
              setLagerOpen(true);
              setDemolager(lager.in.numbers);
            }}
          >
            <Typography fontSize={12} variant={"caption"} fontWeight={100}>
              Lager
            </Typography>
          </Button>
          <FormControl size="small">
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="In"
                control={
                  <Radio
                    size="small"
                    color="success"
                    onChange={(e) => changeInOut(e)}
                  />
                }
                label="In"
              />
              <FormControlLabel
                value="Out"
                control={
                  <Radio
                    size="small"
                    color="success"
                    onChange={(e) => console.log(e.target.value)}
                  />
                }
                label="Out"
              />
            </RadioGroup>
          </FormControl>
        </Stack>
      </Stack>
      <Stack
        padding={1}
        spacing={1}
        direction={"row"}
        justifyContent={"center"}
        boxShadow={1}
      >
        <BetCom
          width={50}
          text={"number"}
          name="number"
          value={onchange.number}
          onChange={onChangeHandler}
          label={"နံပါတ်"}
        />

        {/* <TwoDSign /> */}
        <BetCom
          text={"number"}
          name="amount"
          value={onchange.amount}
          onChange={onChangeHandler}
          label={"ထိုးငွေ"}
        />
        <Stack padding={1}>
          {editCtlBtn ? (
            <IconButton onClick={updateCall} size={"small"}>
              <Edit fontSize="8" />
            </IconButton>
          ) : (
            <IconButton
              onClick={choice}
              size={"small"}
              sx={{ bgcolor: green[700] }}
            >
              <Add fontSize="8" />
            </IconButton>
          )}
        </Stack>
      </Stack>
      <Stack
        padding={1}
        alignContent={"center"}
        width={"100%"}
        direction={"row"}
        border={1}
      >
        {loading === false ? (
          <Stack
            component={"button"}
            // height={"5%"}
            sx={{
              ":hover": {
                cursor: "pointer",
              },
            }}
            textAlign="center"
            onClick={bet}
          >
            <Typography margin={"auto"} textAlign={"center"}>
              Bet
            </Typography>
          </Stack>
        ) : (
          <Stack justifyContent={"end"}>
            <CircularProgress size={"small"} />
          </Stack>
        )}
        <Stack direction={"row"} textAlign={"center"} padding>
          {enternumtol.number !== "" && (
            <Typography
              textAlign={"center"}
              fontSize={{ xs: 10, sm: 12, md: 13 }}
            >
              Amount : {enternumtol.total}
            </Typography>
          )}
        </Stack>
      </Stack>

      <Stack justifyContent={"right"} width={"100%"} direction={"row"}>
        <Pagination
          size="small"
          page={call.numbers}
          count={call.numbers}
          boundaryCount={2}
          siblingCount={-1}
          renderItem={(item) => (
            <PaginationItem
              size="small"
              components={{ previous: ArrowBack, next: ArrowForward }}
              {...item}
            />
          )}
        />
      </Stack>
      <Stack direction={"row"}>
        <Stack
          direction={"column"}
          alignItems={"center"}
          width={"50%"}
          maxHeight={400}
          minHeight={400}
          overflow={"scroll"}
          boxShadow={1}
          borderBottom={1}
          padding={1}
          spacing={1}
        >
          {call.agent && call.numbers.length
            ? call.numbers.map((cal, key) => (
                <Stack width={"100%"} justifyContent={"space-between"}>
                  <BetListCom call={cal} key={key} />
                </Stack>
              ))
            : agentcalls
                .filter(
                  (ag, key) => ag.agent._id.toString() == call.agent.toString()
                )
                .map((cal, key) => {
                  // console.log(key);
                  // console.log(cal);

                  return (
                    <Stack
                      width={"100%"}
                      bgcolor={`${key % 2 == 0 ? blue[200] : ""}`}
                      justifyContent={"space-around"}
                      // component={"button"}
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        setAgentCallCrud({ id: cal._id, numbers: cal.numbers })
                      }
                    >
                      {cal.numbers.map((ca, key) => {
                        return <BetListCom call={ca} key={key} />;
                      })}
                    </Stack>
                  );
                })}
        </Stack>
        <Stack
          direction={"column"}
          // alignItems={"center"}
          width={"50%"}
          maxHeight={400}
          minHeight={400}
          overflow={"scroll"}
          boxShadow={1}
          borderBottom={1}
          padding={1}
          justifyContent={"space-between"}
        >
          {/* <Stack justifyContent="normal" width={"100%"}>
            <Stack width={"30%"}>
              <Button variant="contained" size="small">
                Delete
              </Button>
            </Stack>
          </Stack> */}
          {/* {agentcallcrud && agentcallcrud.length === null */}
          {!agentcallcrud.numbers.length
            ? callDemo.map((calc, key) => {
                return <BetListCom call={calc} key={key} />;
              })
            : agentcallcrud.numbers.map((calcrud, key) => {
                return (
                  <BetListCom call={calcrud}>
                    <Stack
                      direction={"row"}
                      onClick={() => editHandle(calcrud, key)}
                    >
                      <IconButton size="small">
                        <Edit fontSize="10" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => agentcallDelete(key, calcrud)}
                      >
                        <Delete fontSize="10" />
                      </IconButton>
                    </Stack>
                  </BetListCom>
                );
              })}
        </Stack>
      </Stack>

      <Dialog fullScreen open={lagerOpen}>
        <Stack alignItems={"end"}>
          <IconButton onClick={() => setLagerOpen(false)}>
            <Close />
          </IconButton>
        </Stack>
        <Stack maxWidth={"100%"} padding={1}>
          <Stack direction={"row"} padding={1}>
            <TextField
              value={lagerBreak}
              label={"Break Amount"}
              size={"small"}
              onChange={(e) => setLagerBreak(e.target.value)}
            />
            <Button
              size="small"
              variant={"contained"}
              color={"success"}
              onClick={setBreak}
            >
              Set
            </Button>
          </Stack>
          <LagerCom />
        </Stack>
      </Dialog>
    </Stack>
  );
};

export default Bet;
