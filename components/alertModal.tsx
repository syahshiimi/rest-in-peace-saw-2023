import { Dialog, Transition } from "@headlessui/react"
import { useForm, SubmitHandler } from "react-hook-form"
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

type Inputs = {
    text: string
    textPrompt: string
}

const AlertModal = ({
    isOpen,
    setIsOpen,
    modalRef,
    saveImage,
    removeAppend,
}: IAlertModal) => {
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
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

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
                    className={`z-30 flex w-[600px] flex-col items-center justify-center gap-3 rounded-xl bg-blue-500  px-6 py-4`}
                >
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-row gap-8"
                    >
                        {/* include validation with required or other standard HTML validation rules */}
                        <input
                            {...register("textPrompt", { required: true })}
                            className="w-96 "
                        />
                        {/* errors will return when field validation fails  */}
                        {errors.textPrompt && (
                            <span>This field is required</span>
                        )}

                        <input type="submit" />
                    </form>
                </Dialog.Panel>
            </Dialog>
        </Transition>
    )
}

export default AlertModal
