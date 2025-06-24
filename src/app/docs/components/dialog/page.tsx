import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";

const DialogPage = () => (
  <main>
    <Dialog>
      <DialogTrigger>Open Dialog</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose>Close</DialogClose>
          <DialogClose>Cool</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </main>
);

export default DialogPage;
