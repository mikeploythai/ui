import fs from "node:fs/promises";
import path from "node:path";
import { Suspense } from "react";
import CopyCodeButton from "@/components/copy-code-button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DialogPage = () => (
  <main className="space-y-6 p-6">
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

    <Suspense fallback={<div>Loading code...</div>}>
      <DialogCode />
    </Suspense>
  </main>
);

const DialogCode = async () => {
  const filePath = path.join(process.cwd(), "src/components/ui/dialog.tsx");
  const [code, stats] = await Promise.all([
    fs.readFile(filePath, "utf-8"),
    fs.stat(filePath),
  ]);

  const lastModified = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(stats.mtime);

  return (
    <div className="space-y-2">
      <p className="text-muted-foreground text-sm">
        Last modified: {lastModified}
      </p>

      <CopyCodeButton code={code} />

      <pre className="text-sm">{code}</pre>
    </div>
  );
};

export default DialogPage;
