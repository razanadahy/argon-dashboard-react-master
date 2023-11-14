import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useState} from "react";

function ModalLg({show,hide,title,onSubmit,onCancel,children}) {

    return (
        <>
            <Modal isOpen={show} toggle={hide} fullscreen="md" size="lg" backdrop="static" fade>
                <ModalHeader className="pb-3 border-bottom text-capitalize" tag={"h2"} toggle={hide} > {title}</ModalHeader>
                <ModalBody className="pt-2 border-bottom">
                    {children}
                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={()=>onSubmit}>
                        Enregistrer
                    </Button>{' '}
                    <Button color="secondary" onClick={onCancel}>
                        Annuler
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}
export default ModalLg