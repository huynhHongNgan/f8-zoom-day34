const { useState, useEffect } = React;

function ProductList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=12");
            if (!res.ok) throw new Error("Không thể tải danh sách bài viết");
            const data = await res.json();
            setPosts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const truncate = (text, len = 100) => text.length > len ? text.slice(0, len) + "..." : text;

    if (loading) return <div className="loading">Đang tải...</div>;
    if (error) return (
        <div className="error-state">
            <p>{error}</p>
            <button className="retry-btn" onClick={fetchPosts}>Thử lại</button>
        </div>
    );

    return (
        <div className="app-container">
            <div className="header">
                <h1>Danh sách sản phẩm</h1>
                <p>12 sản phẩm demo từ API</p>
            </div>

            <div className="products-grid">
                {posts.map(p => (
                    <div key={p.id} className="product-card">
                        <div className="product-id">ID: {p.id}</div>
                        <div className="product-title">{p.title}</div>
                        <div className="product-body">{truncate(p.body)}</div>
                        <button className="view-detail-btn" onClick={() => setSelectedPost(p)}>
                            Xem chi tiết
                        </button>
                    </div>
                ))}
            </div>

            {selectedPost && (
                <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-title">{selectedPost.title}</div>
                            <button className="close-btn" onClick={() => setSelectedPost(null)}>Đóng</button>
                        </div>
                        <div className="modal-body">{selectedPost.body}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

ReactDOM.render(<ProductList />, document.getElementById("root"));