function Pagination({totalPosts, itemsPerPage, curPage, setCurPage}) {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts/itemsPerPage); i++) {
        pages.push(i);
    }

    const selectedPageClasses = "bg-red-500 drop-shadow-lg rounded-2xl px-4 mx-2 text-white font-bold";
    const unselectedPageClasses = "bg-slate-400 drop-shadow-lg rounded-2xl px-2 mx-2 text-gray-700 font-bold";

    return (
        <div className="absolute inset-x-0 bottom-10 h-5 text-center">
            <div>
                {
                pages.map((page, index) => {
                    return <button className={page === curPage ? selectedPageClasses : unselectedPageClasses} key={index} onClick={() => {setCurPage(page);
                    }}>{page}</button>
                })
            }
            </div>
        </div>
    );
};

export default Pagination;