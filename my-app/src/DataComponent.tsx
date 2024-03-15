import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { inputData } from "./Types";
import InputFields from "./InputFields";
import "./App.css";
import { CREATE_DATA, DELETE_DATA, GET_DATA, UPDATE_DATA } from "./queries";
import OutputTable from "./OutputTable";
import { Route, Routes, useNavigate } from "react-router-dom";
import FilterComponent from "./FilterComponent";
import FormHeader from "./FormHeader";
import DataHeader from "./DataHeader";

const DataComponent: React.FC = () => {
  const [formData, setFormData] = useState<inputData>({
    fname: "",
    mail: "",
    number: "",
    website: "",
    contactName: "",
    contactPhone: "",
    contactMail: "",
    notes: "",
    type: "",
    category: "",
    percentage: "",
    activeFrom: "",
    criticalAccount: "",
    paymentOptions: "",
  });

  const [editId, setEditId] = useState<string | null>(null);
  const [filterBusinessType, setFilterBusinessType] = useState<string[]>([]);
  const [filterPaymentOption, setFilterPaymentOption] = useState<string[]>([]);

  const { loading, error, data, refetch } = useQuery(GET_DATA);
  const [createData] = useMutation(CREATE_DATA);
  const [updateData] = useMutation(UPDATE_DATA);
  const [deleteData] = useMutation(DELETE_DATA);

  const navigate = useNavigate();

  useEffect(() => {
    if (editId && data?.getData) {
      const editedData = data.getData.find((item: any) => item.id === editId);
      setFormData(editedData);
    }
  }, [editId, data]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleCreate = async () => {
    try {
      const { data: responseData } = await createData({
        variables: {
          input: formData,
        },
      });
      console.log("Data created successfully:", responseData);
      navigate("/outputtable");
      refetch();
    } catch (error) {
      console.error("Error creating data:", error);
    }
    setFormData({
      fname: "",
      mail: "",
      number: "",
      website: "",
      contactName: "",
      contactPhone: "",
      contactMail: "",
      notes: "",
      type: "",
      category: "",
      percentage: "",
      activeFrom: "",
      criticalAccount: "",
      paymentOptions: "",
    });
  };

  const handleUpdate = async () => {
    try {
      const { data: responseData } = await updateData({
        variables: {
          id: editId,
          input: {
            fname: formData.fname,
            mail: formData.mail,
            number: formData.number,
            website: formData.website,
            contactName: formData.contactName,
            contactPhone: formData.contactPhone,
            contactMail: formData.contactMail,
            notes: formData.notes,
            type: formData.type,
            category: formData.category,
            percentage: formData.percentage,
            activeFrom: formData.activeFrom,
            criticalAccount: formData.criticalAccount,
            paymentOptions: formData.paymentOptions,
          },
        },
      });
      console.log("Data updated successfully:", responseData);
      navigate("/outputtable");
      setEditId(null);
      setFormData({
        fname: "",
        mail: "",
        number: "",
        website: "",
        contactName: "",
        contactPhone: "",
        contactMail: "",
        notes: "",
        type: "",
        category: "",
        percentage: "",
        activeFrom: "",
        criticalAccount: "",
        paymentOptions: "",
      });
      refetch();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteData({ variables: { id } });
      console.log("Data deleted successfully");
      refetch();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleBusinessTypeFilter = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (event.target.checked) {
      setFilterBusinessType([...filterBusinessType, value]);
    } else {
      setFilterBusinessType(
        filterBusinessType.filter((item) => item !== value)
      );
    }
  };

  const handlePaymentOptionFilter = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (event.target.checked) {
      setFilterPaymentOption([...filterPaymentOption, value]);
    } else {
      setFilterPaymentOption(
        filterPaymentOption.filter((item) => item !== value)
      );
    }
  };

  const clearFilters = () => {
    setFilterBusinessType([]);
    setFilterPaymentOption([]);
  };

  const filteredData = data?.getData.filter((item: any) => {
    const matchBusinessType =
      filterBusinessType.length === 0 || filterBusinessType.includes(item.type);
    const matchPaymentOption =
      filterPaymentOption.length === 0 ||
      filterPaymentOption.includes(item.paymentOptions);
    return matchBusinessType && matchPaymentOption;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <FormHeader title="Merchant form" />
              <InputFields
                formData={formData}
                setFormData={setFormData}
                handleCreate={handleCreate}
                handleUpdate={handleUpdate}
                editId={editId}
              />
            </>
          }
        />
        <Route
          path="/outputtable"
          element={
            <>
              <FilterComponent
                handleBusinessTypeFilter={handleBusinessTypeFilter}
                filterBusinessType={filterBusinessType}
                filterPaymentOption={filterPaymentOption}
                handlePaymentOptionFilter={handlePaymentOptionFilter}
                clearFilters={clearFilters}
              />
              <DataHeader title="Merchant data" />
              <OutputTable
                filteredData={filteredData}
                setEditId={setEditId}
                handleDelete={handleDelete}
              />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default DataComponent;
