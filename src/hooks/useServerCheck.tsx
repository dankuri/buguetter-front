import { useState } from 'react';

const useServerCheck = () => {
    const [failed, setFailed] = useState(false);
    fetch(`/api/status`)
        .then(response => {
            if (response.status >= 400) {
                setFailed(true);
            } else {
                setFailed(false);
            }
        })
        .catch(error => {
            console.error(error);
            setFailed(true);
        });
    return failed;
};

export default useServerCheck;
