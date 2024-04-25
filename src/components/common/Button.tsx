import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface IButtonComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  variant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

export default function ButtonComponent({
  variant = "default",
  children,
  loading,
  ...props
}: Readonly<IButtonComponentProps>) {
  return (
    <Button variant={variant} {...props} disabled={props.disabled || loading}>
      <span className="flex items-center justify-center gap-1">
        {loading && <Loader2 size={16} className="animate-spin" />}
        {children}
      </span>
    </Button>
  );
}
