import {
  Dialog,
  Transition,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";

function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
}) {
  return (
    <Dialog as="div" className="relative z-50" open={isOpen} onClose={onClose}>
      <Transition show={isOpen} as={Fragment}>
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          aria-hidden="true"
        />
      </Transition>

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Transition
          show={isOpen}
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <DialogPanel className="w-full max-w-md rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl border border-gray-300 dark:border-gray-700">
            <DialogTitle className="text-lg font-medium text-black dark:text-white">
              {title}
            </DialogTitle>
            <div className="mt-2 text-gray-700 dark:text-gray-300">
              <p>{message}</p>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 text-sm rounded-md bg-gray-600 hover:bg-gray-500 text-white"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm rounded-md bg-red-600 hover:bg-red-500 text-white ring-1 ring-red-400"
                onClick={onConfirm}
              >
                {confirmLabel}
              </button>
            </div>
          </DialogPanel>
        </Transition>
      </div>
    </Dialog>
  );
}

export default ConfirmationDialog;
