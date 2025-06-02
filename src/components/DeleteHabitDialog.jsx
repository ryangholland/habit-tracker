import { Fragment } from "react";
import {
  Dialog,
  Transition,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useDeleteDialog } from "../hooks/useDeleteDialog";
import { useHabits } from "../hooks/useHabits";

function DeleteHabitDialog() {
  const { habitToDelete, isOpen, closeDialog } = useDeleteDialog();
  const { deleteHabit } = useHabits();

  const handleConfirm = () => {
    if (habitToDelete) {
      deleteHabit(habitToDelete.id);
    }
    closeDialog();
  };

  return (
    <Dialog
      as="div"
      className="relative z-50"
      open={isOpen}
      onClose={closeDialog}
    >
      {/* Backdrop */}
      <Transition
        show={isOpen}
        as={Fragment}
        enter="ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          aria-hidden="true"
        />
      </Transition>

      {/* Dialog panel wrapper */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
          <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-lg bg-gray-800 p-6 text-left align-middle shadow-xl border border-gray-700">
            <DialogTitle className="text-lg font-medium text-white">
              Delete this habit?
            </DialogTitle>
            <div className="mt-2 text-gray-300">
              <p>
                Are you sure you want to delete{" "}
                <strong>{habitToDelete?.name}</strong>? This will remove all
                history associated with this habit.
              </p>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                className="cursor-pointer px-4 py-2 text-sm rounded-md bg-gray-600 hover:bg-gray-500 text-white"
                onClick={closeDialog}
              >
                Cancel
              </button>
              <button
                type="button"
                className="cursor-pointer px-4 py-2 text-sm rounded-md bg-red-600 hover:bg-red-500 text-white ring-1 ring-red-400"
                onClick={handleConfirm}
              >
                Delete
              </button>
            </div>
          </DialogPanel>
        </Transition>
      </div>
    </Dialog>
  );
}

export default DeleteHabitDialog;
