import React from 'react';

const FooContext = React.createContext('foo');
const BarContext = React.createContext('bar');
const BazContext = React.createContext('baz');

const Combined = [FooContext, BarContext, BazContext].reduce(
    (Carry, Context) => {
        return ({ children }) => (
            <Carry>
                {(...carryArgs) => {
                    return (
                        <Context.Consumer>
                            {(...args) => children(...carryArgs, ...args)}
                        </Context.Consumer>
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
