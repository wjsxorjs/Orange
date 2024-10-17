import { IconButton, Typography } from "@mui/joy";
import { ImageListItem } from "@mui/material";
import { useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";

let dragIdx;
export default function ImageDragComponent({ previewImages, setPreviewImages }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const draggables = container.querySelectorAll(".draggable");

      const handleDragStart = (draggable) => () => {
        draggable.classList.add("dragging");
        dragIdx = Array.prototype.indexOf.call(container.children, draggable) - 1;
      };

      const handleDragEnd = (draggable) => (e) => {
        draggable.classList.remove("dragging");

        const afterElement = getDragAfterElement(container, e.clientX);
        let toIndex;
        if (afterElement == null || afterElement === undefined) {
          toIndex = container.children.length - 2;
        } else {
          toIndex = Array.prototype.indexOf.call(container.children, afterElement);
          if (dragIdx >= toIndex) toIndex -= 1;
          else toIndex -= 2;
        }

        if (toIndex !== -1) {
          let tmpImages = [...previewImages];
          // 순서 변경 로직
          const [movedItem] = tmpImages.splice(dragIdx, 1);
          tmpImages.splice(toIndex, 0, movedItem);

          //각 이미지의 id 값을 다시 설정
          tmpImages.forEach((img, index) => {
            img.id = index;
          });

          setPreviewImages(tmpImages);
        }
      };

      const handleDragOver = (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientX);
        const draggable = document.querySelector(".dragging");
        if (afterElement == null) {
          container.appendChild(draggable);
        } else {
          container.insertBefore(draggable, afterElement);
        }
      };

      draggables.forEach((draggable) => {
        // 드래그 이벤트 리스너 추가 (한 번만 추가되도록 함)
        draggable.addEventListener("dragstart", handleDragStart(draggable));
        draggable.addEventListener("dragend", handleDragEnd(draggable));
      });

      container.addEventListener("dragover", handleDragOver);

      return () => {
        // 이벤트 리스너 제거
        draggables.forEach((draggable) => {
          draggable.removeEventListener("dragstart", handleDragStart(draggable));
          draggable.removeEventListener("dragend", handleDragEnd(draggable));
        });
        container.removeEventListener("dragover", handleDragOver);
      };
    }
  }, [previewImages, setPreviewImages]); // 의존성에 previewImages 추가

  function getDragAfterElement(container, x) {
    const draggableElements = [
      ...container.querySelectorAll(".draggable:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  return (
    <div id="dragImageList" ref={containerRef}>

    
    {previewImages.map((img, i) => (
        <ImageListItem
        key={i}
        style={{
            width: 100,
            height: 100,
            border: "2px solid #ccc", // 이미지에 보더 추가
            position: "relative",
        }}
        draggable="true"
        className="draggable"
        >
        <IconButton
            aria-label="delete"
            onClick={() => handleDelete(i)}
            style={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            padding: 2,
            zIndex: 10,
            }}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
        <img
            src={img.src}
            alt={`Uploaded Preview ${i}`}
            loading="lazy"
            style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            }}
        />
        {i === 0 && (
            <Typography
            variant="caption"
            style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                textAlign: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                padding: "2px 0",
            }}
            >
            대표 사진
            </Typography>
        )}
        </ImageListItem>
    ))}
    </div>
  );
}