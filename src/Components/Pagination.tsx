type Props = {
    pageCount: number,
    currentPage: number,
    handleClick: (clickedPag: number) => void
}

export function Pagination({pageCount, currentPage, handleClick}: Props) {

    let pagination: number[] = [];
    for(let i = 0; i < pageCount; i++) {
        pagination.push(i+1);
    }
    let visiblePag = handlePagination();

    function handlePagination() {
        let visiblePag: number[] = [];
        let firstPag: number;
        let lastPag: number;

        if(pagination.length > 4) {
            if(currentPage - 2 <= 1) {
                firstPag = currentPage;
                lastPag = currentPage +2;

                for(let i in pagination) {
                    if(pagination[i] >= firstPag && pagination[i] <= lastPag) {
                        visiblePag.push(pagination[i]);
                    }
                }

                visiblePag.push(pageCount)
            } else {
                visiblePag = [1];
                if(currentPage + 2 >= 7) {
                    firstPag = currentPage - 2;
                } else {
                    firstPag = currentPage;
                }
                
                lastPag = firstPag + 2;

                for(let i in pagination) {
                    if(pagination[i] >= firstPag && pagination[i] <= lastPag) {
                        visiblePag.push(pagination[i]);
                    }
                }
            }

        }
        return visiblePag;
    }


    return(
        <div className='flex justify-center gap-1 flex-wrap'> 
            {pageCount > 0 && visiblePag.map((item, index) => (
                <div 
                key={index} 
                onClick={() => handleClick(item)}
                className={`p-[5px] w-9 h-9 border-2 border-slate-200/50 flex items-center justify-center text-sm rounded cursor-pointer ease-in-out duration-[.3s] ${item === currentPage ? 'text-white bg-[#4B56D2] hover:bg-[#4B56D2]/80' : 'hover:bg-slate-300/50 hover:text-white'}`}
                >
                    {item}
                </div>
            ))} 
        </div>
    );
}