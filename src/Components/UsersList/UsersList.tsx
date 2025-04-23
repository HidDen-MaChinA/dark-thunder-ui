import React from "react";

type UsersListPropsType = {
  maxHeight?: number;
  children?: React.ReactNode;
};
export function UsersList(props: UsersListPropsType) {
  const { children, maxHeight } = props;
  return (
    <div
      style={{ flex: "1 1 0" }}
      className="rounded-lg relative overflow-auto flex-wrap border p-2"
    >
      {children}
    </div>
  );
}
