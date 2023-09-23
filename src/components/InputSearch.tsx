"use client";
import { useState } from "react";
import {
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { red } from "@mui/material/colors";

export const InputSearch: React.FC = () => {
  const [search, setSearch] = useState("");

  const handleCleanInput = () => {
    setSearch("");
  };

  return (
    <FormControl sx={{ width: "100%" }} variant="outlined">
      <InputLabel>Buscar</InputLabel>
      <OutlinedInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        endAdornment={
          <InputAdornment onClick={handleCleanInput} position="end">
            <IconButton edge="end">
              {!!search && <HighlightOffIcon sx={{ color: red[700] }} />}
            </IconButton>
          </InputAdornment>
        }
        label="Buscar"
      />
    </FormControl>
  );
};
