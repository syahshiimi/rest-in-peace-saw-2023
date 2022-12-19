import { Dialog, Transition } from "@headlessui/react"
import { Dispatch, SetStateAction, Fragment, MutableRefObject } from "react"

interface IAlertModal {
    isOpen: boolean | undefined
    setIsOpen: Dispatch<SetStateAction<boolean>>
    modalRef: MutableRefObject<HTMLDivElement>
    saveImageModal: () => void
}

const AlertModal = ({
    isOpen,
    setIsOpen,
    modalRef,
    saveImageModal,
}: IAlertModal) => {
    return (
        <Transition
            show={isOpen}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-75 opacity-0"
            as={Fragment}
        >
            <Dialog
                onClose={() => setIsOpen(false)}
                className="fixed inset-0 z-50 flex items-end justify-center pb-10 "
            >
                <div
                    className="fixed inset-0 bg-black/90 "
                    aria-hidden="true"
                />
                <Dialog.Panel className=" z-30 flex flex-col items-start justify-start gap-4 rounded-xl bg-amber-600 px-6 py-4">
                    <Dialog.Title className="text-2xl font-bold text-slate-300">
                        Picture Saved!
                    </Dialog.Title>
                    <Dialog.Description className="text-xl font-medium">
                        To save your image, press the save button.
                    </Dialog.Description>

                    <p>
                        Proceed to the Gallery Sitter to get a digital copy of
                        your image 💪🏾
                    </p>

                    <div className="flex w-full flex-row justify-between gap-8">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="font-semibold"
                        >
                            TRY AGAIN
                        </button>
                        <button
                            onClick={saveImageModal}
                            className="rounded-xl bg-rose-700 px-4 py-3 font-semibold shadow-md"
                        >
                            SAVE
                        </button>
                    </div>
                </Dialog.Panel>
                <div
                    ref={modalRef}
                    className="absolute left-[50%] top-[50%] z-10 h-full -translate-y-[50%] -translate-x-[50%]  scale-50"
                />
            </Dialog>
        </Transition>
    )
}

export default AlertModal
