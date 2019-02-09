import React from 'react';

const FooContext = React.createContext('foo');
const BarContext = React.createContext('bar');
const BazContext = React.createContext('baz');

function createAugmentedConsumer(Consumer) {
    return class X extends React.Component {
        renderChildren = (...consumerArgs) => {
            return this.props.children(...consumerArgs, this.props.args);
        };

        render() {
            return <Consumer>{this.renderChildren}</Consumer>;
        }
    };
}

const AugmentedFoo = createAugmentedConsumer(FooContext.Consumer);

function App() {
    return (
        <AugmentedFoo args={['bar']}>{(foo, bar) => foo + bar}</AugmentedFoo>
    );
}

export default App;
