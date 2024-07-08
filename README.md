keterangan API

protected khusus session role admin
/api/admin/

buat akun
/api/admin/akun POST --> buat akun dosen dan user role dosen
/api/admin/akun GET --> list akun dosen

/api/admin/akun/[id] GET --> detail akun dosen
/api/admin/akun/[id] POST --> tambah akun user role ketua rg / kaprodi pada dosen

# akun admin

endpoint logout sebelum login akun berbeda --> /logout

Dr dosen 1
role dosen (dosen1@gmail.com, dosen1)
role admin (admin@gmail.com, admin123)

Dr dosen 2
role dosen (dosen2@gmail.com, dosen2)
role rg (rgrg@gmail.com , rgrgrg1)

Dr dosen 3
role dosen (dosen3@gmail.com, dosen3)
role kp (kap1@gmail.com , kaprodi)
