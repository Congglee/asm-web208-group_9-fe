# Giải thích và chức năng

## Cấu trúc thư mục của dự án

📦app
┣ 📂components ----> nơi chứa component của các trang
┃ ┣ 📂admin ----> nơi chứa component của các trang phía admin
┃ ┣ 📂client ----> nơi chứa component của các trang phía client
┃ ┗ 📂common ----> nơi chứa component sử dụng cho tất cả các trang
┣ 📂layouts ----> phân chia layout phía client và admin
┣ 📂models ----> interface typescript model
┣ 📂pages ----> các trang của website
┃ ┣ 📂admin ----> các trang phía admin
┃ ┗ 📂client ----> các trang phía client
┣ 📂services ----> nơi chứa các hàm call api
┣ 📜app-routing.module.ts
┣ 📜app.component.html
┣ 📜app.component.scss
┣ 📜app.component.spec.ts
┣ 📜app.component.ts
┗ 📜app.module.ts

## Các chức năng đang phát triển

- Thêm, đọc, xóa user dành cho admin
- CRUD category
- Sửa thông tin user danh cho khách (Có cho user được upload file ảnh avatar)
- Hiển thị dữ liệu trang home (Home Page)
- Hiển thị dữ liệu trang sản phẩm (Products Page)
- Hiển thị dữ liệu trang chi tiết
- Lọc dữ liệu sản phẩm trang sản phẩm (tìm kiếm, sắp xếp, lọc giá, ...)
- Phân trang sản phẩm
