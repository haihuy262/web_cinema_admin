# Mục lục

- [Mục lục](#mục-lục)
  - [Cài đặt và chạy](#cài-đặt-và-chạy)
  - [Folder làm việc chính](#folder-làm-việc-chính)
  - [Ghi chú](#ghi-chú)
  - [Quy tắc đặt tên branch](#quy-tắc-đặt-tên-branch)
    - [1. Sử dụng chữ thường và dấu gạch ngang (không để khoảng trắng)](#1-sử-dụng-chữ-thường-và-dấu-gạch-ngang-không-để-khoảng-trắng)
    - [2. Phân loại branch bằng tiền tố](#2-phân-loại-branch-bằng-tiền-tố)
  - [Quy tắc commit, giúp quản lý lịch sử commit](#quy-tắc-commit-giúp-quản-lý-lịch-sử-commit)
  - [Lưu ý quan trọng tránh conflix](#lưu-ý-quan-trọng-tránh-conflix)
    - [1. Trước khi pull requests ( nên dùng )](#1-trước-khi-pull-requests--nên-dùng-)
    - [2. Options, không cần dùng cũng được](#2-options-không-cần-dùng-cũng-được)

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

### 1. Trước khi pull requests ( nên dùng )

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

### 2. Options, không cần dùng cũng được

Đây cũng là bước cuối cùng của việc chuẩn bị pull requests, đó chính là squash commit.

**Bước 1: Kiểm tra lịch sử commit**
Trước tiên, bạn cần xem lại lịch sử commit để xác định bạn muốn squash những commit nào. Sử dụng lệnh sau:

`git log --oneline`

Điều này sẽ hiển thị danh sách các commit với mã hash và thông điệp commit.

**Bước 2: Bắt đầu rebase**
Chạy lệnh `git rebase -i` theo sau là mã hash của commit trước các commit bạn muốn squash.

Ví dụ, nếu bạn muốn squash 3 commit gần đây nhất, bạn sẽ chạy:

`git rebase -i HEAD~3`

**Bước 3: Thay đổi trạng thái commit**
Một trình soạn thảo văn bản sẽ mở ra với danh sách các commit bạn đã chọn. Dòng đầu tiên sẽ có từ khóa `pick` trước mỗi commit. Để `squash` các commit, bạn thay đổi từ `pick` của commit thứ hai và các commit sau đó thành `squash` hoặc `s`.

Ví dụ:

```
pick 1234567 First commit message
squash 2345678 Second commit message
squash 3456789 Third commit message
```

**Bước 4: Lưu và đóng trình soạn thảo**
Sau khi đã chỉnh sửa, bạn lưu và đóng trình soạn thảo (thường là bằng cách nhấn :wq trong Vim hoặc Ctrl+X rồi Y trong nano).

**Bước 5: Chỉnh sửa thông điệp commit**
Trình soạn thảo sẽ mở lại để bạn chỉnh sửa thông điệp commit kết hợp. Bạn có thể giữ lại các thông điệp cần thiết và xóa các thông điệp không cần thiết. Sau đó, lưu và đóng trình soạn thảo.

**Bước 6: Hoàn thành rebase**
Git sẽ thực hiện rebase và squash các commit lại với nhau. Nếu có xung đột merge, bạn sẽ cần giải quyết chúng, sau đó chạy:

`git rebase --continue`

**Bước 7: Đẩy thay đổi lên remote repository**
Nếu bạn đang làm việc trên một nhánh đã được đẩy lên remote, bạn cần phải sử dụng tùy chọn force khi đẩy các thay đổi:

`git push origin <branch-name> --force`

Lưu ý: Chỉ sử dụng `--force` khi bạn chắc chắn rằng không ai khác đang làm việc trên cùng một nhánh.
