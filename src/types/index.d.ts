/* eslint-disable @typescript-eslint/no-explicit-any */
type RouteType = {
  path: string;
  element: any;
};

type ButtonProps = {
  icon?: any;
  className?: string;
  content: string;
  onClick: function;
  disabled?: boolean;
};
