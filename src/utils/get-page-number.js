const getPageNumber = (buttonNumber, page, endPageNumber) => {
  let pageNumber = page;
  if (page === 1) {
    if (buttonNumber === 1) {
      pageNumber = 1;
    } else if (buttonNumber === 2) {
      pageNumber = 2;
    } else if (buttonNumber === 3) {
      pageNumber = 3;
    }
  } else if (page >= endPageNumber - 2 && endPageNumber > 2) {
    if (buttonNumber === 1) {
      pageNumber = endPageNumber - 2;
    } else if (buttonNumber === 2) {
      pageNumber = endPageNumber - 1;
    } else if (buttonNumber === 3) {
      pageNumber = endPageNumber;
    }
  } else if (endPageNumber !== 2) {
    if (buttonNumber === 1) {
      pageNumber = page - 1;
    } else if (buttonNumber === 2) {
      pageNumber = page;
    } else if (buttonNumber === 3) {
      pageNumber = page + 1;
    }
  } else {
    if (buttonNumber === 1) {
      pageNumber = 1;
    } else if (buttonNumber === 2) {
      pageNumber = 2;
    } else if (buttonNumber === 3) {
      pageNumber = 3;
    }
  }

  return pageNumber;
};

export default getPageNumber;
