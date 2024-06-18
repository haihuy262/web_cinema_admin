## Cài đặt và chạy

```
npm i
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

File header nằm ở views -> partials, anh chỉnh menu thì vào file header

```
<div class="container mt-5 p-3">

</div>
```

Thêm mã này nếu phần nội dung của anh bị thanh navbar che mất. Có thể dùng container-fluid
cho nội dung full màn. mt-5 ( margin top 5), p-3( padding 3 )

E chỉ biết đến đây thôi :rofl:
