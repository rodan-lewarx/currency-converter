import { Currency } from "@task/currency-list-schema";
import { Table } from "../ui-components";

export const CurrencyList = ({
  currencyList,
}: {
  currencyList: Currency[];
}) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Country</th>
          <th>Currency</th>
          <th>Amount</th>
          <th>Currency Code</th>
          <th>Rate</th>
        </tr>
      </thead>
      <tbody>
        {currencyList.map((currency) => (
          <tr key={currency.currencyCode}>
            <td>{currency.country}</td>
            <td>{currency.currency}</td>
            <td>{currency.amount}</td>
            <td>{currency.currencyCode}</td>
            <td>{currency.rate}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
