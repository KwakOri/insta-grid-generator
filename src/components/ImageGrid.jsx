const ImageGrid = ({ imageUrls }) => {
  return (
    <div className=" grid grid-cols-3">
      {imageUrls.map((url, index) => (
        <div key={index} className="border border-white">
          <a href={url} download={`piece_${index + 1}.png`}>
            <img className="w-full" src={url} alt={`Piece ${index + 1}`} />
          </a>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
