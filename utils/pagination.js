export const pagination = async (model, query, page, limit) => {
    // counting documents
    const total = await model.find(query).countDocuments();

    // total pages
    const totalPages = Math.ceil(total/limit);

    // end page
    let endPage = false;
    if(totalPages <= page) endPage = true;

    // first page
    let firstPage = false;
    if(page == 1) firstPage = true;

    return {
        firstPage,
        endPage
    }
};