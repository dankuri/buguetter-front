import { useEffect, useState } from 'react';

const useServerCheck = () => {
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        fetch(`/api/status`)
            .then(response => {
                setFailed(response.status >= 400);
            })
            .catch(error => {
                console.error(error);
                setFailed(true);
            });
    }, []);
    return failed;
};

export default useServerCheck;
