import Button from "../Login/Button";
import Modal from "../Modal";


type WarningProps = {
  message?: string
  accept?: ()=>void
}

export default function Warning(props: WarningProps){
  const {accept, message} = props
    return (
      <Modal
        button={
            <div className="h-[40px] flex justify-center items-center w-[40px] bg-gray-800 rounded-full">
              <img src="/images/icons/user-logout.svg" height={25} width={25} alt="" />
            </div>
        }
      >
        <div className="flex flex-col gap-3">
          <p className="text-xl">{message}</p>
          <div className="w-full flex justify-center">
            <hr className="w-[90%]" />
          </div>
          <div className="w-full gap-3 flex justify-end">
            <Button onClick={accept} width="max-content">
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    );
}