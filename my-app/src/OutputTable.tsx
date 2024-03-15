import React from "react";
import { inputData } from "./Types";
import { Link } from "react-router-dom";

interface OutputTableProps {
  filteredData: inputData[];
  setEditId: React.Dispatch<React.SetStateAction<string | null>>;
  handleDelete: (id: string) => Promise<void>;
}

const OutputTable: React.FC<OutputTableProps> = ({
  filteredData,
  setEditId,
  handleDelete,
}) => {
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
                    <Link style={{ color: "white" }} to="/">
                      Edit
                    </Link>
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
      <button className="outputtablebtn">
        <Link style={{ color: "black" }} to="/">
          Home
        </Link>
      </button>
    </div>
  );
};

export default OutputTable;
