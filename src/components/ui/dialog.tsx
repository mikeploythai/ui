/**
 * NOT DONE
 */

"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui-components/react/alert-dialog";
import { Dialog as NormalDialogPrimitive } from "@base-ui-components/react/dialog";
import { X } from "lucide-react";
import { createContext, useContext } from "react";

import { cx } from "@/lib/cva";

type DialogContextProps = {
  isAlert: boolean;
  Primitive: typeof NormalDialogPrimitive | typeof AlertDialogPrimitive;
};

const DialogContext = createContext<DialogContextProps | null>(null);

const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context)
    throw new Error("useDialogContext must be used within a DialogProvider");
  return context;
};

type DialogProps = {
  isAlert?: boolean;
} & (
  | React.ComponentProps<typeof NormalDialogPrimitive.Root>
  | React.ComponentProps<typeof AlertDialogPrimitive.Root>
);

const Dialog = ({ isAlert = false, ...props }: DialogProps) => {
  const Primitive = isAlert ? AlertDialogPrimitive : NormalDialogPrimitive;

  return (
    <DialogContext.Provider value={{ isAlert, Primitive }}>
      <Primitive.Root data-component="dialog" {...props} />
    </DialogContext.Provider>
  );
};

type DialogTriggerProps =
  | React.ComponentProps<typeof NormalDialogPrimitive.Trigger>
  | React.ComponentProps<typeof AlertDialogPrimitive.Trigger>;

const DialogTrigger = (props: DialogTriggerProps) => {
  const { Primitive } = useDialogContext();
  return <Primitive.Trigger data-component="dialog-trigger" {...props} />;
};

type DialogCloseProps =
  | React.ComponentProps<typeof NormalDialogPrimitive.Close>
  | React.ComponentProps<typeof AlertDialogPrimitive.Close>;

const DialogClose = (props: DialogCloseProps) => {
  const { Primitive } = useDialogContext();
  return <Primitive.Close data-component="dialog-close" {...props} />;
};

type DialogContentProps = {
  backdrop?:
    | React.ComponentProps<typeof NormalDialogPrimitive.Backdrop>
    | React.ComponentProps<typeof AlertDialogPrimitive.Backdrop>;
} & (
  | React.ComponentProps<typeof NormalDialogPrimitive.Popup>
  | React.ComponentProps<typeof AlertDialogPrimitive.Popup>
);

const DialogContent = ({
  backdrop: { className: backdropClassName, ...backdropProps } = {},
  className,
  style,
  ...props
}: DialogContentProps) => {
  const { Primitive } = useDialogContext();

  return (
    <Primitive.Portal>
      <Primitive.Backdrop
        className={cx(
          "fixed inset-0 z-50 grid place-items-center bg-black/50 p-6",
          // ANIMATION
          "transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
          backdropClassName,
        )}
        {...backdropProps}
      />

      <Primitive.Popup
        data-component="dialog-content"
        className={cx(
          "-translate-1/2 fixed top-1/2 left-1/2 z-50 flex flex-col gap-6 rounded-xl border bg-white p-6 shadow-lg",
          // ANIMATION
          "transition-[opacity,scale] duration-200 data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
          className,
        )}
        style={{
          width: "min(100%, var(--container-xl))",
          ...style,
        }}
        {...props}
      />
    </Primitive.Portal>
  );
};

const DialogHeader = ({
  className,
  children,
  ...props
}: React.ComponentProps<"header">) => {
  const { isAlert } = useDialogContext();

  return (
    <header
      data-component="dialog-header"
      className={cx(
        "relative grid gap-2 has-data-[component=dialog-close]:grid-cols-[1fr_auto]",
        className,
      )}
      {...props}
    >
      {children}
      {!isAlert && (
        <DialogClose className="-m-3 col-start-2 row-span-2 row-start-1 inline-grid size-10 place-items-center self-start rounded-full hover:bg-current/7">
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      )}
    </header>
  );
};

type DialogTitleProps =
  | React.ComponentProps<typeof NormalDialogPrimitive.Title>
  | React.ComponentProps<typeof AlertDialogPrimitive.Title>;

const DialogTitle = ({ className, ...props }: DialogTitleProps) => {
  const { Primitive } = useDialogContext();

  return (
    <Primitive.Title
      data-component="dialog-title"
      className={cx("fs-heading leading-none", className)}
      {...props}
    />
  );
};

type DialogDescriptionProps =
  | React.ComponentProps<typeof NormalDialogPrimitive.Description>
  | React.ComponentProps<typeof AlertDialogPrimitive.Description>;

const DialogDescription = ({ className, ...props }: DialogDescriptionProps) => {
  const { Primitive } = useDialogContext();

  return (
    <Primitive.Description
      data-component="dialog-description"
      className={cx("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
};

const DialogFooter = ({
  className,
  ...props
}: React.ComponentProps<"footer">) => (
  <footer
    data-component="dialog-footer"
    className={cx("flex justify-end gap-2", className)}
    {...props}
  />
);

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
};
