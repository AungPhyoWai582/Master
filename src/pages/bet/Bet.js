import {
  AddSharp,
  ArrowBack,
  ArrowForward,
  Close,
  Edit,
} from "@mui/icons-material";
import {
  Alert,
  Autocomplete,
  Button,
  Dialog,
  IconButton,
  Pagination,
  PaginationItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { green, grey, red, yellow } from "@mui/material/colors";
import { arrayIncludes } from "@mui/x-date-pickers/internals/utils/utils";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ReactFileReader from "react-file-reader";
import { useLocation, useParams } from "react-router-dom";
import BetButtonCom from "../../components/BetButtonCom";
import BetCom from "../../components/BetCom";
import BetListCom from "../../components/BetListCom";
import LagerCom from "../../components/LagerCom";
import TwoDSign from "../../components/TwoDSign";
import Axios from "../../shared/Axios";
import Lager from "../../pages/lager/Lager";
// import { content } from "../../components/TwoDSign";

const Bet = () => {
  // const choseFun = useContext(content);
  // console.log(choseFun);
  const [agentcall, setAgentcall] = useState({});
  const [callcrud, setCallcrud] = useState(null);
  const [lager, setLager] = useState();
  const [call, setCall] = useState({
    agent: "",
    numbers: [],
  });
  const [callList, setCallList] = useState([]);

  const [agents, setAgents] = useState([]);

  const showCalls = [];
  // console.log(agents);
  useEffect(() => {
    Axios.get(`/agents`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    })
      .then((res) => {
        console.log(res.data);
        const agents = res.data.data;
        console.log(agents);

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
        setLager(res.data.data);
        setCallList(res.data.data.in.read);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(lager);
  console.log(callList);
  console.log(agents);

  // callList.map((clist) => {
  //   if (clist.agent.toString() === call.agent.toString()) {
  //     showCalls.push(clist);
  //   }
  // });

  console.log(showCalls);

  const { lotteryId } = useParams();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  //For twoD sign state
  const [autoCompleteValue, setAutoCompleteValue] = useState();

  const [onchange, setOnchange] = useState({
    number: "",
    amount: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setOnchange({
      ...onchange,
      [name]: value,
    });
  };

  const choice = (e) => {
    e.preventDefault();
    if (onchange.number !== "" && onchange.number.length == 2) {
      setCall({
        ...call,
        numbers: [...call.numbers, onchange],
      });
      {
        setOnchange({ number: "", amount: onchange.amount });
      }

      setEditCtlBtn(false);
    } else {
      console.log("error");
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

  // const readFile = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.file);
  //   console.log(e.target.result);
  // };

  const bet = (e) => {
    e.preventDefault();
    console.log(call);

    Axios.post(`/call/${lotteryId}`, call, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    })
      .then((res) => {
        console.log(res.data);
        setSuccess(true);
        setCall({
          agent: "",
          numbers: [],
        });
        setOnchange({
          number: "",
          amount: "",
        });
      })
      .catch((err) => console.log(err));
  };
  // console.log(la);
  //callList crud
  const [editCtlBtn, setEditCtlBtn] = useState(false);
  const [keydemo, setKeyDemo] = useState();
  const editHandle = (key) => {
    setEditCtlBtn(true);
    // console.log(editCtlBtn);
    setKeyDemo(key);
    setOnchange({
      number: call.numbers[key].number,
      amount: call.numbers[key].amount,
    });
    // console.log(call.agent);
    console.log(agents);
  };
  console.log(callcrud);
  //editReading
  const editReadData = () => {
    let demo = call.numbers;
    console.log(demo[keydemo]);
    console.log(onchange);
    demo.splice(keydemo, 1, onchange);
    console.log(demo);
    setCall({ ...call, agent: call.agent, numbers: demo });
  };

  //lager open
  const [lagerOpen, setLagerOpen] = useState(false);

  //get api lager
  // const [agentcall, setAgentcall] = useState([]);
  // const [showagentcall, setShowagentcall] = useState([]);
  // console.log(call.agent);
  // useEffect(() => {
  //   Axios.get(`/lagers/${lotteryId}`, {
  //     headers: {
  //       authorization: `Bearer ` + localStorage.getItem("access-token"),
  //     },
  //   }).then((res) => {
  //     console.log(res.data.data.in.read);
  //     setAgentcall(res.data.data.in.read);
  //   });
  // }, []);

  // let l;
  // if (call.agent) {
  //   l = lager.in.read.map((lir) => {
  //     if (lir.agent == call.agent) {
  //       return lir;
  //     }
  //   });
  // }

  // console.log(l);

  //Lager Break
  const [lagerBreak, setLagerBreak] = useState();
  const [demoLager, setDemolager] = useState();
  const [callDemo, setCallDemo] = useState([]);
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
  console.log(callDemo);

  // call
  useEffect(() => {
    Axios.get(`/call/${lotteryId}`, {
      headers: {
        authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    }).then((res) => {
      console.log(res.data.data);
      setAgentcall(res.data.data);
    });
  }, []);
  console.log(call.agent.toString());
  console.log(agentcall._id);
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
      <Stack
        padding={1}
        spacing={1}
        direction={"row"}
        justifyContent={"center"}
        boxShadow={1}
      >
        <Autocomplete
          size="small"
          // id="combo-box-demo"
          options={agents}
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
            />
          )}
        />
        <BetCom name="select" type={"file"} onChange={handleFiles} />
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

          <Button variant={"contained"} size={"small"} color={"success"}>
            <Typography fontSize={12} variant={"caption"} fontWeight={100}>
              In/Out
            </Typography>
          </Button>
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
          name="number"
          value={onchange.number}
          onChange={onChangeHandler}
          label={"နံပါတ်"}
        />

        {/* <TwoDSign /> */}
        <BetCom
          name="amount"
          value={onchange.amount}
          onChange={onChangeHandler}
          label={"ထိုးငွေ"}
        />
      </Stack>
      <Stack padding={1}>
        {editCtlBtn ? (
          <BetButtonCom
            onClick={editReadData}
            btnText={"ပြင်မည်"}
            color={"success"}
          />
        ) : (
          <BetButtonCom
            onClick={choice}
            btnText={"ရွေးမည်"}
            color={"success"}
          />
        )}
      </Stack>
      {/* <Stack alignItems={"start"} paddingX={{ md: 4 }}>
        <BetCom
          style={{ marginTop: 1 }}
          value={call.callname}
          onChange={(e) => setCall({ ...call, callname: e.target.value })}
          label="အမည်"
        />
        
      </Stack> */}
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
          width={"30%"}
          maxHeight={500}
          height={"100%"}
          minHeight={400}
          overflow={"scroll"}
          boxShadow={1}
          borderBottom={1}
          padding={1}
          spacing={1}
        >
          {call.agent &&
          call.numbers.length &&
          call.numbers.length &&
          agentcall.agent &&
          agentcall.agent == call.agent
            ? agentcall.numbers.map((cal, key) => {
                console.log(key);
                console.log(cal);
                return (
                  <BetListCom
                    call={cal}
                    key={key}
                    onClick={() => editHandle(key)}
                  />
                );
              })
            : showCalls.map((scal, key) => (
                <Stack
                  component={"button"}
                  width={"100%"}
                  bgcolor={`${key % 2 === 0 ? yellow[300] : green[300]}`}
                  borderBottom={1}
                  borderColor={grey[500]}
                  onClick={() => setCallcrud(showCalls[key])}
                >
                  {scal.numbers.map((cal) => (
                    <BetListCom call={cal} />
                  ))}
                </Stack>
              ))}
        </Stack>

        <Stack
          direction={"column"}
          alignItems={"center"}
          width={"30%"}
          maxHeight={500}
          height={"100%"}
          minHeight={400}
          boxShadow={1}
          borderBottom={1}
          padding={1}
          spacing={1}
        >
          {callcrud !== null &&
            callcrud.numbers.map((calc, key) => {
              return (
                <BetListCom call={calc}>
                  <Stack direction={"row"} width={"60%"}>
                    <Button size="small">
                      <Edit fontSize="10" />
                    </Button>
                  </Stack>
                </BetListCom>
              );
            })}
        </Stack>
        <Stack width={"40%"}>
          {callDemo !== null &&
            callDemo.map((calc, key) => {
              return (
                <BetListCom call={calc}>
                  <Stack direction={"row"}>
                    <IconButton size="small">
                      <Edit fontSize="10" />
                    </IconButton>
                  </Stack>
                </BetListCom>
              );
            })}
        </Stack>
      </Stack>
      <Stack
        component={"button"}
        height={"5%"}
        sx={{
          ":hover": {
            cursor: "pointer",
          },
        }}
        textAlign="center"
        position={"absolute"}
        bottom={4}
        width="100%"
        alignItems={"center"}
        bgcolor="success.main"
        onClick={bet}
      >
        <Typography margin={"auto"} textAlign={"center"}>
          Bet
        </Typography>
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
