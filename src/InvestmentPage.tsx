import { ChangeEvent, useState } from "react";
import { calculateInvestmentResults, formatter } from './util/investment.js';

type InvestmentType = {
  initialInvestment: number,
  annualInvestment: number,
  expectedReturn: number,
  duration: number
};

export function InvestmentPage() {
  const [updateValue, setUpdateValue] = useState<InvestmentType>({
    initialInvestment: 15000,
    annualInvestment: 1200,
    expectedReturn: 20,
    duration: 10
  });

  function handleChange(key: keyof InvestmentType, newValue: string) {
    const numberValue = parseFloat(newValue);
    if (!isNaN(numberValue)) {
      setUpdateValue((prevValue: InvestmentType) => ({
        ...prevValue,
        [key]: numberValue
      }));
    }
  }

  const results = calculateInvestmentResults(updateValue);

  const initialValue = results[0].valueEndOfYear -  results[0].interest -  results[0].annualInvestment

  return (
    <div className="flex gap-2 flex-col">
      <div className="flex flex-1 gap-2">
        <div className="flex flex-col items-start gap-2">
          <label>Initial Investment</label>
          <input
            value={updateValue.initialInvestment}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('initialInvestment', e.target.value)}
            type="number"
            placeholder="Initial Investment"
            className="px-4 py-2 rounded-xl"
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label>Annual Investment</label>
          <input
            value={updateValue.annualInvestment}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('annualInvestment', e.target.value)}
            type="number"
            placeholder="Annual Investment"
            className="px-4 py-2 rounded-xl"
          />
        </div>
      </div>
      <div className="flex flex-1 gap-2">
        <div className="flex flex-col items-start gap-2">
          <label>Expected Return</label>
          <input
            value={updateValue.expectedReturn}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('expectedReturn', e.target.value)}
            type="number"
            placeholder="Expected Return"
            className="px-4 py-2 rounded-xl"
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label>Duration</label>
          <input
            value={updateValue.duration}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('duration', e.target.value)}
            type="number"
            placeholder="Duration"
            className="px-4 py-2 rounded-xl"
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Investment Value</th>
            <th>Interest Year</th>
            <th>Total Year</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result: any) => {
            const totalInterest = result.valueEndOfYear - result.annualInvestment * result.year - initialValue
            const totalAmount = result.valueEndOfYear - result.interest
            return (
            <tr key={result.year}>
              <td>{result.year}</td>
              <td>{formatter.format(result.valueEndOfYear)}</td>
              <td>{formatter.format(result.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalAmount)}</td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
}
