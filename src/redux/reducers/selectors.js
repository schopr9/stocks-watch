export const getAllStocks = (state, limit) => state.searchSymbol.symbols
export const getSymbolDetail = (state, symbol) => state.saveSymbolDetails.symbols[symbol]
