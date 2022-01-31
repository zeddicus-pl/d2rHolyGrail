import React from "react";

type Props = {
  valueStart: number,
  valueEnd: number,
  // eslint-disable-next-line no-undef
  children: (value: number) => JSX.Element,
}

export function ProgressProvider({ valueStart, valueEnd, children }: Props) {
  const [value, setValue] = React.useState(valueStart);
  React.useEffect(() => {
    setValue(valueEnd);
  }, [valueEnd]);

  return children(value);
};
