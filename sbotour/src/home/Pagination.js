import React from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {
    pagination : PropTypes.object.isRequired,
    toursAtrraction :PropTypes.array.isRequired,
    onPageChange : PropTypes.func

};



Pagination.defaultProps = {

    onPageChange : null
};


function Pagination(props){
    const {pagination, onPageChange, toursAtrraction} = props;
    const {_page} = pagination;

    function handlePageChange(newPage){
        if(onPageChange){
            onPageChange(newPage);
        }
    }

    

    return(
        <div className="control-btn">
            <button
                disabled={_page <= 0}
                className="pre-next pre"
                onClick={() => handlePageChange(_page-1)}
            >
                Prev
            </button>

            <button

                disabled={_page >= toursAtrraction.length}
                className="pre-next"
                onClick={() => handlePageChange(_page+1)}            
            >
                Next
            </button>
        </div>
    );

}
export default Pagination;