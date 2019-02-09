import React from 'react';

const FooContext = React.createContext('foo');
const BarContext = React.createContext('bar');
const BazContext = React.createContext('baz');

const consumers = [
    FooContext.Consumer,
    BarContext.Consumer,
    BazContext.Consumer,
];

const Combined = consumers.reduce(
    (Carry, Consumer) => {
        return class X extends React.Component {
            renderChildren = (...args) =>
                this.props.children(...this.carryArgs, ...args);

            renderCarry = (...carryArgs) => {
                this.carryArgs = carryArgs;
                return <Consumer>{this.renderChildren}</Consumer>;
            };

            render() {
                return <Carry>{this.renderCarry}</Carry>;
            }
        };
    },
    ({ children }) => children(),
);

function App() {
    return <Combined>{(foo, bar, baz) => foo + bar + baz}</Combined>;
}

export default App;
