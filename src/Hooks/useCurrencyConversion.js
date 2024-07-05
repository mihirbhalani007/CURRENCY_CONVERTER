import { useState } from "react";
import axios from "axios";

function useCurrencyConversion() {
  const [finalCrrRate, setFinalCrrRate] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/131f18139b19091a1e80da11/latest/${fromCurrency}`
      );
      const rate = response.data.conversion_rates[toCurrency];
      setFinalCrrRate(rate * amount);
    } catch (error) {
      setError("Error fetching rate. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return { finalCrrRate, loading, error, convertCurrency };
}

export default useCurrencyConversion;
