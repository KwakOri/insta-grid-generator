const ImageInput = ({ handleImageUpload }) => {
  return (
    <>
      <label
        className="w-80 h-40 border border-white flex justify-center items-center border-dashed rounded-lg font-light cursor-pointer hover:bg-white/5"
        htmlFor="image"
      >
        <p className="text-white">이미지를 넣어주세요</p>
      </label>
      <input
        className="hidden"
        id="image"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
    </>
  );
};

export default ImageInput;
