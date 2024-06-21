# Mục lục

[1. Cài đặt và chạy](#cài-đặt-và-chạy)
[2. Folder làm việc chính](#folder-làm-việc-chính)
[3. Ghi chú](#ghi-chú)
[4. Quy tắc đặt tên branch](#quy-tắc-đặt-tên-branch)
[5. Quy tắc commit, giúp quản lý lịch sử commit](#quy-tắc-commit-giúp-quản-lý-lịch-sử-commit)
[6. Lưu ý quan trọng tránh conflix](#lưu-ý-quan-trọng-tránh-conflix)

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

File header nằm ở [đây](views/partials/header.ejs).

---

```
<div class="container mt-5 p-3">

</div>
```

Thêm mã này nếu phần nội dung bị thanh navbar che mất. Có thể dùng `container-fluid`
cho nội dung full màn. **_mt-5 ( margin top 5), p-3( padding 3 )_**

---

## Quy tắc đặt tên branch

#### 1. Sử dụng chữ thường và dấu gạch ngang (không để khoảng trắng)

- **_Ví dụ_**: feature/add-login-page, bugfix/fix-signup-error
- **_Ví dụ_**: tạo branch để code 1 giao diện web: feature/add-login-page

#### 2. Phân loại branch bằng tiền tố

- **feature/:** Được sử dụng cho các tính năng mới.
- **bugfix/:** Được sử dụng để sửa lỗi.
- **hotfix/:** Được sử dụng cho các bản sửa lỗi khẩn cấp.
- **release/:** Được sử dụng cho các nhánh chuẩn bị phát hành.

---

## Quy tắc commit, giúp quản lý lịch sử commit

- **feat:** Sử dụng cho các thay đổi thêm chức năng mới.
- **fix:** Sử dụng cho các thay đổi sửa lỗi.
- **docs:** Sử dụng cho các thay đổi liên quan đến tài liệu.
- **style:** Sử dụng cho các thay đổi về định dạng, dấu câu, và các vấn đề không ảnh hưởng đến logic.
- **refactor:** Sử dụng cho các thay đổi làm sạch mã nguồn, không thêm tính năng mới hay sửa lỗi.
- **test:** Sử dụng cho các thay đổi liên quan đến việc thêm hoặc sửa các bài kiểm tra.
- **chore:** Sử dụng cho các công việc vặt vãnh, không ảnh hưởng đến sản phẩm (ví dụ như cập nhật tool, cấu hình).
  **_Ví dụ:_** file README.md sửa nội dung thì commit như sau: `git commit -m "docs: cập nhật nội dung file README.md"`

---

## Lưu ý quan trọng tránh conflix

### Trước khi pull requests

Kiểm tra lại tên branch đã đặt đúng quy tắc chưa. Nếu có lỡ đặt tên branch sai cách thì đổi tên branch với 2 command sau:

**_nếu ở tại branch muốn đổi tên_**
`git branch -m newName`

**_nếu đang ở branch khác_**
`git branch -m oldName newName`

Đảm bảo rằng branch phải update dựa trên source mới nhất của branch cần merge. Việc này sẽ giúp tránh những conflict không cần thiết.

Làm theo các bước sau:

1. commit source code ở branch đang làm việc
2. di chuyển sang branch chính ( là branch cần merge, ở đây ae mình sẽ merge toàn bộ code vào developer ) `git checkout developer`, sau đó `git fetch` và cuối cùng `git pull`
3. di chuyển về branch đang làm việc, sau đó `git rebase origin/developer`
4. resolve conflict nếu có
