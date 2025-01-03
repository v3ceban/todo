import { cn } from "~/lib/utils";

const ErrorMessage = ({
  message,
  condition,
  className,
  ...props
}: {
  message: string | null;
  condition: boolean;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        `text-sm text-red-500 ${condition ? "opacity-100" : "opacity-0"} transition-opacity duration-200`,
        className,
      )}
      {...props}
    >
      {message}
    </p>
  );
};

export default ErrorMessage;
