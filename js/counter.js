        const { useState } = React;

        function CounterApp() {
            const [count, setCount] = useState(0);

            const increment = () => setCount(count + 1);
            const decrement = () => setCount(count - 1);
            const reset = () => setCount(0);

            const getCounterClass = () => {
                if (count > 0) return 'positive';
                if (count < 0) return 'negative';
                return 'zero';
            };

            const getStatusMessage = () => {
                if (count > 0) return 'Dương';
                if (count < 0) return 'Âm';
                return 'Bằng không';
            };

            return (
                <div className="app-container">
                    <h1>Counter App</h1>
                    
                    <div className={`counter-display ${getCounterClass()}`}>
                        {count}
                    </div>
                    
                    <div className="status-message">
                        Trạng thái: <strong>{getStatusMessage()}</strong>
                    </div>
                    
                    <div className="button-group">
                        <button 
                            className="btn-decrement" 
                            onClick={decrement}
                        >
                            Giảm (-1)
                        </button>
                        
                        <button 
                            className="btn-reset" 
                            onClick={reset}
                        >
                            Reset (0)
                        </button>
                        
                        <button 
                            className="btn-increment" 
                            onClick={increment}
                        >
                            Tăng (+1)
                        </button>
                    </div>
                </div>
            );
        }

        ReactDOM.render(<CounterApp />, document.getElementById('root'));