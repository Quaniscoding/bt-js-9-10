function DanhSachNhanVien() {
    this.arr = [];
    this.themNV = function (nv) {
        this.arr.push(nv);
    };

    this.timViTriNV = function (taiKhoan) {
        var index = -1;
        this.arr.forEach(function (nv, i) {
            if (nv.taiKhoan === taiKhoan) {
                index = i;
            }
        });
        return index;
    };

    this.xoaNV = function (taiKhoan) {
        var index = this.timViTriNV(taiKhoan);
        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    };
    this._layThongTinNV = function (taiKhoan) {
        var nv = null;
        var index = this.timViTriNV(taiKhoan);
        if (index !== -1) {
            nv = this.arr[index];
        }
        return nv;
    };
    this.capNhatNhanVien = function (taiKhoan) {
        var index = this.timViTriNV(taiKhoan.taiKhoan);
        if (index !== -1) {
            this.arr[index] = taiKhoan;
        }
    };
    this.timKiemNV = function (keyword) {
        var mangTimKiem = [];
        this.arr.forEach(function (nv) {
            var nameLowerCase = nv.loaiNhanVien.toLowerCase();
            var keywordLowerCase = keyword.toLowerCase();
            if (nameLowerCase.indexOf(keywordLowerCase) != -1) {
                mangTimKiem.push(nv);
            }
        });
        return mangTimKiem;
    };
}
