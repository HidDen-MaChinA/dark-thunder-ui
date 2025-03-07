import { useState } from "react";

type ButtonProps = {
  width?: string
  inverted?: boolean
}

export default function Button(props: React.HTMLAttributes<HTMLButtonElement> & ButtonProps) {
  const { width, inverted} = props;
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [divStyle, setDivStyle] = useState<React.CSSProperties>({
    width: 0,
    height: 0,
    backgroundColor: inverted ? "white":"black",
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
    const x = e.pageX - target.offsetLeft;
    const y = e.pageY - target.offsetTop;
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
        backgroundColor: inverted ? "white" : "black",
        zIndex: "-1",
      });
    }, transitionDuration);
  };
  return (
    <button
      {...props}
      onClick={buttonClickEventHandler}
      onMouseMove={buttonHoverEventHandler}
      className={
        `
          rounded-xl p-3 overflow-hidden py-2
          ${inverted ? "text-black bg-white border-black focus:text-white focus:bg-black hover:text-white hover:bg-black" : "text-white focus:border-black hover:border-black bg-black hover:text-black focus:text-black focus:bg-white hover:bg-white"}
        transition-[500ms] relative border`
      }
      style={{
        width: width || "100%",
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
