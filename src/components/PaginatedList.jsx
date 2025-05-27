export const PaginatedList = ({
    cryptosPerPage,
    totalCryptos,
    setCurrentPage,
    currentPage,
  }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalCryptos / cryptosPerPage); i++) {
      pageNumbers.push(i);
    }
  
    const paginate = (pageNumber, e) => {
      e.preventDefault();
      setCurrentPage(pageNumber);
    };
  
    return (
      <nav>
        <ul style={{
            display: 'flex',
            justifyContent: 'center',
            paddingLeft: '0',
            listStyle: 'none',
            marginTop: '20px',
          }}>
          {pageNumbers.map((number) => (
            <li
              key={number}
              style={{
                margin: '0 5px',
              }}
            >
              <a
                onClick={(e) => paginate(number, e)}
                href="!#"
                style={{
                  display: 'inlineBlock',
                  padding: '10px 15px',
                  backgroundColor: '#202020',
                  color: '#efefef',
                  border: '3px solid #121212',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'background-color 0.3s ease, color 0.3s ease',
                  "&:active": {
                    backgroundColor: '#323232'
                  }
                }}
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };