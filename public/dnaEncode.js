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
      currentValue: ''
    };
  }
  render() {
    let bases = [];
    if(this.state.binaryValue) {
      for(let i = 0; i <= this.state.binaryValue.length; i += 2) {
        bases.push(convertToDNA(this.state.binaryValue.substring(i, i + 2)));
      }
    }
    return (
      <div className="w-100">
        <p className="lead">Enter regular text: </p>
        <input
          type="text" className="form-control" placeholder={this.props.prompt}
          onChange={e => {
            this.setState({ currentValue: e.target.value });
            this.setState({ binaryValue : convertToBinary(this.state.currentValue)});
          }}
        />
        <p>{this.state.binaryValue}</p>
        <span>{bases}</span>
        </div>
    );
  }
}
const BYTE_SIZE = 8;
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
const textInput = <RealtimeTextInput prompt="Hello, DNA!"/>
const bases = (<React.Fragment>

           </React.Fragment>);
ReactDOM.render(textInput, document.getElementById('root'));
