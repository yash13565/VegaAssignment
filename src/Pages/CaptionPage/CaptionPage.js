import React, { useRef, useEffect } from 'react';
import style from '../SearchPage/SearchPage.module.css';
import { FaClosedCaptioning } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { fabric } from 'fabric';

function CaptionPage() {
  const { state } = useLocation();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      preserveObjectStacking: true,
    });

    fabric.Image.fromURL(state, (img) => {
      img.scaleToWidth(canvas.width);
      img.scaleToHeight(canvas.height);
      canvas.add(img);
    });

    const addShape = (shapeType) => {
      let shape;

      switch (shapeType) {
        case 'triangle':
          shape = new fabric.Triangle({
            width: 100,
            height: 100,
            fill: 'red',
            left: 10,
            top: 10,
          });
          break;
        case 'circle':
          shape = new fabric.Circle({
            radius: 50,
            fill: 'blue',
            left: 10,
            top: 10,
          });
          break;
        case 'rectangle':
          shape = new fabric.Rect({
            width: 100,
            height: 100,
            fill: 'green',
            left: 10,
            top: 10,
          });
          break;
        case 'polygon':
          shape = new fabric.Polygon(
            [
              { x: 50, y: 0 },
              { x: 100, y: 100 },
              { x: 0, y: 100 },
            ],
            {
              fill: 'orange',
              left: 10,
              top: 10,
            }
          );
          break;
        default:
          return;
      }

      canvas.add(shape);
    };

    const handleAddShape = (shapeType) => {
      addShape(shapeType);
    };

    const handleAddCaption = () => {
      const text = new fabric.Textbox('Caption', {
        fontSize: 20,
        left: 10,
        top: 10,
      });

      canvas.add(text);
    };

    const addEventListeners = () => {
      document
        .getElementById('addCaptionButton')
        ?.addEventListener('click', handleAddCaption);
  
      document
        .getElementById('addTriangleButton')
        ?.addEventListener('click', () => handleAddShape('triangle'));
  
      document
        .getElementById('addCircleButton')
        ?.addEventListener('click', () => handleAddShape('circle'));
  
      document
        .getElementById('addRectangleButton')
        ?.addEventListener('click', () => handleAddShape('rectangle'));
  
      document
        .getElementById('addPolygonButton')
        ?.addEventListener('click', () => handleAddShape('polygon'));
    };
  
    const removeEventListeners = () => {
      document
        .getElementById('addCaptionButton')
        ?.removeEventListener('click', handleAddCaption);
  
      document
        .getElementById('addTriangleButton')
        ?.removeEventListener('click', () => handleAddShape('triangle'));
  
      document
        .getElementById('addCircleButton')
        ?.removeEventListener('click', () => handleAddShape('circle'));
  
      document
        .getElementById('addRectangleButton')
        ?.removeEventListener('click', () => handleAddShape('rectangle'));
  
      document
        .getElementById('addPolygonButton')
        ?.removeEventListener('click', () => handleAddShape('polygon'));
    };
  
    addEventListeners();
  
    return removeEventListeners;
  }, [state]);

  // const saveImageToLocal = () => {
  //   const link = document.createElement('a');
  //   link.download = 'canvas.png';
  //   link.href = canvasRef.current.toDataURL('image/png');
  //   link.click();
  // };

  return (
    <div>
      <div className={style.header}>
        <p>
          <FaClosedCaptioning className={style.icons} />
          captioner
        </p>
        <p>caption Your Images</p>
      </div>

      <div className={style.myImage}>
        <canvas ref={canvasRef} className={style.canvas} />
      </div>
      <div className={style.btncont}>
        <button id="addCaptionButton" className={style.btn2}>
          Add Caption
        </button>
        <button id="addTriangleButton" className={style.btn2}>
          Add Triangle
        </button>
        <button id="addCircleButton" className={style.btn2}>
          Add Circle
        </button>
        <button id="addRectangleButton" className={style.btn2}>
          Add Rectangle
        </button>
        <button id="addPolygonButton" className={style.btn2}>
          Add Polygon
        </button>
        <button className={style.btn2} onClick={() => window.print()}>
          Download
        </button>
      </div>
    </div>
  );
}

export default CaptionPage;
