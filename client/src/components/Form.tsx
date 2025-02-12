import React from "react";

export default function Form({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}): JSX.Element {
  return (
    <form action="" onSubmit={onSubmit} className="flex flex-col gap-2 items-start ">
      {children}
    </form>
  );
}
