import React from "react";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface CancellationDialogProps {
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}

const CancellationDialog = ({
  isOpen = true,
  onClose = () => {},
  onConfirm = () => {},
}: CancellationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-[300px] rounded-lg">
        <DialogHeader className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <DialogTitle className="text-xl font-bold text-center">
            Cancel Request?
          </DialogTitle>
          <DialogDescription className="text-center mt-2">
            Are you sure you want to cancel your emergency request? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button variant="outline" className="w-full" onClick={onClose}>
            No, Keep Request
          </Button>
          <Button variant="destructive" className="w-full" onClick={onConfirm}>
            Yes, Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancellationDialog;
