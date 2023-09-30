import {
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Badge,
} from "@mui/material";
import { HighlightOff, ShoppingBag, ShoppingCart } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { useCart } from "../contexts/cart";
import Link from "next/link";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const Header: React.FC<Props> = ({ value, onChange }) => {
  const { getTotalItems } = useCart();

  const handleCleanInput = () => {
    onChange("");
  };

  return (
    <div className="sticky flex w-full top-0 left-0 z-10 py-2 px-5 bg-secondary drop-shadow-lg gap-2">
      <FormControl sx={{ width: "100%" }} size="small" variant="outlined">
        <InputLabel>Buscar</InputLabel>
        <OutlinedInput
          value={value}
          onChange={(e) => onChange(e.target.value)}
          color="primary"
          endAdornment={
            <InputAdornment onClick={handleCleanInput} position="end">
              <IconButton edge="end">
                {!!value && <HighlightOff sx={{ color: red[700] }} />}
              </IconButton>
            </InputAdornment>
          }
          label="Buscar"
        />
      </FormControl>
      <Link href="/cart">
        <IconButton>
          <Badge color="primary" badgeContent={getTotalItems()}>
            <ShoppingCart color="action" />
          </Badge>
        </IconButton>
      </Link>
    </div>
  );
};
