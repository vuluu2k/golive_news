import React from 'react';

function ButtonLoading(props) {
    return (
        <button className="btn btn-danger bg-red btn-read-more" type="button" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            {" Đang tải..."}
        </button>
    );
}

export default ButtonLoading;