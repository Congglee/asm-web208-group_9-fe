# Giải thích cấu trúc thư mục dự án

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
