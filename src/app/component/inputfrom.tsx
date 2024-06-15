"use client";
import React, { use, useEffect } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Autocomplete,
  Slider,
  Stack,
  InputAdornment,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const StyledTextField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const StyledInput = styled("input")({
  display: "none",
});

interface SuperText {
  label: string;
}
interface Typebuilding {
  id: number;
  name: string;
}

interface Typepower {
  id: number;
  name: string;
}

interface Typesalepower {
  id: number;
  name: string;
}

interface Payload {
  building: string;
  fname: string;
  lname: string;
  day: number;
  night: number;
  phone: string;
  email: string;
  address: string;
  location: string;
  power: string;
  pricePower: number;
  salePower: string;
  sizePower: string;
  image: string;
  contect: boolean;
}

export default function Inputfrom() {
  const [fname, setFname] = React.useState<string>("");
  const [lname, setLname] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const [building, setBuilding] = React.useState<any>({});
  const [power, setPower] = React.useState<any>({});
  const [pricePower, setPricePower] = React.useState<number>(0.0);
  const [percenPower, setPercenPower] = React.useState<number>(50);
  const [salePower, setSalePower] = React.useState<any>({});
  const [sizePower, setSizePower] = React.useState<any>("");
  const [image, setImage] = React.useState<any>({});
  const [contect, setContect] = React.useState<boolean>(false);
  const [error, setError] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const renderText = ({ label }: SuperText) => {
    return (
      <Typography variant="h6" component="h2">
        {label}
      </Typography>
    );
  };

  const handleChangePercenPower = (
    event: Event,
    newValue: number | number[]
  ) => {
    setPercenPower(newValue as number);
    handleCalPower(pricePower, newValue);
  };

  const typeBuilding: Typebuilding[] = [
    {
      id: 1,
      name: "บ้าน",
    },
    {
      id: 2,
      name: "โรงงาน",
    },
    {
      id: 3,
      name: "อพาท์เม้นท์",
    },
    {
      id: 4,
      name: "อาคารธุรกิจขาดเล็ก",
    },
    {
      id: 5,
      name: "สถานีบริการน้ำมัน",
    },
  ];

  const typePower: Typepower[] = [
    {
      id: 1,
      name: "1 Phase",
    },
    {
      id: 2,
      name: "3 Phase",
    },
  ];
  const salasPower: Typesalepower[] = [
    {
      id: 1,
      name: "ไม่ต้องการขายไฟ",
    },
    {
      id: 2,
      name: "ต้องการขายไฟ",
    },
  ];

  const handleSubmit = async (e: any) => {
    if (
      !fname ||
      !lname ||
      !email ||
      !phone ||
      !location ||
      !building ||
      !pricePower
    ) {
      setError(true);
    } else {
      setError(false);
      const rate = Number(100);
      const payload: Payload = {
        building: building.name,
        fname,
        lname,
        day: percenPower,
        night: rate - percenPower,
        phone,
        email,
        address,
        location,
        power: power.name,
        pricePower,
        salePower: salePower.name,
        sizePower,
        image: image.name,
        contect,
      };

      const apiUrl = `${process.env.NEXT_PUBLIC_SEND_EMAIL_API}`;

      axios
        .post(apiUrl, payload)
        .then((res) => {
          setFname("");

          if (res.data) {
            setSnackbarMessage("ส่งอีเมลสำเร็จรอการติดต่อกลับจากทางทีมงาน");
            setOpenSnackbar(true);

            // setLname("");
            // setPhone("");
            // setEmail("");
            // setAddress("");
            // setLocation("");
            // setBuilding({});
            // setPower({});
            // setPricePower(0.0);
            // setPercenPower(50);
            // setSalePower({});
            // setSizePower("");
            // setImage("");
            // setContect(false);
          }
        })
        .catch((error) => {
          console.error("Error posting data:", error);
        });
    }
  };

  const handleCalPower = (data?: any, item?: any) => {
    setPricePower(data);

    if (power.id === 1) {
      const price = Number(data);
      const useDay = Math.floor((item / 100) * 24) || 8;
      const useNight = ((100 - item) / 100) * 24;
      const cost = price;
      const rate = 4;
      const hoursPerDay = Number(useDay);
      const daysPerMonth = 30;

      const energyUsage = cost / rate;

      const installedCapacity = energyUsage / (hoursPerDay * daysPerMonth);

      setSizePower(installedCapacity.toFixed(2) || 1);
    } else if (power.id === 2) {
      const price = Number(data);
      const useDay = Math.floor((item / 100) * 24) || 8;
      const useNight = ((100 - item) / 100) * 24;
      const cost = price;
      const rate = 5;
      const hoursPerDay = Number(useDay);
      const daysPerMonth = 30;

      const energyUsage = cost / rate;

      const installedCapacity = energyUsage / (hoursPerDay * daysPerMonth);

      setSizePower(installedCapacity.toFixed(2) || 1);
    } else {
      setSizePower(1);
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <>
      <form className="bg-white p-6 rounded-lg shadow-md">
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="success"
            onClose={() => setOpenSnackbar(false)}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
        <div className="flex items-center justify-center mx-auto">
          <Box
            sx={{ flexGrow: 1 }}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            mx={"auto"}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label={"ชื่อ"}
                        variant="outlined"
                        fullWidth
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        error={error && !fname}
                        helperText={error && !fname ? "ชื่อเป็นสิ่งจำเป็น" : ""}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label={"นามสกุล"}
                        variant="outlined"
                        fullWidth
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        error={error && !lname}
                        helperText={
                          error && !lname ? "นามสกุลเป็นสิ่งจำเป็น" : ""
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label={"เบอร์โทร"}
                  variant="outlined"
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  error={error && !phone}
                  helperText={error && !phone ? "เบอร์โทรเป็นสิ่งจำเป็น" : ""}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label={"อีเมล"}
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error && !email}
                  helperText={error && !email ? "อีเมลเป็นสิ่งจำเป็น" : ""}
                />
              </Grid>

              <Grid item xs={4}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={typeBuilding || []}
                  fullWidth
                  freeSolo
                  value={building || ""}
                  onChange={(event, newValue) => {
                    console.log("newValue", newValue);
                    setBuilding(newValue);
                  }}
                  getOptionLabel={(option) => option.name || ""}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="ประเภทอาคาร:"
                      error={error && !building}
                      helperText={
                        error && !building ? "ประเภทอาคารเป็นสิ่งจำเป็น" : ""
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label={"ที่อยู่(สถานที่ติดตั้ง)"}
                  variant="outlined"
                  fullWidth
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label={"Location(Link Google Maps) * :"}
                  variant="outlined"
                  fullWidth
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  error={error && !location}
                  helperText={
                    error && !location
                      ? "ค่าไฟเดือนล่าสุด(บาท)เป็นสิ่งจำเป็น"
                      : ""
                  }
                />
              </Grid>

              <Grid item xs={4}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={typePower || []}
                  fullWidth
                  value={power || ""}
                  freeSolo
                  onChange={(event, newValue) => {
                    setPower(newValue);
                  }}
                  getOptionLabel={(option) => option.name || ""}
                  renderInput={(params) => (
                    <TextField {...params} label="ระบบไฟ:" />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label={"ค่าไฟเดือนล่าสุด(บาท) * :"}
                  variant="outlined"
                  type="number"
                  fullWidth
                  required
                  value={pricePower || 0.0}
                  onChange={(e) => handleCalPower(e.target.value)}
                  error={error && !pricePower}
                  helperText={
                    error && !pricePower
                      ? "ค่าไฟเดือนล่าสุด(บาท)เป็นสิ่งจำเป็น"
                      : ""
                  }
                />
              </Grid>

              <Grid item xs={4}>
                <StyledTextField
                  id="outlined-basic"
                  variant="standard"
                  fullWidth
                  required
                  value={image.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <StyledButton variant="contained" component="label">
                          Choose File
                          <StyledInput
                            type="file"
                            hidden
                            onChange={handleFileChange}
                          />
                        </StyledButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={4}>
                {renderText({ label: "เปอร์เซ็นการใช้ไฟตอนกลางวัน" })}
                <Stack
                  spacing={2}
                  direction="row"
                  sx={{ mb: 1 }}
                  alignItems="center"
                >
                  <LightModeIcon className="text-orange-500" />
                  <Slider
                    aria-label="Volume"
                    value={percenPower}
                    onChange={handleChangePercenPower}
                  />

                  <DarkModeIcon />
                </Stack>
                <Typography variant="body1" component="h2">
                  <span className="text-orange-500">
                    {percenPower + " " + "%"}
                  </span>{" "}
                  : {100 - percenPower + " " + "%"}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={salasPower || []}
                  fullWidth
                  value={salePower || ""}
                  disabled={percenPower === 50}
                  onChange={(event, newValue) => {
                    setSalePower(newValue);
                  }}
                  getOptionLabel={(option) => option.name || ""}
                  renderInput={(params) => (
                    <TextField {...params} label="การขายไฟ:" />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label={"ขนาดที่ติดตั้ง(kW):"}
                  variant="outlined"
                  fullWidth
                  value={sizePower || "1"}
                  required
                  disabled
                />
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) =>
                            setContect(contect === true ? false : true)
                          }
                        />
                      }
                      label="ต้องการให้ทางทีมงานติดต่อเพื่อคุยรายละเอียดเพิ่มเติม"
                    />
                  </FormGroup>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button variant="contained" onClick={handleSubmit}>
                    ยืนยันข้อมูล
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </div>
      </form>
    </>
  );
}
