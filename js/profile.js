 const { useState, useEffect } = React;

    function ProfileCard() {
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      const fetchUserData = async () => {
        try {
          setLoading(true);
          setError(null);
          const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
          if (!res.ok) throw new Error('Không thể tải thông tin người dùng');
          const data = await res.json();
          setUser(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchUserData();
      }, []);

      if (loading) {
        return (
          <div className="app-container">
            <div className="loading">Đang tải...</div>
          </div>
        );
      }

      if (error) {
        return (
          <div className="app-container">
            <div className="error-state">
              <p>{error}</p>
              <button className="retry-btn" onClick={fetchUserData}>Thử lại</button>
            </div>
          </div>
        );
      }

      return (
        <div className="app-container">
          <div className="profile-header">
            <div className="profile-avatar">👤</div>
            <div className="profile-name">{user.name}</div>
            <div className="profile-username">@{user.username}</div>
          </div>

          <div className="profile-section">
            <div className="section-title">Liên hệ</div>
            <div className="section-content">{user.email}</div>
            <div className="section-content">{user.phone}</div>
            <div className="section-content">{user.website}</div>
          </div>

          <div className="profile-section">
            <div className="section-title">Địa chỉ</div>
            <div className="section-content">{user.address.street}, {user.address.city}</div>
            <div className="section-content">Mã bưu điện: {user.address.zipcode}</div>
          </div>

          <div className="profile-section">
            <div className="section-title">Công ty</div>
            <div className="section-content">
              <strong>{user.company.name}</strong><br/>
              <em>{user.company.catchPhrase}</em>
            </div>
          </div>
        </div>
      );
    }

    ReactDOM.render(<ProfileCard />, document.getElementById('root'));