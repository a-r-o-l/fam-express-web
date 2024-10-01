import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

function ImageModal({ imageUrl = "", open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-[900px]">
        <DialogTitle>Recibo</DialogTitle>
        <div className="flex justify-center items-center flex-col rounded-2xl">
          <AspectRatio ratio={16 / 14} className="rounded-2xl">
            <img
              src={imageUrl}
              className="rounded-2xl object-contain h-full w-full"
            />
          </AspectRatio>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ImageModal;
