import {Pagination, PaginationItem, PaginationLink} from "reactstrap";

function PaginateObject({list,perPage,currentPage,onPageChange}) {

    const totalPage=Math.ceil(list.length/perPage)
    const pageNumber=[]
    const pagesToShow = 2;

    let startPage = Math.max(currentPage - pagesToShow, 1);

    let endPage = Math.min(currentPage + pagesToShow, totalPage);

    if (startPage === 1) {
        endPage = Math.min(endPage + (pagesToShow - (currentPage - 1)), totalPage);
    }

    if (endPage === totalPage) {
        startPage = Math.max(startPage - (pagesToShow - (totalPage - currentPage)), 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumber.push(i);
    }
    return(
        <div className="row m-0 p-0">
            <div className="col-6 text-start">
                <span>
                    Total: <strong className="rounded text-success px-3 py-1 border">{list.length}</strong>
                </span>
            </div>
            <div className="col-6">
                <Pagination
                    className={`pagination justify-content-end mb-0 ${pageNumber.length===0 && "dis-none"}`}
                    listClassName="justify-content-end mb-0"
                >
                    <PaginationItem disabled={currentPage===1}>
                        <PaginationLink
                            href="#prev"
                            onClick={(e) =>{
                                e.preventDefault()
                                onPageChange(currentPage-1)
                            }}
                            tabIndex="-1"
                        >
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                        </PaginationLink>
                    </PaginationItem>
                    {pageNumber.map((number)=>(
                        <PaginationItem key={number} active={number===currentPage}>
                            <PaginationLink
                                onClick={(e) => {
                                    e.preventDefault()
                                    onPageChange(number)
                                }}
                            >
                                {number}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem disabled={currentPage===totalPage}>
                        <PaginationLink
                            href="#next"
                            onClick={(e) => {
                                e.preventDefault()
                                onPageChange(currentPage+1)
                            }}
                        >
                            <i className="fas fa-angle-right" />
                            <span className="sr-only">Next</span>
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
            </div>
        </div>
    )
}
export default PaginateObject