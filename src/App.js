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
        return ({ children }) => (
            <Carry>
                {(...carryArgs) => {
                    return (
                        <Consumer>
                            {(...args) => children(...carryArgs, ...args)}
                        </Consumer>
                    );
                }}
            </Carry>
        );
    },
    ({ children }) => children(),
);

function App() {
    return <Combined>{(foo, bar, baz) => foo + bar + baz}</Combined>;
}

export default App;
