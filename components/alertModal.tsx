import { Dialog, Transition } from "@headlessui/react"
import { Dispatch, SetStateAction, Fragment } from "react"

interface IAlertModal {
    isOpen: boolean | undefined
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const AlertModal = ({ isOpen, setIsOpen }: IAlertModal) => {
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
                className="fixed inset-0 z-50 flex items-center justify-center "
            >
                <div
                    className="fixed inset-0 bg-black/80 "
                    aria-hidden="true"
                />
                <Dialog.Panel className="z-10 flex flex-col gap-4 rounded-xl bg-amber-600 px-6 py-4">
                    <Dialog.Title className="text-2xl font-bold text-slate-300">
                        Picture Saved!
                    </Dialog.Title>
                    <Dialog.Description className={"text-xl font-medium"}>
                        Your image has been saved.
                    </Dialog.Description>

                    <p>
                        Proceed to the Gallery Sitter to get a digital copy of
                        your image 💪🏾
                    </p>

                    <div className="flex flex-row gap-8">
                        <button onClick={() => setIsOpen(false)}>CLOSE</button>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </Transition>
    )
}

export default AlertModal
