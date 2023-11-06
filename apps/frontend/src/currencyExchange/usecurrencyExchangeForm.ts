import { Currency } from "@task/currency-list-schema";

type SetCurrencyAction = {
  type: "SET_CURRENCY";
  currency: Currency;
};

type SetAmountAction = {
  type: "SET_AMOUNT";
  amount: string;
};

type ValidateForm = {
  type: "VALIDATE_FORM";
  error: string;
  result: string;
};

type Actions = SetCurrencyAction | SetAmountAction | ValidateForm;

type State = {
  amount: string;
  currency: Currency;
  error: string;
  result: string;
};

export const createDefaultState = (currency: Currency): State => ({
  amount: "",
  currency: currency,
  error: "",
  result: "",
});

export const formReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "SET_CURRENCY":
      return { ...state, error: "", result: "", currency: action.currency };
    case "SET_AMOUNT":
      return { ...state, error: "", result: "", amount: action.amount };
    case "VALIDATE_FORM":
      return { ...state, error: action.error, result: action.result };
    default:
      return state;
  }
};
