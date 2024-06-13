import React from "react";
import TextField from "@mui/material/TextField";
import { Box, Grid } from "@mui/material";

export default function Inputfrom() {
  return (
    <>
      <form className="bg-white p-6 rounded-lg shadow-md">
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
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label={"นามสกุล"}
                        variant="outlined"
                        fullWidth
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
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label={"อีเมล"}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </div>
      </form>
    </>
  );
}
