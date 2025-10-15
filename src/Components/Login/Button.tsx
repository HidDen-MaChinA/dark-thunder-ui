import { useState } from "react";

type ButtonProps = {
  width?: string;
  inverted?: boolean;
};

export default function Button(
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    ButtonProps = {
      inverted:false
    }
) {
  const { width, inverted } = props;
  const [divStyle, setDivStyle] = useState<React.CSSProperties>({
    width: 0,
    height: 0,
    transform: "translate(-50%, -50%)",
    backgroundColor: inverted ? "white" : "black",
    zIndex: "-1",
  });
  const buttonClickEventHandler = () => {
    expandDiv(700);
  };

  const expandDiv = (transitionDuration: number) => {
    const style: React.CSSProperties = {
      width: "200px",
      height: "200px",
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
      {...{...props, inverted: undefined}}
      onClick={(e)=>{
        buttonClickEventHandler()
        props.onClick && props.onClick(e);
      }}
      className={`
        rounded-xl p-3 overflow-hidden py-2 relative
        ${inverted ? "text-black bg-white border-black focus:text-white focus:bg-gray-800 hover:text-white hover:bg-gray-800" : "text-white focus:border-black hover:border-black bg-gray-800 hover:text-black focus:text-black focus:bg-white hover:bg-white"}
        transition-[500ms] relative border
      `}
      style={{
        width: width || "100%",
      }}
    >
      <div
        className="absolute rounded-[50%] z-[10]"
        style={{ ...divStyle }}
      ></div>
      {props.children}
    </button>
  );
}
