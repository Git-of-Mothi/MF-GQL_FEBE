import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_DATA } from "./queries";

const OutputTable = () => {
  const { loading, error, data } = useQuery(GET_DATA);

  // State variables for filters
  const [filterBusinessType, setFilterBusinessType] = useState<string[]>([]);
  const [filterPaymentOption, setFilterPaymentOption] = useState<string[]>([]);

  // Effect to fetch data when component mounts or filters change
  useEffect(() => {
    // Fetch data here based on filters
  }, [filterBusinessType, filterPaymentOption]);

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

  const handleDelete = async (id: string) => {
    try {
      await deleteData({ variables: { id } });
      refetch();
    } catch (error) {
      console.error("Error deleting data:", error);
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

  return (
    <div>
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

export default OutputTable;
