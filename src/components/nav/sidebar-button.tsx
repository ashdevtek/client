import { Button, ButtonProps } from "../ui/button";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface SidebarButtonProps extends ButtonProps {
  icon: LucideIcon;
  link?: string;
}
const SidebarButton = ({
  icon: Icon,
  children,
  link,
  ...props
}: SidebarButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg fill-foreground hover:border-2 hover:border-red-500 hover:text-red-600 dark:hover:text-white"
            asChild
          >
              {link ? <Link href={link}><Icon className="size-5" /></Link> : <Icon className="size-5" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={5}>
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarButton;
