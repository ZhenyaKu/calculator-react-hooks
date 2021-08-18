import { useState } from 'react';

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ['/', '*', '+', '-', '.'];

  const clearCalc = () => {
    setResult('');
    setCalc('');
  }

  const updateCalc = value => {
    const hasOperator = ops.includes(value);
    const hasOperatorWithoutResult = hasOperator && calc === '';
    const hasOperatorWithLastOperation = hasOperator && ops.includes(calc.slice(-1));

    if (hasOperatorWithoutResult || hasOperatorWithLastOperation) {
      return;
    }

    setCalc(calc + value);

    if (!hasOperator) {
      setResult(eval(calc + value).toString())
    }
  }

  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button
          onClick={() => updateCalc(i.toString())}
          key={i}>
          {i}
        </button>
      );
    }

    return digits;
  }

  const calculate = () => {
    setCalc(eval(calc).toString())
  }

  const delateLast = () => {
    if (calc === '') {
      return;
    }
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {result ? <span>({result})</span> : ''}
          {calc || "0"}
        </div>

        <div className="operators">
          <button onClick={() => updateCalc('/')}>/</button>
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>

          <button onClick={delateLast}>DEL</button>
          <button onClick={clearCalc}>C</button>
        </div>

        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>

          <button onClick={calculate}>=</button>
        </div>

      </div>
    </div>
  );
}

export default App;
