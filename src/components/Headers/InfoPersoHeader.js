import { Button, Container, Row, Col } from "reactstrap";

const InfoPersoHeader = ({nom,email,estConge}) => {

    return (
        <>
            <div className="header pb-9 pt-lg-5  d-flex align-items-center bg-gradient-info" style={{minHeight: "200px", backgroundSize: "cover",}}>
                <Container className="d-flex align-items-center mt-2 ml-4 p-2 row m-0" fluid>
                    <div className="col-auto offset-2 text-center">
                        <div className="d-flex justify-content-between align-items-center">
                            <div><h2 className="mb-0 text-capitalize">{nom}</h2></div>
                            <div className={`text-right text-white ${estConge ? "bg-translucent-danger" : "bg-translucent-success"} rounded px-2 py-1 text-sm ml-1`}><small>{estConge ? "En Congé" : "En Activité"}</small></div>
                        </div>
                        <p className="text-sm mb-0 text-darker text-lowercase">{email}</p>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default InfoPersoHeader;
