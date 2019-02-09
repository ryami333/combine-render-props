import React from 'react';

const FooContext = React.createContext('foo');
const BarContext = React.createContext('bar');
const BazContext = React.createContext('baz');

const Combined = () => (
    <FooContext.Consumer>
        {foo => (
            <BarContext.Consumer>
                {bar => (
                    <BazContext.Consumer>
                        {baz => `${foo}${bar}${baz}`}
                    </BazContext.Consumer>
                )}
            </BarContext.Consumer>
        )}
    </FooContext.Consumer>
);

function App() {
    return <Combined />;
}

export default App;
