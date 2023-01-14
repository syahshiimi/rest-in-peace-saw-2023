import { Dialog, Transition } from "@headlessui/react"
import { useForm } from "react-hook-form"
import {
    Dispatch,
    SetStateAction,
    Fragment,
    MutableRefObject,
    useState,
} from "react"

interface IAlertModal {
    isOpen: boolean | undefined
    setIsOpen?: Dispatch<SetStateAction<boolean>>
    modalRef?: MutableRefObject<HTMLDivElement>
    saveImage?: () => void
    removeAppend?: () => void
}

const saveToSaved = (
    setSaveString: Dispatch<SetStateAction<string>>,
    setIsDisabled: Dispatch<SetStateAction<boolean>>,
    setHasSaved: Dispatch<SetStateAction<boolean>>,
    saveImage: () => void,
    setSavedModalBG: Dispatch<SetStateAction<string>>
) => {
    setSaveString("...saving...")
    setTimeout(() => {
        setIsDisabled(true)
        setSaveString("SAVED!")
        setHasSaved(true)
        saveImage()
        setSavedModalBG("bg-amber-500")
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
    removeAppend,
}: IAlertModal) => {
    const [saveString, setSaveString] = useState<string>("SAVE IMAGE")
    const [isDisabled, setIsDisabled] = useState<boolean>(false)
    const [hasSaved, setHasSaved] = useState<boolean>(false)
    const [savedModalBG, setSavedModalBG] = useState<string>("bg-amber-600")

    const exitModal = () => {
        setIsOpen(false)
        // setSaveString("SAVE IMAGE"),
        // setIsDisabled(false),
        // setHasSaved(false),
        // setSavedModalBG("bg-amber-600"),
        // removeAppend()
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => console.log(data)

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
                <Dialog.Panel
                    className={`z-30 flex w-[600px] flex-col items-center justify-center gap-3 rounded-xl ${savedModalBG} px-6 py-4`}
                ></Dialog.Panel>
            </Dialog>
        </Transition>
    )
}

export default AlertModal
