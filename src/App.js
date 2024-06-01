// import "./index.css";
// import Dropdown from "react-dropdown";
// import "react-dropdown/style.css";
// import axios from "axios";
// import { useEffect, useState } from "react";

// function App() {
//   const [currencies, setCurrencies] = useState([]);
//   const [selectedOption1, setSelectedOption1] = useState(currencies[0]);
//   const [selectedOption2, setSelectedOption2] = useState(null);
//   const [amount, setAmount] = useState(1);
//   const [finalCrrRate, setFinalCrrRate] = useState();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `https://v6.exchangerate-api.com/v6/131f18139b19091a1e80da11/latest/USD`
//         );
//         const options = Object.keys(response.data.conversion_rates);

//         setCurrencies(options);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const _onSelect1 = (selectedOption) => {
//     setSelectedOption1(selectedOption);
//   };

//   const _onSelect2 = (selectedOption) => {
//     setSelectedOption2(selectedOption);
//   };
//   useEffect(() => {
//     console.log("Final crr Rate: ", finalCrrRate);
//   }, [finalCrrRate]);

//   const handleSubmit = async () => {
//     try {
//       const response1 = await axios.get(
//         `https://v6.exchangerate-api.com/v6/131f18139b19091a1e80da11/latest/${selectedOption1.label}`
//       );
//       await console.log("response", response1);
//       const CrrRate = await response1.data.conversion_rates;
//       const SelectedCrrRate = CrrRate[selectedOption2.label];
//       await setFinalCrrRate(SelectedCrrRate);
//       console.log(finalCrrRate);
//     } catch (error) {
//       console.error("Error fetching RATE:", error);
//     }
//   };

//   const handleSwapClick = () => {
//     setSelectedOption1(selectedOption2);
//     setSelectedOption2(selectedOption1);
//   };

//   return (
//     <div className="m-9 bg-gradient-to-br from-white via-cyan-100 to-blue-200 rounded-lg p-6">
//       <div className="flex justify-center">
//         <div className="text-4xl font-bold mb-8 text-gray-800">
//           Currency Converter
//         </div>
//       </div>
//       <div className="flex justify-center mb-4">
//         <label className="font-bold text-xl text-gray-800">
//           Enter Amount:
//           <input
//             name="amount"
//             type="number"
//             autoFocus={true}
//             min="1"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="border border-gray-300 rounded-md px-2 py-1 ml-2 focus:outline-none focus:border-blue-500"
//           />
//         </label>
//       </div>
//       <div className="flex justify-center mb-4">
//         <div className="mr-8">
//           <h1 className="font-bold text-2xl mb-2 text-gray-800">From</h1>
//           <Dropdown
//             options={currencies}
//             value={selectedOption1}
//             placeholder="Select.."
//             onChange={_onSelect1}
//             className="border border-blue-400 rounded-md w-full"
//           />
//         </div>
//         <button
//           className="rounded-lg p-3 pt-3 font-bold border border-blur-700 bg-blue-400 hover:bg-blue-800 text-white transition-colors duration-300 shadow-md mt-9 mr-10"
//           onClick={handleSwapClick}
//           type="button"
//         >
//           Swap
//         </button>
//         <div>
//           <h1 className="font-bold text-2xl mb-2 text-gray-800">To</h1>
//           <Dropdown
//             options={currencies}
//             value={selectedOption2}
//             onChange={_onSelect2}
//             placeholder="Select.."
//             className="border border-blue-400 rounded-md w-full"
//           />
//         </div>
//       </div>

//       <p className="text-xl mb-4 text-gray-800">
//         Convert <span className="font-bold">{amount} </span>{" "}
//         <span className="font-bold">
//           {selectedOption1 ? selectedOption1.label : ""}
//         </span>{" "}
//         into{" "}
//         <span className="font-bold">
//           {selectedOption2 ? selectedOption2.label : ""}
//         </span>
//       </p>
//       <div className="flex justify-center mb-8">
//         <button
//           className="w-40 rounded-lg p-3 font-bold border border-transparent bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300 shadow-md"
//           onClick={handleSubmit}
//           type="button"
//         >
//           Convert
//         </button>
//       </div>
//       <div className="flex justify-center">
//         <span className="text-xl text-gray-800">
//           Value of <span className="font-bold">{amount} </span>{" "}
//           <span className="font-bold">
//             {selectedOption1 ? selectedOption1.label : ""}
//           </span>{" "}
//           into{" "}
//           <span className="font-bold">
//             {selectedOption2 ? selectedOption2.label : ""}
//           </span>{" "}
//           is{" "}
//           <span className="font-bold text-4xl">
//             {finalCrrRate && amount ? finalCrrRate * amount : "N/A"}
//           </span>
//         </span>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";
import Loader from "./components/loader";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [selectedOption1, setSelectedOption1] = useState(currencies[0]);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [amount, setAmount] = useState(1);
  const [finalCrrRate, setFinalCrrRate] = useState();
  const [loading, setLoading] = useState(true); // Initially set loading to true
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/131f18139b19091a1e80da11/latest/USD`
        );
        const options = Object.keys(response.data.conversion_rates);
        setCurrencies(options);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, []);

  const _onSelect1 = (selectedOption) => {
    setSelectedOption1(selectedOption);
  };

  const _onSelect2 = (selectedOption) => {
    setSelectedOption2(selectedOption);
  };

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true when submitting the form
    try {
      const response1 = await axios.get(
        `https://v6.exchangerate-api.com/v6/131f18139b19091a1e80da11/latest/${selectedOption1.label}`
      );
      const CrrRate = response1.data.conversion_rates;
      const SelectedCrrRate = CrrRate[selectedOption2.label];
      setFinalCrrRate(SelectedCrrRate * amount);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      setError("Error fetching rate. Please try again later.");
      setLoading(false); // Set loading to false in case of error
    }
  };

  const handleSwapClick = () => {
    setSelectedOption1(selectedOption2);
    setSelectedOption2(selectedOption1);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-2xl font-bold mb-4">Currency Converter</div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? ( // Conditionally render loading indicator
        <>
          <Loader className="mt-10" />
          <div className="text-center">Loading...</div>
        </>
      ) : (
        <>
          <div className="mb-4">
            <label className="font-bold text-lg">Enter Amount:</label>
            <input
              name="amount"
              type="number"
              autoFocus={true}
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 ml-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center mb-4">
            <div className="mr-4">
              <label className="font-bold text-lg">From:</label>
              <Dropdown
                options={currencies}
                value={selectedOption1}
                placeholder="Select.."
                onChange={_onSelect1}
                className="border border-blue-400 rounded-md w-full mt-1"
              />
            </div>
            <button
              className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
              onClick={handleSwapClick}
              type="button"
            >
              Swap
            </button>
            <div className="ml-4">
              <label className="font-bold text-lg">To:</label>
              <Dropdown
                options={currencies}
                value={selectedOption2}
                onChange={_onSelect2}
                placeholder="Select.."
                className="border border-blue-400 rounded-md w-full mt-1"
              />
            </div>
          </div>
          <button
            className="w-full py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
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
  );
}

export default App;
