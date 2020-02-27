class Base extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<span className={"badge badge-pill badge-" + this.props.color}><h1>{this.props.letter}</h1></span>);
  }
}
const bases = (<React.Fragment>
            <Base color="primary" letter="A"/><Base color="success" letter="G"/><Base color="warning" letter="C"/><Base color="danger" letter="T"/>
           </React.Fragment>);
ReactDOM.render(bases, document.getElementById('root'));