import { Currency } from "@task/currency-list-schema";
import { useReducer } from "react";
import { exchangeCurrency, amountSchema } from "./exchangeCurrency";
import { createDefaultState, formReducer } from "./usecurrencyExchangeForm";
import {
  Button,
  Error,
  Result,
  Input,
  Select,
  FormLayout,
  FormLabel,
} from "../ui-components";

export const CurrencyExchangeForm = ({
  currencyList,
}: {
  currencyList: Currency[];
}) => {
  const [state, dispatch] = useReducer(
    formReducer,
    createDefaultState(currencyList[0]),
  );

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>): void =>
    dispatch({ type: "SET_AMOUNT", amount: e.target.value });

  const handleChangeCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = currencyList.find(
      (currency) => currency.currencyCode === e.target.value,
    )!;
    dispatch({ type: "SET_CURRENCY", currency: selectedCurrency });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validatedAmount = amountSchema.safeParse(state.amount);
    if (!validatedAmount.success) {
      dispatch({
        type: "VALIDATE_FORM",
        error: validatedAmount.error.issues[0]?.message,
        result: "",
      });
    } else {
      const result = exchangeCurrency(validatedAmount.data, state.currency);
      dispatch({
        type: "VALIDATE_FORM",
        error: "",
        result: result,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormLayout>
          <Input
            type="number"
            placeholder="Enter amount"
            value={state.amount}
            onChange={handleChangeAmount}
          />
          <FormLabel>CZK to</FormLabel>
          <Select
            value={state.currency.currencyCode}
            onChange={handleChangeCurrency}
          >
            {currencyList.map((currency) => (
              <option key={currency.currencyCode} value={currency.currencyCode}>
                {currency.currencyCode}
              </option>
            ))}
          </Select>
          <Button type="submit">Convert</Button>
        </FormLayout>
        {state.error && <Error>{state.error}</Error>}
        {state.result && (
          <Result>{`${state.amount} CZK = ${state.result} ${state.currency.currencyCode}`}</Result>
        )}
      </form>
    </>
  );
};
