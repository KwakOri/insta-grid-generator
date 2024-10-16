import { saveAs } from "file-saver";
import JSZip from "jszip";
import { useState } from "react";
import GridButton from "./GridButton";
import ImageGrid from "./ImageGrid";
import ImageInput from "./ImageInput";

function ImageSplitter() {
  const [imageUrls, setImageUrls] = useState([]);
  const [isImage, setIsImage] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const width = img.width / 3;
        const height = img.height / 3;
        const urls = [];

        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(
              img,
              col * width,
              row * height,
              width,
              height,
              0,
              0,
              width,
              height
            );

            const imgUrl = canvas.toDataURL("image/png");
            urls.push(imgUrl);
          }
        }

        setImageUrls(urls);
        setIsImage(true);
      };
    };

    reader.readAsDataURL(file);
  };

  const downloadAllImages = () => {
    const zip = new JSZip();
    imageUrls.forEach((url, index) => {
      const imgData = url.split(",")[1]; // Base64 데이터 추출
      zip.file(`piece_${index + 1}.png`, imgData, { base64: true });
    });

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "images.zip");
    });
  };

  return (
    <div className=" w-1/2 flex flex-col justify-center items-center">
      {isImage ? (
        <>
          <ImageGrid imageUrls={imageUrls} />
          <div className="w-full flex justify-between text-white my-4">
            <GridButton onClick={downloadAllImages}>
              한 번에 다운받기
            </GridButton>
            <GridButton onClick={() => setIsImage(false)}>뒤로가기</GridButton>
          </div>
        </>
      ) : (
        <ImageInput handleImageUpload={handleImageUpload} />
      )}
    </div>
  );
}

export default ImageSplitter;
