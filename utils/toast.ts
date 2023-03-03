import { Toast } from "primereact/toast";

export const show = (
  toast: React.RefObject<Toast>,
  msg: string,
  type?: "info" | "success" | "warn" | "error" | undefined
) => {
  toast.current?.show({
    severity: type || "info",
    detail: msg,
  });
};
