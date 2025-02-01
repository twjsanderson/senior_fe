import React from "react";
import { CurrencyData, SortDirection, SortType } from "./App";

type CurrenciesProps = {
  data: CurrencyData
  currency: string;
  sortData: (sortType: SortType, direction: SortDirection) => void;
  sortingChoice: [SortType, SortDirection]
};

const Currencies = ({
    data, 
    currency, 
    sortData, 
    sortingChoice 
}: CurrenciesProps): React.JSX.Element => {
    const direction = sortingChoice[1] === '+' ? '-' : '+';
    const baseStyle = { padding: "5px" }
    const getSortStyle = (column: SortType) => 
        sortingChoice[0] === column ? 
            { cursor: "pointer", fontWeight: "bold", ...baseStyle } : 
            { cursor: "pointer", ...baseStyle};

    return (
        <>
            <h3>Currency prices based on {currency.toUpperCase()}</h3>
            <small>*Sort by clicking on <b>Symbol</b> or <b>Price</b></small>
            <table>
                <tbody>
                    <tr>
                        <td style={getSortStyle("Symbol")} onClick={() => sortData("Symbol", direction)}>
                            Symbol {sortingChoice[0] === "Symbol" && direction}
                        </td>
                        <td style={getSortStyle("Price")} onClick={() => sortData("Price", direction)}>
                            Price {sortingChoice[0] === "Price" && direction}
                        </td>
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
