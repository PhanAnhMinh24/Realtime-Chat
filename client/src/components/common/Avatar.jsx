import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FcCamera } from "react-icons/fc";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import PhotoLibrary from "./PhotoLibrary";
import CapturePhoto from "./CapturePhoto";

function Avatar({type, image, setImage}) {
  const [hover, setHover] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCordinates, setContextMenuCordinates] = useState({
    x:0,
    y:0,
  });

  const [grabPhoto, setGrabPhoto] = useState(false);
  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);
  const [showCapturePhoto, setShowCapturePhoto] = useState(false);

  const showContextMenu = (e) => {
    e.preventDefault();
    setContextMenuCordinates({ x:e.pageX, y:e.pageY });
    setIsContextMenuVisible(true);
  };

  //Mở cửa sổ tải ảnh từ máy cục bố
  useEffect (() => {
    if(grabPhoto) {
      const data = document.getElementById("photo-picker");
      data.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGrabPhoto(false);
        }, 1000);
      }
    }
  },[grabPhoto]);

  //Menu thiết lập avatar
  const contextMenuOptions = [
    {name: "Chụp ảnh",
      callback:() => {
        setShowCapturePhoto(true);
      }
    },
    {name: "Chọn ảnh từ thư viện", 
      callback:() => {
        setShowPhotoLibrary(true);
      }
    },
    {name: "Tải ảnh lên",
      callback:() => {
        setGrabPhoto(true);
      } 
    },
    {name: "Xóa ảnh", 
      callback:() => {
        setImage("/default_avater.png");
      } 
    },
  ];

  //Lấy ảnh đã chọn tải lên từ máy cục bộ
  const photoPickerChange = async (e) => {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    console.log({file});
    const data = document.createElement("img");
    reader.onload = function(event) {
      data.src = event.target.result;
      data.setAttribute("data-src", event.target.result);
    };
    reader.readAsDataURL(file);
    setTimeout(() => {
      console.log(data.src);
      setImage(data.src);
    }, 100);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        {type==="sm" && (
          <div className="relative h-10 w-10">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}
        {type==="lg" && (
          <div className="relative h-14 w-14">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}
        {type==="xl" && (
          <div className="relative cursor-pointer z-0"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div className={`z-10 bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 flex items-center rounded-full justify-center flex-xol text-center gap-2
                ${hover ? "visited" : "hidden"}
              `}
              onClick={(e)=>showContextMenu(e)}
              id="context-opener"
            >
              <FcCamera className="text-2xl" id="context-opener" onClick={(e)=>showContextMenu(e)} />
              <span onClick={(e)=>showContextMenu(e)} id="context-opener" >Thay đổi avatar</span>
            </div>
            <div className="flex items-center justify-center h-60 w-60" >
              <Image src={image} alt="avatar" className="rounded-full" fill />
            </div>
          </div>
        )}
      </div>

      {isContextMenuVisible && (<ContextMenu
        options={contextMenuOptions}
        cordinates={contextMenuCordinates}
        contextMenu={isContextMenuVisible}
        setContextMenu={setIsContextMenuVisible}
        />
      )}

      {showCapturePhoto && 
        <CapturePhoto setImage={setImage}
        hide={setShowCapturePhoto} />
      }

      {showPhotoLibrary && (
        <PhotoLibrary setImage={setImage}
        hidePhotoLibrary={setShowPhotoLibrary} />
      )}

      {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
    </>
  );
}

export default Avatar;
