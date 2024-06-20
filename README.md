## Cài đặt và chạy

```
npm i
```

```
npm start
```

---

## Folder làm việc chính

1. controller
2. routes
3. views
4. app.js

---

## Ghi chú

```
<%- include('../../partials/header.ejs') %>
```

Mã này tái sử dụng phần header cho các layout

File header nằm ở **views -> partials**, anh chỉnh menu thì vào file header

```
<div class="container mt-5 p-3">

</div>
```

Thêm mã này nếu phần nội dung của anh bị thanh navbar che mất. Có thể dùng **_container-fluid_**
cho nội dung full màn. **_mt-5 ( margin top 5), p-3( padding 3 )_**

E chỉ biết đến đây thôi :rofl:

---

## Quy tắc đặt tên branch

1. Sử dụng chữ thường và dấu gạch ngang

- Ví dụ: feature/add-login-page, bugfix/fix-signup-error
- Ví dụ tạo branch để code 1 giao diện web: feature/add-login-page

2. Phân loại branch bằng tiền tố

- feature/: Được sử dụng cho các tính năng mới.
- bugfix/: Được sử dụng để sửa lỗi.
- hotfix/: Được sử dụng cho các bản sửa lỗi khẩn cấp.
- release/: Được sử dụng cho các nhánh chuẩn bị phát hành.
