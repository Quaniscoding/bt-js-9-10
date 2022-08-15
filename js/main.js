var dsnv = new DanhSachNhanVien();
var validation = new Validation();
getLocalStorage();
function getEle(id) {
    return document.getElementById(id);
}
function layThongTinNV(isAdd) {
    var taiKhoan = getEle("tknv").value;
    var hoTen = getEle("name").value;
    var email = getEle("email").value;
    var matKhau = getEle("password").value;
    var ngayLam = getEle("datepicker").value;
    var luongCoBan = getEle("luongCB").value;
    var chucVu = getEle("chucvu").value;
    var gioLam = getEle("gioLam").value;

    var isValid = true;
    //taiKhoan
    if (isAdd) {
        isValid &= validation.kiemTraRong(
            taiKhoan,
            "tbTKNV",
            "Vui lòng không để trống!"
        ) &&
            validation.kiemTraDoDaiKiTu(
                taiKhoan,
                "tbTKNV",
                "Tài khoản tối đa 4-6 ký số !",
                4,
                6
            )
            && validation.kiemTraTaiKhoanTonTai(
                taiKhoan,
                "tbTKNV",
                "Tài khoản đã tồn tại !",
                dsnv.arr
            );
    }
    //tenNv
    isValid &= validation.kiemTraRong(
        hoTen,
        "tbTen",
        "Vui lòng không để trống!"
    ) &&
        validation.kiemTraKiTuChuoi(
            hoTen,
            "tbTen",
            "Vui lòng không nhập số !"
        );
    //email
    isValid &= validation.kiemTraRong(
        email,
        "tbEmail",
        "Vui lòng không để trống!"
    ) && validation.kiemTraEmail(
        email,
        "tbEmail",
        "Vui lòng nhập đúng định dạng email !"
    );
    //mk
    isValid &= validation.kiemTraRong(
        matKhau,
        "tbMatKhau",
        "Vui lòng không để trống!"
    ) &&
        validation.kiemTraMatKhau(
            matKhau,
            "tbMatKhau",
            "Vui lòng nhập mật khẩu chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt!");
    //day
    isValid &= validation.kiemTraRong(
        ngayLam,
        "tbNgay",
        "Vui lòng không để trống!"
    ) &&
        validation.kiemTraNgayThang(
            ngayLam,
            "tbNgay",
            "Vui lòng nhập yyyy/mm/dd!"
        );
    //luongcb
    isValid &= validation.kiemTraRong(
        luongCoBan,
        "tbLuongCB",
        "Vui lòng không để trống!"
    ) && validation.kiemTraLuong(
        luongCoBan,
        "tbLuongCB",
        "Vui lòng nhập lương từ 1.000.000 - 20.000.000"
    );
    //chucVu
    isValid &= validation.kiemTraChucVu(
        "chucvu",
        "tbChucVu",
        "Vui lòng chọn chức vụ !"
    );
    //soGioLam
    isValid &= validation.kiemTraRong(
        gioLam,
        "tbGiolam",
        "Vui lòng không để trống!"
    ) && validation.kiemTraSogioLam(
        gioLam,
        "tbGiolam",
        "Vui lòng nhập giờ làm 80-200 giờ"
    );
    if (!isValid) return null;
    var nhanVien = new NhanVien(
        taiKhoan,
        hoTen,
        email,
        matKhau,
        ngayLam,
        luongCoBan,
        chucVu,
        gioLam
    );
    nhanVien.tinhTongLuong();
    nhanVien.xepLoaiNhanVien();
    return nhanVien;
}
document.getElementById("btnThemNV").onclick = function () {
    var nhanVien = layThongTinNV(true);
    if (nhanVien) {
        dsnv.themNV(nhanVien);
        setLocalStorage();
        renderTable(dsnv.arr);
    }
};
function renderTable(data) {
    var content = "";
    data.forEach(function (nv) {
        content += `
        <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.loaiNhanVien}</td>
            <td>
            <button
                    class="btn btn-success"
                    onclick="suaNV('${nv.taiKhoan}')"
                    data-toggle="modal"
                    data-target="#myModal"
                  >
                    Sửa
                  </button>
            <button class="btn btn-danger" onclick="xoaNV('${nv.taiKhoan}')">Xoá</button>
            </td>
        </tr>
        `;
    })
    getEle("tableDanhSach").innerHTML = content;
}
function xoaNV(taiKhoan) {
    dsnv.xoaNV(taiKhoan);
    renderTable(dsnv.arr);
    setLocalStorage();
}
function suaNV(taiKhoan) {
    var nv = dsnv._layThongTinNV(taiKhoan);
    if (nv) {
        getEle("tknv").value = nv.taiKhoan;
        getEle("tknv").disabled = true;
        getEle("name").value = nv.hoTen;
        getEle("email").value = nv.email;
        getEle("password").value = nv.matKhau;
        getEle("datepicker").value = nv.ngayLam;
        getEle("luongCB").value = nv.luongCoBan;
        getEle("chucvu").value = nv.chucVu;
        getEle("gioLam").value = nv.gioLam;
    }
    renderTable(dsnv.arr);
    setLocalStorage();
}
getEle("btnCapNhat").addEventListener("click", function () {
    //lấy value từ các thẻ input
    var nhanVien = layThongTinNV(false);
    //thêm sv vào mảng arr
    dsnv.capNhatNhanVien(nhanVien);
    //gọi hàm setLocalStorage để lưu data
    renderTable(dsnv.arr);
    setLocalStorage();
})
function setLocalStorage() {
    var datastring = JSON.stringify(dsnv.arr);
    localStorage.setItem("DanhSachNhanVien", datastring);
}
function getLocalStorage() {
    if (localStorage.getItem("DanhSachNhanVien")) {
        var dataString = localStorage.getItem("DanhSachNhanVien");
        //Convet string => JSON
        var dataJson = JSON.parse(dataString);
        //backup lại dự liệu cho dssv.arr từ dataJson
        dsnv.arr = dataJson;
        //hiển thị dssv ra ngoài table
        renderTable(dataJson);
    }
}
getEle("searchName").addEventListener("keyup", function () {
    var keyword = getEle("searchName").value;
    var mangTimKiem = dsnv.timKiemNV(keyword);
    renderTable(mangTimKiem);
})
