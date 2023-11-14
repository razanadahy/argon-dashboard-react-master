import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner} from "reactstrap";

function ModalLg({show,hide,title,onSubmit,onCancel,children,loading}) {

    return (
        <>
            <Modal isOpen={show} toggle={hide} fullscreen="md" size="lg" backdrop="static" fade>
                <ModalHeader className="pb-3 border-bottom text-capitalize" tag={"h2"} toggle={hide} > {title}</ModalHeader>
                <ModalBody className="pt-2 border-bottom">
                    {children}
                </ModalBody>
                <ModalFooter>
                    {loading ? (
                        <>
                            <Button color="info" style={{width: "150px"}}>
                                <Spinner color="dark" size="sm">
                                    Loading...
                                </Spinner>
                            </Button>{' '}
                            <Button color="secondary" disabled>
                                Annuler
                            </Button>
                        </>
                    ): (
                     <>
                         <Button color="info" active={false} onClick={(event)=>onSubmit(event)}>
                             Enregistrer
                         </Button>{' '}
                         <Button color="secondary" onClick={onCancel}>
                             Annuler
                         </Button>
                     </>
                    )}
                </ModalFooter>
            </Modal>
        </>
    )
}
export default ModalLg