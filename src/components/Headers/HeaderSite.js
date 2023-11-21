
const HeaderSite = ({idProjet,nomProjet,nomSite,author}) => {

    return (
        <>
            <div className="header pb-7 pt-lg-5  d-flex align-items-center bg-gradient-info">
                <div className="align-items-center py-4 row w-100 p-0 m-0 mt--5 z-index-100">
                    <div className="col-12">
                        <nav className="d-none d-md-inline-block ml-md-4">
                            <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                <li className="breadcrumb-item">
                                    <a href={`/${author}/index`}><i className="fas fa-home"/></a>
                                </li>
                                {/*<li className="breadcrumb-item">*/}
                                {/*    <a href={`/${author}/index`}>Dashboards</a>*/}
                                {/*</li>*/}
                                <li className="breadcrumb-item">
                                    <a href={`/${author}/projets`}>Liste des Projets</a>
                                </li>
                                <li className="breadcrumb-item text-capitalize">
                                    <a href={`/${author}/projets/view/${idProjet}`}>{nomProjet}</a>
                                </li>
                                <li className="active breadcrumb-item text-capitalize text-dark">{nomSite}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderSite;
