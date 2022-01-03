import { useCallback, useState } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string|null>(null);

    const sendRequest = useCallback(
        async (url: string, onDataReceived: (data:any) => void, requestConfig?: RequestInit) => {
            setIsLoading(true);
            setError(null);
            try {
                let response;
                if (requestConfig) {
                    response = await fetch(url, { ...requestConfig });
                } else {
                    response = await fetch(url);
                }

                if (!response.ok) {
                    throw new Error("Request failed!");
                }

                const data = await response.json();

                onDataReceived(data);
            } catch (err) {
                if ((err as Error).message) {
                    setError((err as Error).message);
                } else {
                    setError("Something went wrong!");
                }
            }
            setIsLoading(false);
        },[]);

    return {
        isLoading: isLoading,
        error: error,
        sendRequest: sendRequest,
    };
};

export default useHttp;
