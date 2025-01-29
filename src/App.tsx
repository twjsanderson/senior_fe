import { useEffect, useState } from "react";
import Currencies from "./Currencies";

// https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json
// https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json

export type CurrencyData = [string, number][];
type CurrencyOptions = [string, string][];

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>("1inch");
  const [options, setOptions] = useState<CurrencyOptions>([[currency, "1 Inch"]]);
  const [originalData, setOriginalData] = useState<CurrencyData>([[currency, 0]]);
  const [data, setData] = useState<CurrencyData>([[currency, 0]]);
  const [symbolDir, setSymbolDir] = useState<string>('+');
  const [priceDir, setPriceDir] = useState<string>('+');
  const [sortType, setSortType] = useState<string>("");

  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json`
    )
      .then((res) => res.json())
      .then((json) => {
        const optionsArray: CurrencyOptions = Object.entries(json)
        setOptions(optionsArray)
      })
      .catch((_: Error) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [])

  const fetchData = () => {
    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
    )
      .then((res) => res.json())
      .then((json) => {
        const pairsArray: CurrencyData = Object.entries(json[currency]);
        setData(pairsArray);
        setOriginalData(pairsArray);
      })
      .catch((_: Error) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchData()
  }, [currency]);

  const changeCurrency = (event: any) => {
    setCurrency(event.target.value);
  };

  const sortData = (sortType: string, direction: string) => {
    const sortingTypes: { [key: string]: (direction: string) => [string, number][] } = {
      "Symbol": (direction: string) => {
        setSymbolDir(direction)
        setSortType("Symbol")
        if (direction === '+') {
          return [...data].sort((a, b) =>  a[0].localeCompare(b[0]));
        }
        return [...data].sort((a, b) =>  b[0].localeCompare(a[0]));
      },
      "Price": (direction: string) => {
        setPriceDir(direction)
        setSortType("Price")
        if (direction === '+') {
          return [...data].sort((a, b) =>  a[1] - b[1]);
        }
        return [...data].sort((a, b) =>  b[1] - a[1]);
      }
    }
    setData(sortingTypes[sortType](direction));
  }

  const filterData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input: string = e.target.value
    if (input === "") {
      setData(originalData);
    } else {
      const newData = [...originalData].filter((el) => el[0].includes(input));
      setData(newData);
    }
  }

  if (error) return <h1>There has been an error...</h1>;

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <h1>Currency Data</h1>
      <div>
        <h3>Choose currency</h3>
        <select onChange={changeCurrency}>
          {
            options && options.map((option: [string, string], index: number) => {
              return <option key={index} value={option[0]}>{option[1]}</option>
            })
          }
        </select>
      </div>
      <div>
        <h3>Search currencies by Symbol</h3>
        <input onChange={filterData} />
      </div>
      {!error && !loading && data && currency && (
        <Currencies data={data} currency={currency} sortData={sortData} symbolDir={symbolDir} priceDir={priceDir} sortType={sortType} />
      )}
    </div>
  );
}
