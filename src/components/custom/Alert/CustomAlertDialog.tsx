import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type CustomAlertDialogProps = {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  onCancel?: () => void;
  CancelTitle?: string;
  AcceptTitle?: string;
  description: string;
  title: string;
};

function CustomAlertDialog({
  open,
  onClose,
  onAccept,
  onCancel,
  CancelTitle,
  AcceptTitle,
  description,
  title,
}: CustomAlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={() => onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onCancel) {
                onCancel();
              } else {
                onClose();
              }
            }}
          >
            {CancelTitle || "Cancelar"}
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAccept();
            }}
          >
            {AcceptTitle || "Aceptar"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomAlertDialog;
