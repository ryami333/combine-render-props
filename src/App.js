import React from 'react';

const FooContext = React.createContext('foo');
const BarContext = React.createContext('bar');
const BazContext = React.createContext('baz');

function createAugmentedConsumer(Consumer) {
  return class X extends React.Component {
    renderChildren = (...consumerArgs) => {
      const { args = [] } = this.props;
      return this.props.children(...consumerArgs, ...args);
    };

    render() {
      return <Consumer>{this.renderChildren}</Consumer>;
    }
  };
}

const augmentedConsumers = [
  FooContext.Consumer,
  BarContext.Consumer,
  BazContext.Consumer,
].map(Consumer => createAugmentedConsumer(Consumer));

const Combined = augmentedConsumers.reduce(
  (Carry, Consumer) => {
    return ({ children, args }) => {
      return (
        <Consumer args={args}>
          {(...consumerArgs) => {
            return (
              <Carry args={consumerArgs}>
                {carryArgs => children(carryArgs)}
              </Carry>
            );
          }}
        </Consumer>
      );
    };
  },
  ({ children, args }) => children(args),
);

function App() {
  return <Combined>{(...args) => args}</Combined>;
}

export default App;
