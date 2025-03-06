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
        button={<div className="h-[35px] w-[35px] bg-black rounded-full"></div>}
      >
        <div className="flex flex-col">
          <div>
            {message}
          </div>
          <hr className="w-[90%]"/>
          <div className="w-full gap-3 flex justify-end">
            <Button width="max-content" inverted>
              YES !
            </Button>
            <Button width="max-content">
              NO !!!
            </Button>
          </div>
        </div>
      </Modal>
    );
}