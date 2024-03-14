import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { inputData } from "./Types";
import InputFields from "./InputFields";
import "./App.css";

const GET_DATA = gql`
  query GetData {
    getData {
      id
      fname
      mail
      number
      website
      contactName
      contactPhone
      contactMail
      notes
      type
      category
      percentage
      activeFrom
      criticalAccount
      paymentOptions
    }
  }
`;

const CREATE_DATA = gql`
  mutation CreateData($input: DataInput!) {
    createData(data: $input) {
      id
      fname
      mail
      number
      website
      contactName
      contactPhone
      contactMail
      notes
      type
      category
      percentage
      activeFrom
      criticalAccount
      paymentOptions
    }
  }
`;

const UPDATE_DATA = gql`
  mutation UpdateData($id: String!, $input: DataInput!) {
    updateData(id: $id, data: $input) {
      id
      fname
      mail
      number
      website
      contactName
      contactPhone
      contactMail
      notes
      type
      category
      percentage
      activeFrom
      criticalAccount
      paymentOptions
    }
  }
`;

const DELETE_DATA = gql`
  mutation DeleteData($id: String!) {
    deleteData(id: $id) {
      id
    }
  }
`;

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
      <h1>Merchant data</h1>
      <InputFields
        formData={formData}
        setFormData={setFormData}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        editId={editId}
      />
      <table className="table-scroll" id="dataTable" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Contact name</th>
            <th>Contact phone</th>
            <th>Contact email</th>
            <th>Notes</th>
            <th>Type</th>
            <th>Category</th>
            <th>Commission percentage</th>
            <th>Active From</th>
            <th>Critical account</th>
            <th>Payment options</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((item: any) => (
            <tr key={item.id}>
              <td>{item.fname}</td>
              <td>{item.mail}</td>
              <td>{item.number}</td>
              <td>{item.website}</td>
              <td>{item.contactName}</td>
              <td>{item.contactPhone}</td>
              <td>{item.contactMail}</td>
              <td>{item.notes}</td>
              <td>{item.type}</td>
              <td>{item.category}</td>
              <td>{item.percentage}</td>
              <td>{item.activeFrom}</td>
              <td>{item.criticalAccount}</td>
              <td>{item.paymentOptions}</td>
              <td>
                <center>
                  <button
                    className="editButton"
                    onClick={() => setEditId(item.id)}
                  >
                    Edit
                  </button>
                  <br />
                  <button
                    className="delButton"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </center>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Filter by business type:</h2>
      <input
        type="checkbox"
        value="Small Business"
        onChange={handleBusinessTypeFilter}
      />
      <label className="light-font">Small business</label>
      <br />
      <input
        type="checkbox"
        value="Enterprise"
        onChange={handleBusinessTypeFilter}
      />
      <label className="light-font">Enterprise</label>
      <br />
      <input
        type="checkbox"
        value="Entrepreneur"
        onChange={handleBusinessTypeFilter}
      />
      <label className="light-font">Entrepreneur</label>
      <br />

      <h2>Filter by payment option:</h2>
      <input
        type="checkbox"
        value="Cash on Delivery"
        onChange={handlePaymentOptionFilter}
      />
      <label className="light-font">Cash on delivery</label>
      <br />
      <input type="checkbox" value="UPI" onChange={handlePaymentOptionFilter} />
      <label className="light-font">UPI</label>
      <br />
      <input
        type="checkbox"
        value="Card payment"
        onChange={handlePaymentOptionFilter}
      />
      <label className="light-font">Card payment</label>
      <br />

      <button className="buttonDesign" onClick={clearFilters}>
        Clear all filter(s)
      </button>
    </div>
  );
};

export default DataComponent;
