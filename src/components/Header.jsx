import React, {useState, useEffect, useMemo, useCallback, memo} from 'react';

import './Header.css'

const Header = () => {
    return (
        <>
            <div className={'Header'}>
                <h3>오늘은 📅</h3>
                <h1>{new Date().toDateString()}</h1>
            </div>
        </>
    );
}

export default memo(Header);
