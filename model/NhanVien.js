function NhanVien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLam) {
    this.taiKhoan = taiKhoan;
    this.hoTen = hoTen;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCoBan = luongCoBan;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.tongLuong = 0;
    this.loaiNhanVien = "";
    this.tinhTongLuong = function () {
        if (this.chucVu == "Sếp") {
            this.tongLuong = this.luongCoBan * 4;
        }
        else if (this.chucVu == "Trưởng Phòng") {
            this.tongLuong = this.luongCoBan * 3;
        }
        else {
            this.tongLuong = this.luongCoBan * 2;
        }
    };
    this.xepLoaiNhanVien = function () {
        if (this.gioLam >= 192) {
            this.loaiNhanVien = "Nhân viên xuất sắc !"
        }
        else if (this.gioLam >= 176) {
            this.loaiNhanVien = "Nhân viên giỏi !"
        }
        else if (this.gioLam >= 160) {
            this.loaiNhanVien = "Nhân viên khá !"
        }
        else {
            this.loaiNhanVien = "Nhân viên trung bình !"
        }
    };
}
