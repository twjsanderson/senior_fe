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
    const baseStyle = { padding: "5px" }
    const getSortStyle = (column: string) => sortType === column ? { cursor: "pointer", fontWeight: "bold", ...baseStyle } : { cursor: "pointer", ...baseStyle};

    return (
    <>
        <h3>Currency prices based on {currency.toUpperCase()}</h3>
        <small>*Sort by clicking on <b>Symbol</b> or <b>Price</b></small>
        <table>
            <tbody>
                <tr>
                <td style={getSortStyle("Symbol")} onClick={() => sortData("Symbol", nextSymbolDir)}>Symbol {sortType === "Symbol" && symbolDir}</td>
                <td style={getSortStyle("Price")} onClick={() => sortData("Price", nextPriceDir)}>Price {sortType === "Price" && priceDir}</td>
                <td style={baseStyle}>{currency.toUpperCase()}</td>
                </tr>
                {data &&
                    data.map((info, idx) => {
                        return (
                        <tr key={idx}>
                            <td style={baseStyle}>{info[0]}</td>
                            <td style={baseStyle}>{info[1]}</td>
                            <td style={baseStyle}>1</td>
                        </tr>
                        );
                })}
            </tbody>
        </table>
    </>
    );
};

export default Currencies;
