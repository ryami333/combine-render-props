import React from 'react';

const FooContext = React.createContext('foo');
const BarContext = React.createContext('bar');
const BazContext = React.createContext('baz');

function combineConsumers(consumers) {
  function createAugmentedConsumer(Consumer) {
    return class X extends React.Component {
      renderChildren = (...consumerArgs) => {
        const { args } = this.props;
        return args
          ? this.props.children(...consumerArgs, ...args)
          : this.props.children(...consumerArgs);
      };

      render() {
        return <Consumer>{this.renderChildren}</Consumer>;
      }
    };
  }

  return consumers
    .map(consumer => createAugmentedConsumer(consumer))
    .reduce(
      (Carry, Consumer) => {
        return class X extends React.Component {
          static defaultProps = {
            args: [],
          };

          renderCarry = (...carryArgs) => {
            return this.props.children(...carryArgs);
          };

          renderConsumer = (...consumerArgs) => {
            return <Carry args={[...consumerArgs]}>{this.renderCarry}</Carry>;
          };

          render() {
            return (
              <Consumer args={[...this.props.args]}>
                {this.renderConsumer}
              </Consumer>
            );
          }
        };
      },
      ({ children, args }) => children(args),
    );
}

const Combined = combineConsumers([
  FooContext.Consumer,
  BarContext.Consumer,
  BazContext.Consumer,
]);

function App() {
  return <Combined>{([foo, bar, baz]) => foo + bar + baz}</Combined>;
}

export default App;
