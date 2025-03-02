import { useState } from "react";

type ButtonProps = {
  effectColor?: string
  color?: string
  textcolor?: string
  width?: string
}

export default function Button(props: React.HTMLAttributes<HTMLButtonElement> & ButtonProps) {
  const { effectColor, width, color, textcolor} = props;
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [divStyle, setDivStyle] = useState<React.CSSProperties>({
    width: 0,
    height: 0,
    backgroundColor: effectColor || "black",
    zIndex: "-1",
  });
  const buttonClickEventHandler = () => {
    console.log(clickPosition);
    expandDiv(700);
  };

  const buttonHoverEventHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement;
    const x = e.clientX - target.offsetLeft;
    const y = e.clientY - target.offsetTop;
    if (!(x > target.offsetLeft || y > target.offsetTop)) {
      setClickPosition({ x: x, y: y });
    }
    console.log(clickPosition);
  };
  const expandDiv = (transitionDuration: number) => {
    const style: React.CSSProperties = {
      width: "200px",
      height: "200px",
      top: clickPosition.y,
      left: clickPosition.x,
      transitionDuration: transitionDuration + "ms",
    };
    setDivStyle(style);
    setTimeout(() => {
      setDivStyle({
        width: 0,
        height: 0,
        backgroundColor: effectColor || "black",
        zIndex: "-1",
      });
    }, transitionDuration);
  };
  return (
    <button
      {...props}
      onClick={buttonClickEventHandler}
      onMouseMove={buttonHoverEventHandler}
      className="rounded-lg p-3 overflow-hidden my-6 py-2 text-white focus:bg-white focus:text-black hover:text-black bg-black hover:bg-transparent transition-[500ms] relative border-2 border-black"
      style={{
        width: width || "100%"
      }}
    >
      <div
        className="absolute rounded-[50%] z-[10]"
        style={{ ...divStyle, transform: "translate(-50%, -50%)" }}
      ></div>
      {props.children}
    </button>
  );
}
