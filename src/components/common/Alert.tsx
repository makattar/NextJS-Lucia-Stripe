import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface IAlertComponentProps {
  visible: boolean;
  variant: "destructive" | "default";
  title: string;
  description: string;
}

export default function AlertComponent({
  visible,
  variant,
  title,
  description
}: Readonly<IAlertComponentProps>) {
  return (
    <>
      {visible && (
        <Alert variant={variant}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{title}</AlertTitle>
          {description && <AlertDescription>{description}</AlertDescription>}
        </Alert>
      )}
    </>
  );
}
