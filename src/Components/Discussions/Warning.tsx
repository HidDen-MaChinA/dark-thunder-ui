import Button from "../Login/Button";
import Modal from "../Modal";


type WarningProps = {
  message?: string
  accept?: ()=>void
  reject?: ()=>void
}

export default function Warning(props: WarningProps){
  const {accept, message, reject} = props
    return (
      <Modal
        button={
          <button>
            <div className="h-[40px] flex justify-center items-center w-[40px] bg-gray-800 rounded-full">
              <img src="/images/icons/user-logout.svg" height={25} width={25} alt="" />
            </div>
          </button>
        }
      >
        <div className="flex flex-col gap-3">
          <div>{message}</div>
          <div className="w-full flex justify-center">
            <hr className="w-[90%]" />
          </div>
          <div className="w-full gap-3 flex justify-end">
            <Button width="max-content" inverted>
              Confirm
            </Button>
            <Button width="max-content">Cancel</Button>
          </div>
        </div>
      </Modal>
    );
}