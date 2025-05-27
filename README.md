# My-Auth-App

Ứng dụng mẫu Next.js + MySQL + Redux Toolkit + JWT (có Refresh Token) cho chức năng **Đăng ký – Đăng nhập – Đăng xuất**.

## 📋 Mô tả

* **Next.js**: Frontend & API routes
* **MySQL**: Lưu dữ liệu người dùng
* **Redux Toolkit**: Quản lý access token
* **JWT**: Xác thực, kèm Refresh Token lưu trên cookie httpOnly

## 🚀 Bắt đầu

### 1. Cài đặt môi trường

* Cài đặt Node.js (v16+)
* Cài đặt MySQL và tạo quyền truy cập

### 2. Clone project

```bash
git clone <repository_url> my-auth-app
cd my-auth-app
```

### 3. Cài đặt dependencies

```bash
npm install
```

### 4. Cấu hình biến môi trường

Tạo file `.env.local` ở thư mục gốc với nội dung:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=auth_demo
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRE=15m
REFRESH_TOKEN_EXPIRE=7d
```

### 5. Tạo database & bảng

1. Đăng nhập MySQL:

   ```bash
   mysql -u root -p
   ```
2. Thực thi SQL:

   ```sql
   CREATE DATABASE auth_demo;
   USE auth_demo;

   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(255) UNIQUE NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     refresh_token TEXT,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   ```

### 6. Cấu trúc thư mục chính

```
my-auth-app/
├─ .env.local
├─ jsconfig.json         # cấu hình import absolute từ src/
├─ package.json
├─ next.config.js
├─ lib/
│   ├─ db.js            # kết nối MySQL
│   └─ jwt.js           # hàm sign/verify JWT
├─ store/
│   ├─ index.js         # cấu hình Redux store
│   └─ authSlice.js     # slice quản lý auth
├─ utils/
│   └─ axiosClient.js   # instance Axios + interceptor
├─ pages/
│   ├─ _app.js          # Redux Provider + rehydrate
│   ├─ register.js      # trang đăng ký
│   ├─ login.js         # trang đăng nhập
│   ├─ dashboard.js     # trang bảo vệ
│   └─ api/auth/        # các API route auth
└─ hooks/
    └─ useAuth.js       # hook client-side guard
```

### 7. Chạy ứng dụng

```bash
npm run dev
```

Mở trình duyệt truy cập `http://localhost:3000/register`

## 🔧 Các lệnh hữu ích

* `npm run dev`
* `npm run build`
* `npm start`

## 🛠️ Tùy chỉnh

* Thay đổi tham số token expire trong `.env.local`
* Thêm validate form, UI, hoặc bảo vệ SSR nếu cần

