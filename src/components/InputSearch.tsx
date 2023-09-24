import {
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { red } from "@mui/material/colors";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const InputSearch: React.FC<Props> = ({ value, onChange }) => {
  const handleCleanInput = () => {
    onChange("");
  };

  return (
    <FormControl sx={{ width: "100%" }} variant="outlined">
      <InputLabel>Buscar</InputLabel>
      <OutlinedInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        endAdornment={
          <InputAdornment onClick={handleCleanInput} position="end">
            <IconButton edge="end">
              {!!value && <HighlightOffIcon sx={{ color: red[700] }} />}
            </IconButton>
          </InputAdornment>
        }
        label="Buscar"
      />
    </FormControl>
  );
};
