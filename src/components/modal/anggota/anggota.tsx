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
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { zodResolver } from "mantine-form-zod-resolver";
import useNotification from "src/components/notification/notification";
import { lecturer, proposal_suggestion } from "prisma/interfaces";
import lecturerAction from "src/action/lecturerAction";
import studentAction from "src/action/member/studentAction";
import vendorAction from "src/action/member/vendorAction";
import { user_type } from "prisma/interfaces";
import { 
  LecturerMemberFormValues, 
  lecturerMemberSchema,
  StudentMemberFormValues,
  studentMemberSchema,
  VendorMemberFormValues,
  vendorMemberSchema 
} from "src/schemas/memberSchema";

interface AnggotaModalProps {
  user_type: user_type;
  usulan_id: number;
  tabActive: string | null;
  onClose: () => void;
}

const AnggotaModal: React.FC<AnggotaModalProps> = ({
  user_type,
  usulan_id,
  tabActive,
  onClose,
}: AnggotaModalProps) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [members, setMembers] = useState<any[]>([]);
  const { showNotification } = useNotification();
  const router = useRouter();

  const getLecturers = useCallback(async () => {
    const response = await lecturerAction.getAvailableLecturerMember(
      user_type,
      usulan_id,
      setLoading
    );    

    if (response.success) {
      const transformedData = response.data.map((item: any) => ({
        id: item.id.toString(),
        name: item.name,
      }));

      setMembers(transformedData);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, usulan_id]);

  const getStudents = useCallback(async () => {
    // Implement student fetching logic
  }, [user_type, usulan_id]);

  const getVendors = useCallback(async () => {
    // Implement vendor fetching logic
  }, [user_type, usulan_id]);

  useEffect(() => {
    switch(tabActive) {
      case 'lecturer':
        getLecturers();
        break;
      case 'student':
        getStudents();
        break;
      case 'vendor':
        getVendors();
        break;
      default:
        getLecturers();
        break;
    }
  }, [tabActive, getLecturers, getStudents, getVendors]);

  const lecturerForm = useForm<LecturerMemberFormValues>({
    initialValues: {
      usulan_id,
      anggota: []
    },
    validate: zodResolver(lecturerMemberSchema),
    validateInputOnChange: true
  });

  const studentForm = useForm<StudentMemberFormValues>({
    initialValues: {
      usulan_id,
      anggota: []
    },
    validate: zodResolver(studentMemberSchema),
    validateInputOnChange: true
  });

  const vendorForm = useForm<VendorMemberFormValues>({
    initialValues: {
      usulan_id,
      anggota: []
    },
    validate: zodResolver(vendorMemberSchema),
    validateInputOnChange: true
  });

  const handleSubmit = async () => {
    switch(tabActive) {
      case 'lecturer':
        const lecturerResult = await lecturerAction.addLecturerMember(
          lecturerForm.values,
          setLoading
        );
        if (lecturerResult.success) {
          showNotification({ status: "success", message: lecturerResult.message });
          setOpened(false);
          onClose();
          router.refresh();
        } else {
          showNotification({ status: "error", message: lecturerResult.message });
        }
        break;
      case 'student':
        const studentResult = await studentAction.addStudentMember(
          studentForm.values,
          setLoading
        );
        if (studentResult.success) {
          showNotification({ status: "success", message: studentResult.message });
          setOpened(false);
          onClose();
          router.refresh();
        } else {
          showNotification({ status: "error", message: studentResult.message });
        }
        break;
      case 'vendor':
        const vendorResult = await vendorAction.addVendorMember(
          vendorForm.values,
          setLoading
        );
        if (vendorResult.success) {
          showNotification({ status: "success", message: vendorResult.message });
          setOpened(false);
          onClose();
          router.refresh();
        } else {
          showNotification({ status: "error", message: vendorResult.message });
        }
        break;
    }
  };

  const renderMultiSelectOption: MultiSelectProps["renderOption"] = ({
    option,
  }) => (
    <Group gap="sm">
      <div>
        <Text size="sm">{option.label}</Text>
      </div>
    </Group>
  );

  const memberData = members.map((member) => ({
    value: member.id,
    label: member.name,
  }));

  return (
        <Box>
          {tabActive === 'lecturer' && (
            <MultiSelect
              label="Pilih Dosen"
              placeholder="Pilih Dosen"
              data={memberData}
              {...lecturerForm.getInputProps('anggota')}
              renderOption={renderMultiSelectOption}
            />
          )}
          {tabActive === 'student' && (
            <MultiSelect
              label="Pilih Mahasiswa"
              placeholder="Pilih Mahasiswa"
              data={memberData}
              {...studentForm.getInputProps('anggota')}
              renderOption={renderMultiSelectOption}
            />
          )}
          {tabActive === 'vendor' && (
            <MultiSelect
              label="Pilih Vendor"
              placeholder="Pilih Vendor"
              data={memberData}
              {...vendorForm.getInputProps('anggota')}
              renderOption={renderMultiSelectOption}
            />
          )}
          <Group justify="flex-end" mt="md">
            <Button 
              onClick={handleSubmit} 
              loading={loading}
            >
              Tambah
            </Button>
          </Group>
        </Box>
  );
};

export default AnggotaModal;
