const GridButton = ({ children, onClick }) => {
  return (
    <button
      className="bg-white text-black rounded-lg px-4 py-2 hover:bg-white/80"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default GridButton;
