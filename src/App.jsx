// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [imc, setIMC] = useState(null);
  const [classificacao, setClassificacao] = useState('');

  const calcularIMC = () => {
    if (altura && peso) {
      const alturaMetros = parseFloat(altura.replace(',', '.')); 
      const imcCalculado = peso / (alturaMetros * alturaMetros);
      setIMC(imcCalculado.toFixed(2));

      let classificacaoAtual = '';
      if (imcCalculado < 18.5) {
        classificacaoAtual = 'Abaixo do peso';
      } else if (imcCalculado < 24.9) {
        classificacaoAtual = 'Peso normal';
      } else if (imcCalculado < 29.9) {
        classificacaoAtual = 'Sobrepeso';
      } else if (imcCalculado < 34.9) {
        classificacaoAtual = 'Obesidade grau I';
      } else if (imcCalculado < 39.9) {
        classificacaoAtual = 'Obesidade grau II';
      } else {
        classificacaoAtual = 'Obesidade grau III';
      }
      setClassificacao(classificacaoAtual);
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      calcularIMC();
    }
  };

  const handleAlturaChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d.,]/g, '');
    value = value.replace(/([.,])[.,]+/g, '$1');
    value = value.replace(',', '.');
    setAltura(value);
  };

  return (
    <div className="container">
      <h1>Calculadora de IMC</h1>
      <div className="form">
        <label htmlFor="altura">Qual a sua altura? </label>
        <input
          type="text"
          id="altura"
          value={altura}
          onChange={handleAlturaChange}
          placeholder="Digite sua altura (ex: 1.65)"
          onKeyPress={handleEnterKeyPress}
        />
        <label htmlFor="peso">Quanto vc pesa? </label>
        <input
          type="number"
          id="peso"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Digite seu peso em quilogramas"
          onKeyPress={handleEnterKeyPress}
        />
        <button className='button' onClick={calcularIMC}>Calcular</button>
      </div>
      {imc && (
        <div className="resultado">
          <h2>Seu IMC é: <span className='imc'>{imc}</span></h2>
          <h3>Classificação: <span className='classificacao'>{classificacao}</span></h3>
        </div>
      )}
      <div className="tabela">
        <table>
          <thead>
            <tr>
              <th>IMC</th>
              <th>Classificação</th>
            </tr>
          </thead>
          <tbody>
            <tr className={classificacao === 'Abaixo do peso' ? 'highlight' : ''}>
              <td>Menos de 18.5</td>
              <td>Abaixo do peso</td>
            </tr>
            <tr className={classificacao === 'Peso normal' ? 'highlight' : ''}>
              <td>18.5 - 24.9</td>
              <td>Peso normal</td>
            </tr>
            <tr className={classificacao === 'Sobrepeso' ? 'highlight' : ''}>
              <td>25 - 29.9</td>
              <td>Sobrepeso</td>
            </tr>
            <tr className={classificacao === 'Obesidade grau I' ? 'highlight' : ''}>
              <td>30 - 34.9</td>
              <td>Obesidade grau I</td>
            </tr>
            <tr className={classificacao === 'Obesidade grau II' ? 'highlight' : ''}>
              <td>35 - 39.9</td>
              <td>Obesidade grau II</td>
            </tr>
            <tr className={classificacao === 'Obesidade grau III' ? 'highlight' : ''}>
              <td>40 ou mais</td>
              <td>Obesidade grau III</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
