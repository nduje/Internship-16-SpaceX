import { useEffect, useState } from "react";

type FetchState<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
};

type FetchOptions = RequestInit | null;

export function useFetch<T = unknown>(
    url: string | null,
    options: FetchOptions = null,
): FetchState<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        if (!url) return;

        try {
            setLoading(true);

            const response = await fetch(url, options ?? undefined);

            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url, options]);

    return { data, loading, error };
}
