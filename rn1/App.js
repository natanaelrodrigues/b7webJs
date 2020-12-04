import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';

const Page = styled.SafeAreaView`
  flex:1;
  align-items:center;
`;

const HeaderText = styled.Text`
  font-size:25px;
`;

const Input = styled.TextInput`
  width:90%;
  height:50px;
  font-size:18px;
  background-color:#EEE;
  margin-top: 20px;
  border-radius:10px;
  padding:10px;
`;

const CalcButton = styled.Button`
  margin-top:10px;
`;

const ResultArea = styled.View`
  width:100%;
  margin-top:30px;
  background-color:#EEE;
  padding: 20px;
  justify-content:center;
  align-items:center;
`;

const RusultItemTitle = styled.Text`
  font-size:18px;
  font-weight:bold;
`;

const ResultItem = styled.Text`
  font-size:15px;
  margin-bottom:30px;
`;

const PctArea = styled.View`
  flex-direction:row;
  margin:20px;
`;

const PctItem = styled.Button``;


export default () => {

  const [bill, setBill] = useState("");
  const [tip, setTip] = useState(0);
  const [percent, setPercent] = useState(10);

  const calc = () => {
    let nBill = parseFloat(bill);

    if (nBill){
      setTip(nBill * (percent/100));
    } 
  }

  useEffect(()=>{
    calc();
  },
  [percent])

  return (
    <Page>
      <HeaderText>Calculadora de Gorjeta</HeaderText>
      <Input 
        placeholder="Quanto deu a conta?"
        paceholderTextColor="#000"
        keyboardType="numeric"
        value={bill}
        onChangeText = {n=>setBill(n)}
      />
      <PctArea>
        <PctItem title="5%" onPress={()=>setPercent(5)} />
        <PctItem title="10%" onPress={()=>setPercent(10)} />
        <PctItem title="15%" onPress={()=>setPercent(15)} />
        <PctItem title="20%" onPress={()=>setPercent(20)} />
      </PctArea>
      <CalcButton title={`Calcular ${percent} %`} onPress={calc}/>
      {tip > 0 &&
        <ResultArea>
          <RusultItemTitle>Valor da Conta</RusultItemTitle>
          <ResultItem>R$ {parseFloat(bill).toFixed(2)}</ResultItem>

          <RusultItemTitle>Valor da Gorjeta</RusultItemTitle>
          <ResultItem>R$ {tip.toFixed(2)} ({percent}%)</ResultItem>

          <RusultItemTitle>Valor Total</RusultItemTitle>
          <ResultItem>R$ {(parseFloat(bill) + tip).toFixed(2)} </ResultItem>
        </ResultArea> 
      }
    </Page>
  );
}

