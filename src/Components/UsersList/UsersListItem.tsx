export type buttonInfo = {
  bgColor?: string;
  text: {
    value: string;
    color: string;
  };
  clickEventHandler: React.MouseEventHandler<HTMLButtonElement>;
};
type UsersListItemPropstype= {
  buttons?: buttonInfo[];
  name: string;
  img?: string;
};

export function UsersListItem(props: UsersListItemPropstype) {
  const { name, buttons, img } = props;
  return (
    <div className="flex items-center px-2 py-2 rounded-lg hover:bg-gray-100">
      <div className="relative w-[45px] h-[45px] rounded-full border">
        <img src={img} className="w-full h-full rounded-full" alt="" />
      </div>
      <div
        style={{ flex: "1 1 0" }}
        className="px-2 text-[#0f0f0f] text-ellipsis whitespace-nowrap overflow-hidden"
      >
        {name}
      </div>
      <div>
        {buttons &&
          buttons.map((button, index) => (
            <button
              key={button.text.value + index}
              onClick={button.clickEventHandler}
              className="px-3 py-2 rounded-xl"
              style={{
                color: button.text.color,
                backgroundColor: button.bgColor,
              }}
            >
              {button.text.value}
            </button>
          ))}
      </div>
    </div>
  );
}