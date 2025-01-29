# Currency API - Senior Frontend React Test

A Senior frontend interview test to build a currency lookup app

# Run

1. Navigate to root
2. npm install
3. npm run dev

## Pull data from API endpoints

https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json

Gets all currency symbols and names 

{
	"1inch": "1inch",
	"aave": "Aave",
	"ada": "Cardano",
	"aed": "Emirati Dirham",
	"afn": "Afghan Afghani",
	"agix": "SingularityNET",
	"akt": "Akash Network",
	"algo": "Algorand",
  ...
}

-----------------------------------------------------------------

https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/{currency}.json`

Get all currency pairs for a specific symbol & date of retrieval

currency = "usd"

{
	"date": "2025-01-28",
	"usd": {
		"1inch": 3.30360033,
		"aave": 0.0033411605,
		"ada": 1.14908273,
		"aed": 3.6725,
		"afn": 75.72460295,
    ...
}


## Display all currency pairs for USD in a table

currency = "usd"

Show all data in a table with columns: Symbol, Price, {currency}

**The value for the currency should always be 1 because it is the base


## Build in loading & error handling

Build in loading state and error state


## Enable user to search for different currency symbols

Create a dropdown menu that allows the user to change the base currency (ie. usd) to any other valid currencies available from the APi


## Enable user to sort by Symbol & Price

Enable the user to sort all data by Symbol & Price (it should flip between ascending and decsending order)


## Add UI improvements to the sorting buttons

Make the UI more intertesting and clear for the user when sorting by Symbol & Price


## Enable user to search the data by Symbol

Create a search bar that allows a user to search for a specific symbol
It should filter progressively by each character the user enters and display the original list when the search bar is empty


# License 

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.