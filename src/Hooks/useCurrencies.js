import { useEffect, useState } from "react";
import axios from "axios";

function useCurrencies() {
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/131f18139b19091a1e80da11/latest/USD`
        );
        const options = Object.keys(response.data.conversion_rates);
        setCurrencies(options);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  return { currencies, loading, error };
}

export default useCurrencies;
