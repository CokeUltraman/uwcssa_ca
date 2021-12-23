import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import GoogleMaps, { GetAddress } from "../GoogleMap/GoogleMapsPlace";
import React, { useState } from "react";

import GoogleMap from "../GoogleMap/GoogleMap";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
//import Marker from "../GoogleMap/Marker";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

function ConfirmationDialogRaw(props) {
  const {
    onClose,
    value: valueProp,
    open,
    setAddressInfo,
    setSearchRadius,
    ...other
  } = props;
  // const [newLocationInfo, setNewLocationInfo] = useState("");
  const [newLocationRadius, setNewLocationRadius] = useState(5);
  //const [clicked, setClicked] = React.useState(null);
  const windsor = [42.2732, -83.0014];
  // console.log(newLocationInfo);
  // React.useEffect(() => {
  //   if (!open) {
  //     setNewLocationInfo(valueProp);
  //   }
  // }, [valueProp, open]);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "250px",
    backgroundColor: "rgb(243, 246, 249)",
    marginBottom: "1rem",
  }));

  const handleCancel = () => {
    onClose();
  };

  const handleOk = async () => {
    const address = await GetAddress();
    setAddressInfo(address);
    setSearchRadius(newLocationRadius);
    if (address !== undefined) {
      onClose(`${address.description} within ${newLocationRadius}km`);
    }
  };

  const handleRadiusChange = (e) => {
    setNewLocationRadius(e.target.value);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "100%", maxHeight: 600 } }}
      maxWidth="xs"
      // TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>位置</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ marginBottom: "1rem" }}>
          <Typography variant="caption">根据地址，邮编搜索</Typography>
        </Box>

        {/* <TextField
          sx={{ marginY: "1rem" }}
          id="input-with-icon-textfield"
          label="地址"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          onChange={handleLocationChange}
          variant="outlined"
        /> */}
        <GoogleMaps />
        <TextField
          sx={{ marginBottom: "1rem" }}
          id="input-with-icon-textfield"
          label="半径 [km]"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationSearchingIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          onChange={handleRadiusChange}
          variant="outlined"
        />
        <Item>
          <GoogleMap
            defaultZoom={11}
            center={windsor}
            circleRadius={newLocationRadius * 1000}
          />
        </Item>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          关闭
        </Button>
        <Button onClick={handleOk}>确认</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default function ConfirmationDialog({
  setAddressInfo,
  setSearchRadius,
  type = "plain",
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("位置");

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  if (type === "plain") {
    return (
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <List component="div" role="group">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="ringtone-menu"
            aria-label="phone ringtone"
            onClick={handleClickListItem}
          >
            <ListItemText primary="当前搜索区域" secondary={value} />
          </ListItem>
          <ConfirmationDialogRaw
            setAddressInfo={setAddressInfo}
            setSearchRadius={setSearchRadius}
            id="ringtone-menu"
            keepMounted
            open={open}
            onClose={handleClose}
            value={value}
          />
        </List>
      </Box>
    );
  } else if (type === "button") {
    return (
      <React.Fragment>
        <Button
          variant="outlined"
          startIcon={<LocationOnIcon />}
          onClick={handleClickListItem}
        >
          {value}
        </Button>
        <ConfirmationDialogRaw
          setAddressInfo={setAddressInfo}
          setSearchRadius={setSearchRadius}
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
      </React.Fragment>
    );
  }
}
