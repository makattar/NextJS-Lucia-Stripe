import { useState } from "react";

interface IAlertProps {
  visible: boolean;
  variant: "destructive" | "default";
  title: string;
  description: string;
}
export default function useAlert(): {
  alert: IAlertProps;
  showAlert: (input: Partial<IAlertProps>) => void;
  hideAlert: () => void;
} {
  const [alert, setAlert] = useState<IAlertProps>({
    visible: false,
    variant: "default",
    title: "",
    description: ""
  });

  const showAlert = (input: Partial<IAlertProps>) => {
    setAlert({ ...alert, ...input, visible: true });
  };

  const hideAlert = () => {
    setAlert({ ...alert, visible: false });
  };

  return { alert, showAlert, hideAlert };
}
