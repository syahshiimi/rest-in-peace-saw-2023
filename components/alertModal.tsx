import { Dialog, Transition } from "@headlessui/react"
import {
    Dispatch,
    SetStateAction,
    Fragment,
    MutableRefObject,
    useState,
} from "react"

interface IAlertModal {
    isOpen: boolean | undefined
    setIsOpen: Dispatch<SetStateAction<boolean>>
    modalRef: MutableRefObject<HTMLDivElement>
    saveImage: () => void
    removeAppend?: () => void
}

const saveToSaved = (
    setSaveString: Dispatch<SetStateAction<string>>,
    setIsDisabled: Dispatch<SetStateAction<boolean>>,
    setHasSaved: Dispatch<SetStateAction<boolean>>,
    saveImage: () => void
) => {
    setSaveString("...saving...")
    setTimeout(() => {
        setIsDisabled(true)
        setSaveString("SAVED!")
        setHasSaved(true)
        saveImage()
    }, 2000)
}

const SaveImageLine = () => {
    return (
        <Dialog.Description className="text-lg font-medium text-gray-800">
            To save your image, press the{" "}
            <span className="text-green-600">save</span> button 💪🏾
        </Dialog.Description>
    )
}

const SaveImageLineSaved = () => {
    return (
        <Dialog.Description className="text-lg font-medium text-gray-800">
            Proceed to the receptionist to get a digital copy of your image 💪🏾
        </Dialog.Description>
    )
}

const TryAgainLine = () => {
    return (
        <Dialog.Description className="text-lg font-medium text-gray-800">
            Don't like your pose? 😢 Click on try again 😍
        </Dialog.Description>
    )
}

const TryAgainLineSaved = () => {
    return (
        <Dialog.Description className="text-lg font-medium text-gray-800">
            To try another pose 🙆 click on the{" "}
            <span className="text-rose-600">try again button</span>.
        </Dialog.Description>
    )
}

const AlertModal = ({
    isOpen,
    setIsOpen,
    modalRef,
    saveImage,
}: IAlertModal) => {
    const [saveString, setSaveString] = useState<string>("SAVE IMAGE")
    const [isDisabled, setIsDisabled] = useState<boolean>(false)
    const [hasSaved, setHasSaved] = useState<boolean>(false)

    const exitModal = () => {
        setIsOpen(false),
            setSaveString("SAVE IMAGE"),
            setIsDisabled(false),
            setHasSaved(false)
    }

    return (
        <Transition
            show={isOpen}
            enter="transition duration-500 ease-inout"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-75 opacity-0"
            as={Fragment}
        >
            <Dialog
                onClose={() => {
                    exitModal()
                }}
                className="fixed inset-0 z-50 flex items-end justify-center pb-28"
            >
                <div
                    className="fixed inset-0 bg-black/90 "
                    aria-hidden="true"
                />
                <Dialog.Panel className="z-30 flex w-[600px]  flex-col items-center justify-center gap-3 rounded-xl bg-amber-600 px-6 py-4">
                    {hasSaved == false ? (
                        <>
                            <Dialog.Title className="pb-3 text-center text-4xl font-bold text-gray-800 ">
                                Picture Preview
                            </Dialog.Title>
                            <SaveImageLine />
                            <TryAgainLine />
                        </>
                    ) : (
                        <>
                            <Dialog.Title className="pb-3 text-center text-4xl font-bold text-gray-800 ">
                                Picture Saved
                            </Dialog.Title>
                            <SaveImageLineSaved />
                            <TryAgainLineSaved />
                        </>
                    )}
                    <div className="flex w-full flex-row justify-between gap-8 pb-2 pt-3">
                        <button
                            onClick={() => {
                                exitModal()
                            }}
                            className="rounded-xl bg-rose-600 px-4 py-3 font-semibold shadow-md transition-all ease-in-out hover:-translate-y-1 hover:shadow-lg"
                        >
                            TRY AGAIN
                        </button>
                        <button
                            onClick={() =>
                                saveToSaved(
                                    setSaveString,
                                    setIsDisabled,
                                    setHasSaved,
                                    saveImage
                                )
                            }
                            disabled={isDisabled}
                            className="rounded-xl bg-green-600 px-4 py-3 font-semibold shadow-md transition-all ease-in-out hover:-translate-y-1 hover:shadow-lg disabled:pointer-events-none disabled:opacity-50"
                        >
                            {saveString}
                        </button>
                    </div>
                </Dialog.Panel>
                <div
                    ref={modalRef}
                    className="absolute left-[50%] top-[40%] z-10 h-full -translate-y-[50%] -translate-x-[50%] scale-75  "
                />
            </Dialog>
        </Transition>
    )
}

export default AlertModal
