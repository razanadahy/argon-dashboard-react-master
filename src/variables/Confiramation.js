import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner} from "reactstrap";

function Confirmation({text,etat,show,hide}) {
    function setEtat(number) {
        etat(number)
        hide()
    }
    return (
        <>
            <Modal className="modal-dialog-centered modal-danger"
                   contentClassName="bg-white" isOpen={show} toggle={hide} fullscreen="md" centered={true} size="sm" backdrop={true} fade>

                <div className="modal-header">
                    <h5 className="modal-title" id="modal-title-notification">
                        {''}0
                    </h5>
                    <button
                        aria-label="Close"
                        className="close text-gray"
                        data-dismiss="modal"
                        type="button"
                        onClick={()=>setEtat(0)}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="text-center text-danger">
                        <p className="display-4">
                            {text}
                        </p>
                    </div>
                </div>
                <div className="modal-footer">
                    <Button className="btn-white" color="info" type="button" onClick={()=>setEtat(1)}>
                        Confirmer
                    </Button>
                    <Button
                        className="text-white ml-auto"
                        color="danger"
                        data-dismiss="modal"
                        type="button"
                        onClick={()=>setEtat(0)}
                    >
                        Annuler
                    </Button>
                </div>
            </Modal>
        </>
    )
}
export default Confirmation