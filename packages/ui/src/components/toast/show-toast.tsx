import classNames from "classnames";
import type { Toast, ToastOptions } from "react-hot-toast";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";

type IToast = {
  message: string;
  toastVisible: boolean;
  toastId: string;
  onClose: (toastId: string) => void;
};

export const SuccessToast = ({
  message,
  toastVisible,
  onClose,
  toastId,
}: IToast) => (
  <button
    className={classNames(
      "bg-success text-white mb-2 flex h-auto  items-center space-x-2 rounded-md p-4 text-[12px] font-medium",
      toastVisible && "cursor-pointer"
    )}
    onClick={() => onClose(toastId)}
  >
    <span className="mt-0.5">
      <MdCancel name="check" className="h-5 w-5" />
    </span>
    <p className="text-left">{message}</p>
  </button>
);

export const ErrorToast = ({
  message,
  toastVisible,
  onClose,
  toastId,
}: IToast) => (
  <button
    className={classNames(
      "bg-error text-white mb-2 flex h-auto space-x-2 items-center rounded-md p-4 text-[12px] font-medium",
      toastVisible && "cursor-pointer"
    )}
    onClick={() => onClose(toastId)}
  >
    <span className="mt-0.5">
      <MdCancel name="info" className="h-4 w-4" />
    </span>
    <p data-testid="toast-error" className="text-left">
      {message}
    </p>
  </button>
);

export const WarningToast = ({
  message,
  toastVisible,
  onClose,
  toastId,
}: IToast) => (
  <button
    className={classNames(
      "bg-error text-white mb-2 flex  items-center h-auto space-x-2 rounded-md p-4 text-[12px] font-medium",
      toastVisible && "cursor-pointer"
    )}
    onClick={() => onClose(toastId)}
  >
    <span className="mt-0.5">
      <MdCancel name="info" className="h-4 w-4" />
    </span>
    <p data-testid="toast-warning" className="text-left">
      {message}
    </p>
  </button>
);

export const DefaultToast = ({
  message,
  toastVisible,
  onClose,
  toastId,
}: IToast) => (
  <button
    className={classNames(
      "animate-fade-in-up bg-brand-default text-brand mb-2 flex h-auto space-x-2 rounded-md p-3 text-sm font-semibold shadow-md rtl:space-x-reverse md:max-w-sm",
      toastVisible && "animate-fade-in-up cursor-pointer"
    )}
    onClick={() => onClose(toastId)}
  >
    <span className="mt-0.5">
      <MdCancel name="check" className="h-4 w-4" />
    </span>
    <p data-testid="toast-default" className="text-left">
      {message}
    </p>
  </button>
);

const TOAST_VISIBLE_DURATION = 6000;

type ToastVariants = "success" | "warning" | "error";

export function showToast(
  message: string,
  variant: ToastVariants,
  // Options or duration (duration for backwards compatibility reasons)
  options: number | ToastOptions = TOAST_VISIBLE_DURATION
) {
  //
  const _options: ToastOptions =
    typeof options === "number" ? { duration: options } : options;
  if (!_options.duration) _options.duration = TOAST_VISIBLE_DURATION;
  if (!_options.position) _options.position = "top-center";

  const onClose = (toastId: string) => {
    toast.remove(toastId);
  };
  const toastElements: { [x in ToastVariants]: (t: Toast) => JSX.Element } = {
    success: (t) => (
      <SuccessToast
        message={message}
        toastVisible={t.visible}
        onClose={onClose}
        toastId={t.id}
      />
    ),
    error: (t) => (
      <ErrorToast
        message={message}
        toastVisible={t.visible}
        onClose={onClose}
        toastId={t.id}
      />
    ),
    warning: (t) => (
      <WarningToast
        message={message}
        toastVisible={t.visible}
        onClose={onClose}
        toastId={t.id}
      />
    ),
  };
  return toast.custom(
    toastElements[variant] ||
      ((t) => (
        <DefaultToast
          message={message}
          toastVisible={t.visible}
          onClose={onClose}
          toastId={t.id}
        />
      )),
    _options
  );
}
