import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  currencies: IPayload[];
  currentCurrency: IPayload;
}

interface IPayload {
  id: number;
  code: string;
  description: string;
  exchangeRate: number;
  dateCreated: string;
  dateModified: string | null;
}

const initialState: InitialState = {
  currencies: [],
  currentCurrency: {
    id: 7,
    code: "USD",
    description: "Dollar",
    exchangeRate: 1.1,
    dateCreated: "2022-04-14T10:21:29.8460195",
    dateModified: null,
  },
};

const currencyStore = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, { payload }: PayloadAction<IPayload>) => {
      state.currencies.push(payload);
      //   state.currencies = [...state.currencies, payload];
    },
    setcurrentCurrency: (state, { payload }: PayloadAction<IPayload>) => {
      state.currentCurrency = payload;
    },
  },
});

export default currencyStore;

export const { setCurrency, setcurrentCurrency } = currencyStore.actions;
