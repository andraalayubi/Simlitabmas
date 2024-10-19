select * from user u
join dosen d on dosen.user_id = u.id
where u.id < 2
