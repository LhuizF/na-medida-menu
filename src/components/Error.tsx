import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-secondary">
      <div className="flex flex-col items-center gap-3">
        <p className="text-black font-semibold text-xl text-center">
          Algo deu errado
        </p>
        <ErrorOutlineIcon fontSize="large" color="error" />

        <button
          className="text-white font-semibold bg-primary w-fit px-8 py-2 rounded-lg"
          onClick={() => window.location.reload()}
        >
          Recarregar página
        </button>
      </div>
    </div>
  );
};
