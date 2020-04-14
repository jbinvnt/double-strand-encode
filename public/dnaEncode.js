class Base extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<span className={"badge badge-pill badge-" + this.props.color}><h1>{this.props.letter}</h1></span>);
  }
}
class RealtimeTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      binaryValue: ''
    };
  }
  render() {
    let strand1 = [];
    let strand2 = [];
    if(this.state.binaryValue) {
      for(let i = 0; i <= this.state.binaryValue.length; i += 2) {
        let currentBit = this.state.binaryValue.substring(i, i + 2);
        strand1.push(convertToDNA(currentBit));
        strand2.push(convertToDNA(onesComplement(currentBit)));
      }
    }
    return (
      <div className="w-100 input-group-lg">
        <input
          type="text" className="form-control" placeholder={this.props.prompt}
          onChange={e => {
            this.setState({ binaryValue: convertToBinary(e.target.value)});
          }}
        />
        <div className="dnaStrand">
        <h2>Binary representation:</h2>
        <p>{this.state.binaryValue}</p>
        <h2>Double strand DNA representation:</h2>
        <span>{strand1}</span>
        <span>{strand2}</span>
        </div>
        </div>
    );
  }
}
const BYTE_SIZE = 8;
function onesComplement(binaryString) {
  return binaryString.split('').map(character => (character == "1" ? "0" : "1")).join('');
}
function convertToBinary(inputText) {
  let binaryString = "";
  for(let i = 0; i < inputText.length; i++) {
    let convertedString = inputText.charCodeAt(i).toString(2);
    for(let j = convertedString.length; j < BYTE_SIZE; j++) {
      convertedString = "0" + convertedString; //zero left pad until reaching BYTE_SIZE
    }
    binaryString += convertedString;
  }
  return binaryString;
}
function convertToDNA(twoBitString) {
  let result = <p></p>;
  switch(twoBitString) {
    case "00":
    result = <Base color="primary" letter="A"/>;
    break;
    case "01":
    result = <Base color="success" letter="G"/>;
    break;
    case "10":
    result = <Base color="warning" letter="C"/>
    break;
    case "11":
    result = <Base color="danger" letter="T"/>
    break;
  }
  return result;
}
const textInput = <RealtimeTextInput prompt="Enter some text"/>
const bases = (<React.Fragment>

           </React.Fragment>);
ReactDOM.render(textInput, document.getElementById('root'));
