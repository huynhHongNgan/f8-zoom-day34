   const { useState } = React;

        let uniqId = 0;

        function TodoApp() {
            const [inputValue, setInputValue] = useState('');
            const [todos, setTodos] = useState([]);

            const handleInputChange = (e) => {
                setInputValue(e.target.value);
            };

            const handleSubmit = (e) => {
                e.preventDefault();
                if (inputValue.trim()) {
                    setTodos([...todos, { 
                        id: ++uniqId, 
                        text: inputValue.trim(), 
                        completed: false 
                    }]);
                    setInputValue('');
                }
            };

            const toggleTodo = (id) => {
                setTodos(todos.map(todo => 
                    todo.id === id 
                        ? { ...todo, completed: !todo.completed }
                        : todo
                ));
            };

            const deleteTodo = (id) => {
                setTodos(todos.filter(todo => todo.id !== id));
            };

            const totalTasks = todos.length;
            const completedTasks = todos.filter(todo => todo.completed).length;
            const remainingTasks = totalTasks - completedTasks;

            return (
                <div className="app-container">
                    <div className="header">
                        <h1>Todo List App</h1>
                        <p>Quản lý công việc của bạn một cách hiệu quả</p>
                    </div>
                    
                    <div className="content">
                        <form onSubmit={handleSubmit} className="todo-form">
                            <input 
                                type="text"
                                className="todo-input"
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="Nhập task mới..."
                            />
                            <button 
                                type="submit" 
                                className="add-btn"
                                disabled={!inputValue.trim()}
                            >
                            Thêm
                            </button>
                        </form>
                        
                        <div className="stats">
                            <h3>Thống kê</h3>
                            <div className="stats-details">
                                <div className="stat-item stat-total">
                                    Tổng: {totalTasks} task{totalTasks !== 1 ? 's' : ''}
                                </div>
                                <div className="stat-item stat-completed">
                                    Hoàn thành: {completedTasks} task{completedTasks !== 1 ? 's' : ''}
                                </div>
                                <div className="stat-item stat-remaining">
                                    Còn lại: {remainingTasks} task{remainingTasks !== 1 ? 's' : ''}
                                </div>
                            </div>
                        </div>
                        
                        {todos.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon"></div>
                                <h3>Chưa có task nào</h3>
                                <p>Hãy thêm task đầu tiên của bạn!</p>
                            </div>
                        ) : (
                            <ul className="todo-list">
                                {todos.map(todo => (
                                    <li key={todo.id} className="todo-item">
                                        <input 
                                            type="checkbox"
                                            className="todo-checkbox"
                                            checked={todo.completed}
                                            onChange={() => toggleTodo(todo.id)}
                                        />
                                        <span 
                                            className={`todo-text ${todo.completed ? 'completed' : ''}`}
                                        >
                                            {todo.text}
                                        </span>
                                        <button 
                                            className="delete-btn"
                                            onClick={() => deleteTodo(todo.id)}
                                        >
                                             Xóa
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            );
        }

        ReactDOM.render(<TodoApp />, document.getElementById('root'));