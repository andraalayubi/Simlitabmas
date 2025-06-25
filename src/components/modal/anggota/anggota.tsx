"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  Group,
  Button,
  Box,
  MultiSelect,
  MultiSelectProps,
  Text,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { zodResolver } from "mantine-form-zod-resolver";
import useNotification from "src/components/notification/notification";
import { lecturer } from "prisma/interfaces";
import studentAction from "src/action/member/studentAction";
import vendorAction from "src/action/member/vendorAction";
import { user_type } from "prisma/interfaces";
import {
  LecturerMemberFormValues,
  lecturerMemberSchema,
  StudentMemberFormValues,
  studentMemberSchema,
  VendorMemberFormValues,
  vendorMemberSchema,
} from "src/schemas/memberSchema";
import memberAction from "src/action/member/memberAction";

interface AnggotaModalProps {
  user_type: user_type;
  usulan_id: number;
  tabActive: string | null;
  onClose: () => void;
  refreshData: () => void;
}

const AnggotaModal: React.FC<AnggotaModalProps> = ({
  user_type,
  usulan_id,
  tabActive,
  onClose,
  refreshData,
}: AnggotaModalProps) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [members, setMembers] = useState<{ value: string; label: string }[]>([]);
  const [department, setDepartment] = useState<string[]>([]);
  const { showNotification } = useNotification();
  const router = useRouter();

  const getLecturers = useCallback(async () => {
    const response = await memberAction.getAvailableLecturerMember(
      user_type,
      usulan_id,
      setLoading
    );

    if (response.success) {
      const data = response.data.map((item: { id: any; name: any; }) => ({
        value: String(item.id),
        label: item.name,
      }));
      setMembers(data);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, usulan_id]);

  const getDepartments = useCallback(async () => {
    const response = await studentAction.getDepartments(
      user_type,
      setLoading
    );

    if (response.success) {
      const data = response.data.map((item: { id: any; name: any; }) => ({
        value: String(item.id),
        label: item.name,
      }));
      setDepartment(data);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, usulan_id]);

  useEffect(() => {    
    switch (tabActive) {
      case "lecturer":
        getLecturers();
        break;
      case "student":
        getDepartments();
        break;
    }
  }, [tabActive, getLecturers, getDepartments]);

  const lecturerForm = useForm<LecturerMemberFormValues>({
    initialValues: {
      usulan_id,
      anggota: [],
    },
    validate: zodResolver(lecturerMemberSchema),
    validateInputOnChange: true,
  });

  const studentForm = useForm<StudentMemberFormValues>({
    initialValues: {
      usulan_id,
      anggota: {
        name: "",
        nrp: Number(undefined),
        department: "",
      },
    },
    validate: zodResolver(studentMemberSchema),
    validateInputOnChange: true,
  });

  const vendorForm = useForm<VendorMemberFormValues>({
    initialValues: {
      usulan_id,
      anggota: { name: "", description: "" },
    },
    validate: zodResolver(vendorMemberSchema),
    validateInputOnChange: true,
  });

  const handleSubmit = async () => {
    switch (tabActive) {
      case "lecturer":
        const lecturerResult = await memberAction.addLecturerMember(
          user_type,
          lecturerForm.values,
          setLoading
        );
        if (lecturerResult.success) {
          showNotification({
            status: "success",
            message: lecturerResult.message,
          });
          setOpened(false);
          refreshData();
          onClose();
        } else {
          showNotification({
            status: "error",
            message: lecturerResult.message,
          });
        }
        break;

      case "student":
        const studentResult = await studentAction.addStudentMember(
          user_type,
          studentForm.values,
          setLoading
        );
        if (studentResult.success) {
          showNotification({
            status: "success",
            message: studentResult.message,
          });
          setOpened(false);
          refreshData();
          onClose();
        } else {
          showNotification({ status: "error", message: studentResult.message });
        }
        break;

      case "vendor":
        const vendorResult = await vendorAction.addVendorMember(
          user_type,
          vendorForm.values,
          setLoading
        );
        if (vendorResult.success) {
          showNotification({
            status: "success",
            message: vendorResult.message,
          });
          setOpened(false);
          refreshData();
          onClose();
        } else {
          showNotification({ status: "error", message: vendorResult.message });
        }
        break;
    }
  };

  return (
    <Box>
      {tabActive === "lecturer" && (
          <MultiSelect
            label="Pilih Dosen"
            placeholder="Pilih Dosen"
            data={members}
            searchable
            {...lecturerForm.getInputProps("anggota")}
          />
      )}
      {tabActive === "student" && (
        <div className="space-y-4">
          {/* Input Nama */}
          <TextInput
            label="Nama"
            placeholder="Masukkan nama mahasiswa"
            {...studentForm.getInputProps("anggota.name")}
          />

          {/* Input NRP */}
          <NumberInput
            label="NRP"
            placeholder="Masukkan NRP"
            {...studentForm.getInputProps("anggota.nrp")}
          />

          {/* Dropdown Program Studi */}
          <Select
            label="Program Studi"
            placeholder="Pilih Program Studi"
            data={department}
            {...studentForm.getInputProps("anggota.department")}
          />
        </div>
      )}
      {tabActive === "vendor" && (
        <div className="space-y-4">
          {/* Input Nama */}
          <TextInput
            label="Nama"
            placeholder="Masukkan nama vendor"
            {...vendorForm.getInputProps("anggota.name")}
          />
          {/* Input Deskripsi */}
          <TextInput
            label="Deskripsi"
            placeholder="Masukkan deskripsi vendor"
            {...vendorForm.getInputProps("anggota.description")}
          />
        </div>
      )}
      <Group justify="flex-end" mt="lg">
        <Button onClick={handleSubmit} loading={loading}>
          Tambah
        </Button>
      </Group>
    </Box>
  );
};

export default AnggotaModal;
