import React from "react";
import { CurrencyData } from "./App";

type CurrenciesProps = {
  data: CurrencyData
  currency: string;
  sortData: Function
  symbolDir: string
  priceDir: string
  sortType: string
};

const Currencies = ({ data, currency, sortData, symbolDir, priceDir, sortType }: CurrenciesProps): React.JSX.Element => {
    const nextSymbolDir = symbolDir === '+' ? "-" : "+";
    const nextPriceDir = priceDir === '+' ? "-" : "+";

    const getSortStyle = (column: string) => {
        return sortType === column ? { fontWeight: "bold" } : {};
    };
    return (
    <>
        <h3>Currency prices based on {currency.toUpperCase()}</h3>
        <table>
        <tbody>
            <tr>
            <td style={getSortStyle("Symbol")} onClick={() => sortData("Symbol", nextSymbolDir)}>Symbol {sortType === "Symbol" && symbolDir}</td>
            <td style={getSortStyle("Price")} onClick={() => sortData("Price", nextPriceDir)}>Price {sortType === "Price" && priceDir}</td>
            <td>{currency.toUpperCase()}</td>
            </tr>
            {data &&
            data.map((info, idx) => {
                return (
                <tr key={idx}>
                    <td>{info[0]}</td>
                    <td>{info[1]}</td>
                    <td>1</td>
                </tr>
                );
            })}
        </tbody>
        </table>
    </>
    );
};

export default Currencies;
