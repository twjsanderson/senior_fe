import { useEffect, useState } from "react";
import Currencies from "./Currencies";

// https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json
// https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json

export type CurrencyData = [string, number][];
export type SortType = 'Symbol' | 'Price';
export type SortDirection = '+' | '-';
type CurrencyOptions = [string, string][];

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>("1inch");
  const [options, setOptions] = useState<CurrencyOptions>([[currency, "1 Inch"]]);
  const [originalData, setOriginalData] = useState<CurrencyData>([[currency, 0]]);
  const [data, setData] = useState<CurrencyData>([[currency, 0]]);
  const [sortingChoice, setSortingChoice] = useState<[SortType, SortDirection]>(['', '+']);
  const [searchInput, setSearchInput] = useState<string>("");

  const fetchData = (url: string, setter: Function) => {
    fetch(url)
      .then((res) => res.json())
      .then((json) =>{
        setLoading(true)
        setter(json)
      })
      .catch((_: Error) => setError(true))
      .finally(() => setLoading(false));
  }

  const optionsSetter = (json: any) => {
    const optionsArray: CurrencyOptions = Object.entries(json)
    setOptions(optionsArray)
  }
  const currenciesSetter = (json: any) => {
    const pairsArray: CurrencyData = Object.entries(json[currency]);
    setData(pairsArray);
    setOriginalData(pairsArray);
  }

  useEffect(() => {
    fetchData(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json`, optionsSetter)
  }, [])

  useEffect(() => {
    fetchData(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`, currenciesSetter)
  }, [currency]);

  const changeCurrency = (event: any) => {
    setCurrency(event.target.value);
    setSearchInput("");
    filterData("")
  };

  const sortData = (sortType: SortType, direction: SortDirection) => {
    const sortingTypes: { [key in SortType]: (direction: SortDirection) => CurrencyData} = {
      Symbol: (direction: SortDirection) => {
        setSortingChoice(['Symbol', direction])
        return [...data].sort((a, b) => direction === '+' ? a[0].localeCompare(b[0]) : b[0].localeCompare(a[0]));
      },
      Price: (direction: SortDirection) => {
        setSortingChoice(['Price', direction])
        return [...data].sort((a, b) => direction === '+' ? a[1] - b[1] : b[1] - a[1]);
      }
    }
    setData(sortingTypes[sortType](direction));
  }

  const filterData = (input: string) => {
    setSearchInput(input);
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
    <div style={{ marginLeft: "38%"}}>
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
        <input value={searchInput} onChange={(e) => filterData(e.target.value)} />
      </div>
        <Currencies data={data} currency={currency} sortData={sortData} sortingChoice={sortingChoice} />
    </div>
  );
}
