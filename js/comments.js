const { useState, useEffect } = React;

function CommentSystem() {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({ name: "", email: "", body: "" });

    const timeOptions = [
        "2 giờ trước", "5 giờ trước", "1 ngày trước",
        "2 ngày trước", "1 tuần trước", "2 tuần trước"
    ];

    const fetchComments = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch("https://jsonplaceholder.typicode.com/comments?postId=1");
            if (!response.ok) throw new Error("Không thể tải danh sách bình luận");
            const data = await response.json();
            const withTime = data.map((c, i) => ({
                ...c,
                time: timeOptions[i % timeOptions.length]
            }));
            setComments(withTime);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (formData.name && formData.email && formData.body) {
            const newComment = {
                id: Date.now(),
                name: formData.name,
                email: formData.email,
                body: formData.body,
                time: "Vừa xong"
            };
            setComments([newComment, ...comments]);
            setFormData({ name: "", email: "", body: "" });
        }
    };

    if (loading) return <div className="app-container"><div className="loading">Đang tải...</div></div>;
    if (error) return (
        <div className="app-container">
            <div className="error-state">
                <p>{error}</p>
                <button className="retry-btn" onClick={fetchComments}>Thử lại</button>
            </div>
        </div>
    );

    return (
        <div className="app-container">
            <div className="header">
                <h1>Comment System</h1>
                <p>Hệ thống bình luận đơn giản</p>
            </div>

            <div className="comment-form">
                <h3 className="form-title">Thêm bình luận mới</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Tên của bạn"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email của bạn"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="body"
                            placeholder="Nội dung bình luận"
                            value={formData.body}
                            onChange={handleChange}
                            className="form-textarea"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn" disabled={!formData.name || !formData.email || !formData.body}>
                        Đăng bình luận
                    </button>
                </form>
            </div>

            <div className="comments-section">
                <h2 className="comments-title">Bình luận ({comments.length})</h2>
                {comments.map(c => (
                    <div key={c.id} className="comment-item">
                        <div className="comment-author">{c.name}</div>
                        <div className="comment-email">{c.email}</div>
                        <div className="comment-time">{c.time}</div>
                        <div className="comment-body">{c.body}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

ReactDOM.render(<CommentSystem />, document.getElementById("root"));