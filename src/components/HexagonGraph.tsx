import { useEffect, useRef } from "react"
import styles from "./HexagonGraph.module.scss"

type HexagonGraphKeys = "top" | "topRight" | "bottomRight" | "bottom" | "bottomLeft" | "topLeft" | "max"
type HexagonGraphKeysValue = {
  [key in HexagonGraphKeys]: number;
}
interface HexagonGraph {
  data: HexagonGraphKeysValue
}

type Axis = "x" | "y"

export default function HexagonGraph({data}:HexagonGraph){

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current

    if(!canvas) return;

    const ctx = canvas.getContext("2d")
    if(!ctx) return

    const {top, topRight, bottomRight, bottom, bottomLeft, topLeft} = data
    const {max} = data

    const size = (canvas.clientWidth >= canvas.clientHeight) ? canvas.clientWidth : canvas.clientHeight

    const imgWidth = size
    const imgHeight = size
    const gap = imgWidth * (13.4792 / 100)
    const imgWidthCalc = imgWidth - gap

    canvas.width = size
    canvas.height = size

    ctx.clearRect(0,0,imgWidth, imgHeight)

    ctx.beginPath()
    ctx.moveTo(topFormula("x"), topFormula("y"))
    ctx.lineTo(topRightFormula("x"), topRightFormula("y"))
    ctx.lineTo(bottomRightFormula("x"), bottomRightFormula("y"))
    ctx.lineTo(bottomFormula("x"), bottomFormula("y"))
    ctx.lineTo(bottomLeftFormula("x"), bottomLeftFormula("y"))
    ctx.lineTo(topLeftFormula("x"), topLeftFormula("y"))
    ctx.closePath()
    ctx.stroke()
    ctx.fillStyle = "blue"
    ctx.fill()

    
    function topFormula(axis:Axis) {
      let result;
      if (axis === "x") {
        result = vertical(axis, top);
      } else {
        result = imgHeight / 2 - vertical(axis, top);
      }
      return result;
    }
    function bottomFormula(axis:Axis) {
      let result;
      if (axis === "x") {
        result = vertical(axis, bottom);
      } else {
        result = imgHeight / 2 + vertical(axis, bottom);
      }
      return result;
    }
    function topRightFormula(axis:Axis) {
      let result;
      if (axis === "x") {
        result = imgWidthCalc / 2 + diagonal(axis, topRight) + gap / 2;
      } else {
        result = imgHeight / 2 - diagonal(axis, topRight);
      }
      return result;
    }
    function topLeftFormula(axis:Axis) {
      let result;
      if (axis === "x") {
        result = imgWidthCalc / 2 - diagonal(axis, topLeft) + gap / 2;
      } else {
        result = imgHeight / 2 - diagonal(axis, topLeft);
      }
      return result;
    }
    function bottomRightFormula(axis:Axis) {
      let result;
      if (axis === "x") {
        result = imgWidthCalc / 2 + diagonal(axis, bottomRight) + gap / 2;
      } else {
        result = imgHeight / 2 + diagonal(axis, bottomRight);
      }
      return result;
    }
    function bottomLeftFormula(axis:Axis) {
      let result;
      if (axis === "x") {
        result = imgWidthCalc / 2 - diagonal(axis, bottomLeft) + gap / 2;
      } else {
        result = imgHeight / 2 + diagonal(axis, bottomLeft);
      }
      return result;
    }
    function diagonal(axis:Axis, val:number) {
      let result;
      // console.log(axis, val);
      if (axis === "x") {
        result = ((((val / max) * 100) / 100) * imgWidthCalc) / 2;
      } else {
        result = (((val / max) * 100) / 100) * (imgHeight / 4);
      }
      return result;
    }
    function vertical(axis:Axis, val:number) {
      let result;
      if (axis === "x") {
        result = imgWidth / 2;
      } else {
        result = (((val / max) * 100) / 100) * (imgHeight / 2);
      }
      return result;
    }
  })
  return <>
    <div className={styles.body}>
      <img
        className={styles.lowerIcon}
        src="images/misc/graphs/hexagon.svg"
        alt="Hexagon Stat"
      />
      <canvas className={styles.canvas} ref={canvasRef}/>
    </div>
  </>
}