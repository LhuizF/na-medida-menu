interface Props {
  options: IOptionDB[];
}
import { ButtonGroup, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const ListOptions: React.FC<Props> = ({ options }) => {
  return (
    <div className="flex flex-col gap-4">
      {options.map((option) => (
        <div
          key={option.id}
          className="bg-white p-2 rounded-md font-semibold drop-shadow-md"
        >
          <div>
            <div>
              <p className="text-black">{option.name}</p>
              <div className="flex">
                <p className="text-xs text-gray-600">
                  {option.code} {option.weight}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-green-400">R$ {option.price}</p>
              <ButtonGroup size="small" variant="contained">
                <IconButton size="small">
                  <DeleteForeverIcon color="primary" />
                </IconButton>
                <IconButton disabled>
                  <div className="text-black min-w-[18px] text-base">1</div>
                </IconButton>
                <IconButton size="small">
                  <AddIcon color="primary" />
                </IconButton>
              </ButtonGroup>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
