import axios from "axios";
import { useCallback, useState } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (
      url: string,
      method: string = "GET",
      body: string | null = null,
      headers: Record<string, string> = {}
    ) => {
      setLoading(true);
      try {
        const response = await axios.get(url, { method, body, headers });
        const { data } = response;
        return data;
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    },
    []
  );
  const clearError = () => setError(null);
  return { loading, error, sendRequest, clearError };
};
