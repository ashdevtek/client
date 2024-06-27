import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import React, { ButtonHTMLAttributes } from "react";
  
  interface GenericDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
    trigger?: React.ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>;
    children: React.ReactNode;
  }
  
  const GenericDialog: React.FC<GenericDialogProps> = ({
    open,
    onOpenChange,
    title,
    description,
    trigger,
    children,
  }) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        {trigger && (
          <DialogTrigger asChild>
            <div onClick={() => onOpenChange(true)} style={{ display: 'inline-block' }}>
              {React.cloneElement(trigger)}
            </div>
          </DialogTrigger>
        )}
  
        <DialogContent className="sm:max-w-[425px]" aria-labelledby="dialog-title">
          <DialogHeader>
            <DialogTitle id="dialog-title">{title}</DialogTitle>
          </DialogHeader>
          {description && <DialogDescription>{description}</DialogDescription>}
          {children}
        </DialogContent>
      </Dialog>
    );
  };
  
  export default GenericDialog;
  