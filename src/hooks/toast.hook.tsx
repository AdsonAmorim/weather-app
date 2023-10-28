import { useToast as useToastNativeBase } from "native-base";
import { ReactNode } from "react";

export function useToast() {
  const toast = useToastNativeBase();

  const show = (data: ReactNode) => {
    toast.show({
      placement: "bottom",
      height: "full",
      width: "full",
      render: () => <>{data}</>,
    });
  };

  return { show };
}
