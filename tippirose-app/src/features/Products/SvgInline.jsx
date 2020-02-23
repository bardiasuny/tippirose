class Svg extends React.Component {
  state = {
    svg: null,
    loading: false
  };

  componentDidMount() {
    fetch(this.props.url)
      .then(res => res.text())
      .then(text => this.setState({ svg: text }));
  }

  render() {
    const { loading, svg } = this.state;
    if (loading) {
      return <div className="spinner" />;
    } else if (!svg) {
      return <div className="error" />;
    }
    return <div dangerouslySetInnerHTML={{ __html: this.state.svg }} />;
  }
}
