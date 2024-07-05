import React, { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import useCurrencies from "./Hooks/useCurrencies";
import useCurrencyConversion from "./Hooks/useCurrencyConversion";

function App() {
  const {
    currencies,
    loading: currenciesLoading,
    error: currenciesError,
  } = useCurrencies();

  const {
    finalCrrRate,
    loading: conversionLoading,
    error: conversionError,
    convertCurrency,
  } = useCurrencyConversion();

  const [selectedOption1, setSelectedOption1] = useState();
  const [selectedOption2, setSelectedOption2] = useState();
  const [amount, setAmount] = useState(1);

  const _onSelect1 = (selectedOption) => {
    setSelectedOption1(selectedOption);
  };

  const _onSelect2 = (selectedOption) => {
    setSelectedOption2(selectedOption);
  };

  const handleSubmit = () => {
    convertCurrency(selectedOption1.value, selectedOption2.value, amount);
  };

  const handleSwapClick = () => {
    setSelectedOption1(selectedOption2);
    setSelectedOption2(selectedOption1);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-green-900">
      <div className="text-3xl font-bold text-green-300 my-8">
        Currency Converter
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        {currenciesError && (
          <div className="text-red-500 mb-4">{currenciesError}</div>
        )}
        {conversionError && (
          <div className="text-red-500 mb-4">{conversionError}</div>
        )}
        {currenciesLoading || conversionLoading ? (
          <>
            <div className="text-center">Loading...</div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block font-bold text-lg mb-2">Amount</label>
              <input
                name="amount"
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1 mr-2">
                <label className="block font-bold text-lg mb-2">From</label>
                <Dropdown
                  options={currencies}
                  value={selectedOption1}
                  placeholder="Select.."
                  onChange={_onSelect1}
                  className="w-full border border-gray-300 rounded-md"
                />
              </div>
              <button
                className="flex-none p-3 bg-green-500 text-white rounded-2xl hover:bg-green-600 focus:outline-none mx-2 mt-8"
                onClick={handleSwapClick}
                type="button"
              >
                ⇄
              </button>
              <div className="flex-1 ml-2">
                <label className="block font-bold text-lg mb-2">To</label>
                <Dropdown
                  options={currencies}
                  value={selectedOption2}
                  placeholder="Select.."
                  onChange={_onSelect2}
                  className="w-full border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <button
              className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
              onClick={handleSubmit}
              type="button"
            >
              Convert
            </button>
            {finalCrrRate !== undefined && (
              <div className="text-xl mt-4">
                Value of {amount} {selectedOption1.label} into{" "}
                {selectedOption2.label} is{" "}
                <span className="font-bold text-2xl">{finalCrrRate}</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
